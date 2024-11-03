import Info from '@/shared/icons/Info';
import Modal, { ModalProps } from '@/shared/Modal';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { PropsWithChildren } from 'react';

import { Form, FormProps } from 'antd';

const FormModal = ({ children, form, ...props }: PropsWithChildren<{ form: FormProps } & ModalProps>) => {
	return (
		<Modal
			{...props}
			okButtonProps={{
				autoFocus: true,
				htmlType: 'submit',
				className: 'bg-[#71CF48] hover:!bg-[#68C142] !ml-5',
				icon: <CheckOutlined />,
				iconPosition: 'end',
				...props.okButtonProps,
			}}
			cancelButtonProps={{
				icon: <CloseOutlined />,
				className: 'bg-[#FE4C4A] hover:!bg-[#EB4345]',
				iconPosition: 'end',
				danger: true,
				type: 'primary',
				variant: 'solid',
				...props.cancelButtonProps,
			}}
			modalRender={(dom) => (
				<Form layout="vertical" clearOnDestroy {...form}>
					{dom}
				</Form>
			)}>
			<div className="flex items-center gap-2.5 w-full">
				<Info />

				<span>Informative piece of text that can be used regarding this modal.</span>
			</div>
			{children}
		</Modal>
	);
};

export default FormModal;
