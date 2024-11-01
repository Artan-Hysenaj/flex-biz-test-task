import Wrapper from '@/shared/Wrapper';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Flex, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { getJobSiteItems } from '@/api/dummyApi';

import NoServiceSelected from './components/NoServiceSelected';
import Services from './components/Services';

import useDebounce from '@/hooks/useDebounce';

import { Item } from '@/types';

export const Component = function UserDetails(): JSX.Element {
	const { id: jobSiteId } = useParams();

	const [selectedService, setSelectedService] = useState<string | null>(null);
	const [searchValue, setSearchValue] = useState('');

	const debouncedSearchValue = useDebounce(searchValue);

	const { data: categoryItems, isLoading: categoryItemsLoading } = useQuery({
		queryKey: ['job-sites-items', jobSiteId, selectedService, debouncedSearchValue],
		queryFn: () => getJobSiteItems(String(jobSiteId), selectedService, debouncedSearchValue),
	});

	const columns: ColumnsType<Item> = useMemo(
		() => [
			{
				title: 'Nr',
				dataIndex: 'id',
				key: 'id',
				width: 50,
				render: (_value, _record, index) => index + 1,
			},
			{
				title: 'Item',
				dataIndex: 'item',
				key: 'item',
			},
			{
				title: 'Quantity',
				dataIndex: 'quantity',
				key: 'quantity',
			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description',
			},
			{
				title: 'Notes',
				dataIndex: 'notes',
				key: 'notes',
			},
		],
		[]
	);

	return (
		<Flex justify="space-between" gap={10} className="h-[calc(100vh-133px)] py-2.5">
			<Services selectedService={selectedService} setSelectedService={setSelectedService} />
			<Wrapper
				title="Data grid"
				className="w-full"
				extra={
					selectedService && (
						<Flex gap={20} className="w-full" justify="flex-end">
							<Input
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								type="text"
								className="max-w-[492px] w-full"
								placeholder="Search a driver"
								prefix={<SearchOutlined />}
							/>

							<Button onClick={() => setSelectedService(null)} icon={<CloseOutlined />} type="text" />
						</Flex>
					)
				}>
				{selectedService ? (
					<Table loading={categoryItemsLoading} columns={columns} dataSource={categoryItems} rowKey="id" />
				) : (
					<NoServiceSelected />
				)}
			</Wrapper>
		</Flex>
	);
};
