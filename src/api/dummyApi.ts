import { wait } from '@/lib/utils';

import { CategoryName, JobSite } from '@/types';

const getJobsitesData = () => JSON.parse(localStorage.getItem('jobSites') || '[]') as JobSite[];
const setJobsitesData = (data: JobSite[]) => localStorage.setItem('jobSites', JSON.stringify(data));

export const getJobSites = async (search: string) => {
	const filteredJobSites = getJobsitesData().filter((jobSite) =>
		jobSite.name.toLowerCase().includes(search.toLowerCase())
	);
	await wait(1000);
	return filteredJobSites ? Promise.resolve(filteredJobSites) : Promise.reject(filteredJobSites);
};

export const getJobSiteById = async (userId: string) => {
	const jobsite = getJobsitesData().find((jobSite) => jobSite.id === userId) as JobSite;
	await wait(1000);
	return jobsite ? Promise.resolve(jobsite) : Promise.reject(jobsite);
};

export const getJobSiteItems = async (jobSiteId: string, selectedService: string | null, searchValue: string) => {
	const jobsite = getJobsitesData().find((jobSite) => jobSite.id === jobSiteId) as JobSite;
	const category = jobsite.categories.find((category) => category.id === selectedService);
	const items = category?.items.filter((item) =>
		JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase())
	);
	await wait(1000);
	return items ? Promise.resolve(items) : Promise.reject(items);
};

export const createJobSite = async (newJobSite: Pick<JobSite, 'name' | 'status'> & { categories: CategoryName[] }) => {
	const newItem = {
		id: Math.random().toString(36),
		...newJobSite,
		categories: newJobSite.categories.map((category) => ({
			id: Math.random().toString(36),
			name: category,
			items: [
				{
					id: Math.random().toString(36),
					item: 'Pencil',
					quantity: '20',
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
					notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
				},
				{
					id: Math.random().toString(36),
					item: 'Books',
					quantity: '20000',
					description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
					notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
				},
			],
		})),
	};
	setJobsitesData([newItem, ...getJobsitesData()]);

	await wait(1000);
	return Promise.resolve(newItem);
};

export const updateJobsiteItem = async (jobSiteId: string, itemId: string, updatedItem: any) => {
	const jobsite = getJobsitesData().find((jobSite) => jobSite.id === jobSiteId) as JobSite;
	const category = jobsite.categories.find((category) => category.items.find((item) => item.id === itemId));
	const item = category?.items.find((item) => item.id === itemId);
	if (item) {
		item.item = updatedItem.item;
		item.quantity = updatedItem.quantity;
		item.description = updatedItem.description;
		item.notes = updatedItem.notes;
	}

	setJobsitesData(getJobsitesData().map((oldJobSite) => (oldJobSite.id === jobSiteId ? jobsite : oldJobSite)));

	await wait(1000);
	return item ? Promise.resolve(updatedItem) : Promise.reject(item);
};
export const getItemOptions = async () => {
	const itemsSet = new Set(
		getJobsitesData().flatMap((jobSite) =>
			jobSite.categories.flatMap((category) => category.items.map((item) => item.item))
		)
	);
	const items = Array.from(itemsSet).map((item) => ({ label: item, value: item }));

	await wait(1000);
	return items ? Promise.resolve(items) : Promise.reject(items);
};
