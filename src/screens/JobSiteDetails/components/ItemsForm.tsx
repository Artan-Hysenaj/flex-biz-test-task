import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Form, Input, InputNumber, notification, Row, Select } from 'antd';

import { getItemOptions, updateJobsiteItem } from '@/api/dummyApi';

import FormModal from '@/components/FormModal';

import { Item } from '@/types';

const ItemsForm = ({
	selectedItem,
	setSelectedItem,
}: {
	selectedItem: Item | null;
	setSelectedItem: React.Dispatch<React.SetStateAction<Item | null>>;
}) => {
	const { id: jobSiteId } = useParams();

	const [form] = Form.useForm();
	const queryClient = useQueryClient();

	const { data: itemOptions, isLoading } = useQuery({
		queryKey: ['item-options'],
		queryFn: getItemOptions,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (values) => updateJobsiteItem(String(jobSiteId), String(selectedItem?.id), values),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['job-sites-items'] });
			notification.success({
				message: 'Job site created successfully',
			});
			setSelectedItem(null);
		},
		onError: () => {
			notification.error({
				message: 'Failed to create job site',
			});
		},
	});

	useEffect(() => {
		form.setFieldsValue({
			item: selectedItem?.item,
			quantity: selectedItem?.quantity,
			description: selectedItem?.description,
			notes: selectedItem?.notes,
		});
	}, [selectedItem]);

	return (
		<>
			<FormModal
				open={!!selectedItem}
				onCancel={() => setSelectedItem(null)}
				headerTitle="Title"
				cancelButtonProps={{
					hidden: true,
				}}
				okText="Save changes"
				okButtonProps={{
					loading: isPending,
				}}
				form={{
					disabled: isPending,
					form: form,
					onFinish: mutate,
				}}>
				<Row gutter={24}>
					<Col span={16}>
						<Form.Item colon={false} name="item" label="Item">
							<Select placeholder="Search & Select item" options={itemOptions} loading={isLoading} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item colon={false} name="quantity" label="Quantity">
							<InputNumber placeholder="Set quantity" className="w-full" />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item colon={false} name="description" label="Description">
					<Input.TextArea placeholder="Type the description..." rows={5} />
				</Form.Item>
				<Form.Item colon={false} name="notes" label="Note">
					<Input.TextArea placeholder="Type a note..." rows={5} />
				</Form.Item>
			</FormModal>
		</>
	);
};

export default ItemsForm;
