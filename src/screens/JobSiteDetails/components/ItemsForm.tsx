import Icon, { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Col, Flex, Form, Input, InputNumber, Modal, notification, Row, Select } from 'antd';

import { getItemOptions, updateJobsiteItem } from '@/api/dummyApi';

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
			<Modal
				open={!!selectedItem}
				forceRender
				width={868}
				closeIcon={false}
				closable={false}
				okButtonProps={{
					autoFocus: true,
					htmlType: 'submit',
					className: 'bg-[#71CF48] hover:!bg-[#68C142] !ml-5',
					icon: <CheckOutlined />,
					iconPosition: 'end',
					loading: isPending,
				}}
				onCancel={() => setSelectedItem(null)}
				destroyOnClose
				title={
					<Flex justify="space-between" align="center" className="h-11 w-full bg-[#F8F8FA] p-2.5">
						<header className="text-[#323338] font-semibold leading-5 mx-2.5 w-full">Title</header>
						<Button type="text" icon={<CloseOutlined />} onClick={() => setSelectedItem(null)} />
					</Flex>
				}
				classNames={{
					content: ' !p-0',
					header: 'overflow-hidden !mb-0',
					body: '!p-5',
					footer: '!p-5 !mt-10',
				}}
				modalRender={(dom) => (
					<Form
						disabled={isPending}
						layout="vertical"
						form={form}
						name="jobsite-form"
						clearOnDestroy
						onFinish={mutate}>
						{dom}
					</Form>
				)}>
				<div className="flex items-center gap-2.5 w-full">
					<Icon
						component={() => (
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_402_466)">
									<path
										d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 15C9.73479 15 9.48043 14.8946 9.2929 14.7071C9.10536 14.5196 9 14.2652 9 14V10C9 9.73478 9.10536 9.48043 9.2929 9.29289C9.48043 9.10536 9.73479 9 10 9C10.2652 9 10.5196 9.10536 10.7071 9.29289C10.8946 9.48043 11 9.73478 11 10V14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15ZM11 7H9V5H11V7Z"
										fill="#1264A3"
									/>
								</g>
								<defs>
									<clipPath id="clip0_402_466">
										<rect width="20" height="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
						)}
					/>

					<span>Informative piece of text that can be used regarding this modal.</span>
				</div>
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
			</Modal>
		</>
	);
};

export default ItemsForm;
