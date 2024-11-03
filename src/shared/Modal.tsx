import { CloseOutlined } from '@ant-design/icons';

import { Modal as AntdModal, ModalProps as AntdModalProps, Button, Flex } from 'antd';

export interface ModalProps extends AntdModalProps {
	open: boolean;
	headerTitle?: string;
}

const Modal = ({ open, onCancel, headerTitle, classNames, ...props }: ModalProps) => {
	return (
		<AntdModal
			{...props}
			open={open}
			forceRender
			width={868}
			closeIcon={false}
			destroyOnClose
			onCancel={onCancel}
			title={
				<Flex justify="space-between" align="center" className="h-11 w-full bg-[#F8F8FA] p-2.5">
					<header className="text-[#323338] font-semibold leading-5 mx-2.5 w-full">{headerTitle}</header>
					<Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
				</Flex>
			}
			classNames={{
				content: ' !p-0',
				header: 'overflow-hidden !mb-0',
				body: '!p-5',
				footer: '!p-5 !mt-10',
				...classNames,
			}}
		/>
	);
};
export default Modal;
