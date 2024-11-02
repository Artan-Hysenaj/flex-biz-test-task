export interface JobSite {
	id: string;
	name: string;
	status: Status;
	categories: Category[];
}

export interface Category {
	id: string;
	name: CategoryName;
	items: Item[];
}

export interface Item {
	id: string;
	item: string;
	quantity: string;
	description: string;
	notes: string;
}

export type Status = 'Completed' | 'In Progress' | 'On Hold';
export type CategoryName = 'Sidewalk Shed' | 'Scaffold' | 'Shoring';
