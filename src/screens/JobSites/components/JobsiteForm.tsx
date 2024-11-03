import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { Col, Form, Input, notification, Row, Select } from 'antd';

import { createJobSite } from '@/api/dummyApi';

import FormModal from '@/components/FormModal';

import { categoryOptions, statusOptions } from '@/lib/options';

const JobsiteForm = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createJobSite,

		onSuccess: (jobsite) => {
			setOpen(false);
			navigate('/job-sites/' + jobsite.id);
			queryClient.invalidateQueries({ queryKey: ['job-sites'] });
			notification.success({
				message: 'Job site created successfully',
			});
		},
		onError: () => {
			notification.error({
				message: 'Failed to create job site',
			});
		},
	});

	return (
		<>
			<FormModal
				open={open}
				onCancel={() => setOpen(false)}
				destroyOnClose
				headerTitle="Title"
				okText="Save Changes"
				cancelText="Cancel Changes"
				okButtonProps={{
					loading: isPending,
				}}
				form={{
					disabled: isPending,
					form: form,
					onFinish: mutate,
				}}>
				<Form.Item
					colon={false}
					name="name"
					label="Name"
					rules={[{ required: true, message: 'Please input the name of the jobsite!' }]}>
					<Input placeholder="Type the jobsite's name" />
				</Form.Item>
				<Row gutter={24}>
					<Col span={16}>
						<Form.Item colon={false} name="categories" label="Categories Included">
							<Select mode="multiple" placeholder="Select" allowClear options={categoryOptions} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item colon={false} name="status" label="Status">
							<Select placeholder="Select one" allowClear options={statusOptions} />
						</Form.Item>
					</Col>
				</Row>
			</FormModal>
		</>
	);
};

export default JobsiteForm;
