import Wrapper from '@/shared/Wrapper';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { getJobSites } from '@/api/dummyApi';

import Caption from './components/Caption';
import ErrorBoundary from '@/components/ErrorBoundary';

import { PAGE_SIZE } from '@/lib/constants';

import { JobSite } from '@/types';
import { Pagination } from '@/types/Pagination';
import { TableParams } from '@/types/Table';

export function JobSites(): JSX.Element {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: PAGE_SIZE,
		},
	});

	const columns: ColumnsType<JobSite> = useMemo(
		() => [
			{
				title: 'Jobsite Name',
				dataIndex: 'name',
				key: 'name',
				width: '70%',
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
			},
		],
		[]
	);

	// const limit = Number(tableParams.pagination?.pageSize);
	// const skip = (Number(tableParams.pagination?.current) - 1) * limit;
	// const hasFilters = tableParams.filters && Object.values(tableParams.filters).every((filter) => filter);
	// const hasSearch = searchValue !== '';

	// const params = new URLSearchParams();

	const { data, isLoading, isPlaceholderData, isError, error } = useQuery<Pagination<JobSite[]>>({
		queryKey: ['job-sites'],
		queryFn: () => getJobSites(),
		placeholderData: keepPreviousData,
	});
	console.log('🚀 ~ JobSites ~ data:', data);

	return (
		<div className="my-8">
			<ErrorBoundary isError={isError} error={error}>
				<Wrapper className="flex justify-between gap-4 p-2 mb-4">
					<div className="w-full p-4 border">Test</div>
					<div className="w-full p-4 border">Test</div>
					<div className="w-full p-4 border">Test</div>
				</Wrapper>
				<Wrapper content={<span className="font-sans font-semibold leading-6">Title</span>}>
					<Table
						rowKey="id"
						onRow={(record) => {
							return {
								onClick: () => {
									navigate(`/job-sites/${record.id}`);
								},
							};
						}}
						className="overflow-x-auto"
						loading={isLoading || isPlaceholderData}
						columns={columns}
						dataSource={data?.data}
						pagination={false}
						caption={<Caption />}
					/>
				</Wrapper>
			</ErrorBoundary>
		</div>
	);
}
