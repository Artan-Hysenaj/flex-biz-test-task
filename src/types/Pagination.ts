export interface Pagination<T> {
	data: T;
	limit: number;
	skip: number;
	total: number;
}
