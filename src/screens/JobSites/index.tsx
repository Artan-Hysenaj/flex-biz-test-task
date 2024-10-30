import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { Input } from 'antd';

import { getJobSites } from '@/api/dummyApi';

import ErrorBoundary from '@/components/ErrorBoundary';
import JobSitesList from '@/components/JobSitesList';

import { PAGE_SIZE } from '@/lib/constants';

import { TableParams } from '@/types/Table';

export function JobSites(): JSX.Element {
	const [searchValue, setSearchValue] = useState('');
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: PAGE_SIZE,
		},
	});

	const limit = Number(tableParams.pagination?.pageSize);
	const skip = (Number(tableParams.pagination?.current) - 1) * limit;
	const hasFilters = tableParams.filters && Object.values(tableParams.filters).every((filter) => filter);
	const hasSearch = searchValue !== '';

	const params = new URLSearchParams();

	const { data, isLoading, isPlaceholderData, isError, error } = useQuery({
		queryKey: ['job-sites'],
		queryFn: () => getJobSites(),
		placeholderData: keepPreviousData,
	});
	console.log('🚀 ~ JobSites ~ data:', data);

	return (
		<div className="my-8">
			<Input.Search
				placeholder="Search for users"
				className="max-w-md mb-2"
				size="large"
				onSearch={(value) => setSearchValue(value)}
				loading={searchValue !== '' && (isLoading || isPlaceholderData)}
			/>
			<ErrorBoundary isError={isError} error={error}>
				<JobSitesList
					tableParams={tableParams}
					setTableParams={setTableParams}
					data={data}
					isLoading={isLoading}
					isPlaceholderData={isPlaceholderData}
				/>
			</ErrorBoundary>
		</div>
	);
}
