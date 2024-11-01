export interface JobSite {
	id: string;
	name: string;
	status: 'Completed' | 'In Progress' | 'On Hold';
	categories: Category[];
}

export interface Category {
	id: string;
	name: string;
	items: Item[];
}

export interface Item {
	id: string;
	item: string;
	quantity: string;
	description: string;
	notes: string;
}
