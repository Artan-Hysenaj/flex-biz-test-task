import { CategoryName, Status } from '@/types';

export const categoryOptions: Array<{ label: CategoryName; value: CategoryName }> = [
	{ label: 'Sidewalk Shed', value: 'Sidewalk Shed' },
	{ label: 'Scaffold', value: 'Scaffold' },
	{ label: 'Shoring', value: 'Shoring' },
];

export const statusOptions: Array<{ label: Status; value: Status }> = [
	{ label: 'In Progress', value: 'In Progress' },
	{ label: 'Completed', value: 'Completed' },
	{ label: 'On Hold', value: 'On Hold' },
];
