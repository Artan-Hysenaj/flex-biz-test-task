import Wrapper from '@/shared/Wrapper';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { useNavigate, useParams } from 'react-router-dom';

import { Button, Radio, Skeleton, Space } from 'antd';

import { getJobSiteById } from '@/api/dummyApi';

import { JobSite } from '@/types';

const Services = ({
	selectedService,
	setSelectedService,
}: {
	selectedService: string | null;
	setSelectedService: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
	const { id: jobSiteId } = useParams();

	const navigate = useNavigate();

	const { data, isLoading } = useQuery<JobSite>({
		queryKey: ['job-sites', jobSiteId],
		queryFn: () => getJobSiteById(String(jobSiteId)),
	});

	return (
		<Wrapper title={data?.name} extra className="relative max-w-[max(20%,347px)] w-full">
			<Skeleton loading={isLoading} active className="p-2" paragraph={{ rows: 3, width: '100%' }}>
				<Radio.Group
					onChange={(e) => setSelectedService(e.target.value)}
					value={selectedService}
					optionType="button"
					buttonStyle="solid"
					className="w-full h-[calc(100%-72px)] p-2.5 overflow-auto">
					<Space className="w-full" direction="vertical" size={10}>
						{data?.categories.map(({ id, name }) => (
							<Radio className="w-full text-center" key={`${id}-${name}`} value={id}>
								{name}
							</Radio>
						))}
					</Space>
				</Radio.Group>
			</Skeleton>
			<div className="absolute bottom-0 z-10 w-full bg-white flex justify-center py-5 shadow-[0_-10px_50px_-30px_#333333]">
				<Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />} iconPosition="end" type="primary">
					Back
				</Button>
			</div>
		</Wrapper>
	);
};

export default Services;
