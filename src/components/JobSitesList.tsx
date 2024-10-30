import { Fragment, useMemo } from 'react';

import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

import { Pagination } from '@/types/Pagination';
import { TableParams } from '@/types/Table';

interface UsersListProps {
	data: Pagination<any[]> | undefined;
	isLoading: boolean;
	isPlaceholderData: boolean;
	tableParams: TableParams;
	setTableParams: React.Dispatch<React.SetStateAction<TableParams>>;
}

function JobSitesList({
	data,
	isLoading,
	isPlaceholderData,
	tableParams,
	setTableParams,
}: UsersListProps): JSX.Element {
	const columns: ColumnsType<any> = useMemo(
		() => [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
			},
		],
		[]
	);

	const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	return (
		<Fragment>
			<Table
				className="overflow-x-auto"
				loading={isLoading || isPlaceholderData}
				columns={columns}
				dataSource={data}
				rowKey={({ id }) => id}
				onChange={handleTableChange}
				pagination={{ ...tableParams.pagination, total: data?.total }}
			/>
		</Fragment>
	);
}

export default JobSitesList;
