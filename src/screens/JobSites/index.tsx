import Wrapper from '@/shared/Wrapper';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, Tag } from 'antd';

import { getJobSites } from '@/api/dummyApi';

import Caption from './components/Caption';
import JobsiteForm from './components/JobsiteForm';
import Statistics from './components/Statistics';
import ErrorBoundary from '@/components/ErrorBoundary';

import useDebounce from '@/hooks/useDebounce';

import { JobStatusColorsEnum } from '@/lib/constants';

import { JobSite, Status } from '@/types';
import { Pagination } from '@/types/Pagination';
import { ColumnsType } from '@/types/Table';

export function JobSites(): JSX.Element {
	const navigate = useNavigate();

	const [formOpen, setFormOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce<string>(searchValue);

	const columns: ColumnsType<JobSite> = useMemo(
		() => [
			{
				title: 'Jobsite Name',
				dataIndex: 'name',
				key: 'name',
				width: '70%',
				className: 'group-hover:underline',
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				render: (value) => {
					return (
						<Tag
							className="min-w-[129px] text-center py-1 px-6"
							color={JobStatusColorsEnum[value as Status]}>
							{value}
						</Tag>
					);
				},
			},
		],
		[]
	);

	const { data, isLoading, isPlaceholderData, isError, error } = useQuery<Pagination<JobSite[]>>({
		queryKey: ['job-sites', debouncedSearchValue],
		queryFn: () => getJobSites(debouncedSearchValue),
		placeholderData: keepPreviousData,
	});

	return (
		<div className="my-8">
			<ErrorBoundary isError={isError} error={error}>
				<Statistics data={data?.data} />
				<Wrapper title="Title">
					<Table
						rowKey="id"
						className="overflow-x-auto"
						loading={isLoading || isPlaceholderData}
						columns={columns}
						dataSource={data?.data}
						pagination={false}
						size="small"
						caption={
							<Caption
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								setFormOpen={setFormOpen}
							/>
						}
						onRow={(record) => ({
							onClick: () => {
								navigate(`/job-sites/${record.id}`);
							},
						})}
						rowClassName={(_record, index) =>
							`group cursor-pointer ${index % 2 === 0 ? 'bg-[#F8F8FA]' : ''}`
						}
					/>
				</Wrapper>
			</ErrorBoundary>

			<JobsiteForm open={formOpen} setOpen={setFormOpen} />
		</div>
	);
}
