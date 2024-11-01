import Wrapper from '@/shared/Wrapper';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Flex, Radio, RadioChangeEvent, Skeleton, Space } from 'antd';

import { getJobSiteById } from '@/api/dummyApi';

import NoServiceSelected from './components/NoServiceSelected';

import { JobSite } from '@/types';

export const Component = function UserDetails(): JSX.Element {
	const { id: jobSiteId } = useParams();
	const navigate = useNavigate();
	const [selectedService, setSelectedService] = useState<string | null>(null);

	const { data, isLoading } = useQuery<JobSite>({
		queryKey: ['job-sites', jobSiteId],
		queryFn: () => getJobSiteById(String(jobSiteId)),
	});

	const onChange = useCallback((e: RadioChangeEvent) => {
		setSelectedService(e.target.value);
	}, []);

	return (
		<Flex justify="space-between" gap={10} className="h-[calc(100vh-133px)] py-2.5">
			<Wrapper content={data?.name} className="relative h-full max-w-[max(20%,347px)] w-full">
				<Skeleton loading={isLoading} active>
					<Radio.Group
						onChange={onChange}
						value={selectedService}
						optionType="button"
						buttonStyle="solid"
						className="w-full h-full p-2.5 overflow-auto">
						<Space className="w-full" direction="vertical" size={10}>
							{data?.categories.map(({ id, name }) => (
								<Radio className="w-full text-center" key={`${id}-${name}`} value={id}>
									{name}
								</Radio>
							))}
						</Space>
					</Radio.Group>
				</Skeleton>
				<div className="sticky bottom-0 bg-white flex justify-center py-5 shadow-[0_-10px_50px_-30px_#333333]">
					<Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />} iconPosition="end" type="primary">
						Back
					</Button>
				</div>
			</Wrapper>
			<Wrapper content="Data grid" className="w-full">
				{selectedService ? <div>Service selected</div> : <NoServiceSelected />}
			</Wrapper>
		</Flex>
	);
};
