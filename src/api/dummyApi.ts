import { wait } from '@/lib/utils';

import { CategoryName, JobSite } from '@/types';

let jobSites: JobSite[] = [
	{
		id: 'af614cec-a68c-4b28-9363-2a5f7f1e84e3',
		name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
		status: 'Completed',
		categories: [
			{
				id: 'c66b116f-539a-4d5d-b740-777173037602',
				name: 'Sidewalk Shed',
				items: [],
			},
			{
				id: 'da348adb-8c06-4565-91c8-9e8c3c8b16fb',
				name: 'Shoring',
				items: [],
			},
			{
				id: 'e96d14ac-5090-4c8e-809e-570e0f40d2e6',
				name: 'Scaffold',
				items: [],
			},
		],
	},
	{
		id: 'e42131ed-7b87-41e0-9ad3-46cfb26cd800',
		name: 'Lorem Ipsum is simply dummy text of the printing and ',
		status: 'In Progress',
		categories: [
			{
				id: 'affed9f5-01f6-4ae9-ad52-9587651a08bc',
				name: 'Scaffold',
				items: [],
			},
		],
	},
	{
		id: 'e86464fe-763f-4065-a61b-5de0c34c98a6',
		name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
		status: 'On Hold',
		categories: [
			{
				id: '588b1bd8-5390-4389-b130-0c7571ed1464',
				name: 'Sidewalk Shed',
				items: [],
			},
		],
	},
	{
		id: '35236881-8dd8-49aa-99c4-ef1fca701740',
		name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ',
		status: 'In Progress',
		categories: [
			{
				id: 'ddc1e0dc-8a79-4ea0-bcd2-219a78eb6082',
				name: 'Sidewalk Shed',
				items: [],
			},
			{
				id: '06792761-33b3-416c-8648-9e11999c4715',
				name: 'Shoring',
				items: [],
			},
		],
	},
	{
		id: '59054c68-487b-430c-adfb-119aa97f980a',
		name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
		status: 'Completed',
		categories: [
			{
				id: 'ecb9c0e9-65ef-4896-a014-f9fbdb1a5985',
				name: 'Sidewalk Shed',
				items: [],
			},
			{
				id: 'b462fe55-96bc-4c0a-8b67-0f51164bc792',
				name: 'Shoring',
				items: [],
			},
			{
				id: 'c7e38765-c3e1-47ed-9214-7267be229ffc',
				name: 'Scaffold',
				items: [],
			},
		],
	},
	{
		id: 'cd2bca0c-09b9-4ef5-88b1-d5677a4cb5bf',
		name: 'Hello World',
		status: 'Completed',
		categories: [
			{
				id: '39f4423a-f187-4eef-bd30-b7f74f577088',
				name: 'Sidewalk Shed',
				items: [
					{
						id: '5ceef5e6-a0c0-45aa-b77c-9ac860ea0dd7',
						item: 'Pencil',
						quantity: '20',
						description:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
						notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
					},
					{
						id: 'fb69681a-0e12-4f8b-8e11-85ace749419d',
						item: 'Books',
						quantity: '20000',
						description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
						notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
					},
				],
			},
			{
				id: '27ac3a2a-a8e7-45f6-9fcf-31433a05854c',
				name: 'Scaffold',
				items: [
					{
						id: 'b1ebc740-f3a5-43d5-a653-37e792ff65c3',
						item: 'Books',
						quantity: '200',
						description: 'Lorem Ipsum is simply dummy text of the printing and ',
						notes: 'Lorem Ipsum is simply dummy text of the printing and ',
					},
					{
						id: '9004044a-f9e4-4ed0-b3a9-acd225eb0bcb',
						item: 'NoteBooks',
						quantity: '100',
						description: 'Lorem Ipsum is simply dummy text of ',
						notes: 'Lorem Ipsum is simply dummy text of the printing',
					},
					{
						id: 'f805664b-d208-45a7-b2be-b7cc952a49c0',
						item: 'Pencil',
						quantity: '10',
						description: 'Lorem Ipsum is simply dummy text ',
						notes: 'Lorem Ipsum is simply dummy text ',
					},
				],
			},
			{
				id: '5e5e78dc-deaf-488d-925a-25436e9590fc',
				name: 'Shoring',
				items: [],
			},
		],
	},
];

export const getJobSites = async (search: string) => {
	const filteredJobSites = jobSites.filter((jobSite) => jobSite.name.toLowerCase().includes(search.toLowerCase()));
	await wait(1000);
	return filteredJobSites
		? Promise.resolve({ data: filteredJobSites, limit: 10, skip: 0, total: filteredJobSites.length })
		: Promise.reject(filteredJobSites);
};

export const getJobSiteById = async (userId: string) => {
	const jobsite = jobSites.find((jobSite) => jobSite.id === userId) as JobSite;
	await wait(1000);
	return jobsite ? Promise.resolve(jobsite) : Promise.reject(jobsite);
};

export const getJobSiteItems = async (jobSiteId: string, selectedService: string | null, searchValue: string) => {
	const jobsite = jobSites.find((jobSite) => jobSite.id === jobSiteId) as JobSite;
	const category = jobsite.categories.find((category) => category.id === selectedService);
	const items = category?.items.filter((item) => item.item.toLowerCase().includes(searchValue.toLowerCase()));
	await wait(1000);
	return items ? Promise.resolve(items) : Promise.reject(items);
};

export const createJobSite = async (newJobSite: Pick<JobSite, 'name' | 'status'> & { categories: CategoryName[] }) => {
	console.log('🚀 ~ createJobSite ~ newJobSite:', newJobSite);
	jobSites = [
		{
			id: Math.random().toString(36),
			...newJobSite,
			categories: newJobSite.categories.map((category) => ({
				id: Math.random().toString(36),
				name: category,
				items: [
					{
						id: '5ceef5e6-a0c0-45aa-b77c-9ac860ea0dd7',
						item: 'Pencil',
						quantity: '20',
						description:
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
						notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
					},
					{
						id: 'fb69681a-0e12-4f8b-8e11-85ace749419d',
						item: 'Books',
						quantity: '20000',
						description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
						notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
					},
				],
			})),
		},
		...jobSites,
	];

	await wait(1000);
	return Promise.resolve(newJobSite);
};
