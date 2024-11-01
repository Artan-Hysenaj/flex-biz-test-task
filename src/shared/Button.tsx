import Icon from '@ant-design/icons';

import { PropsWithChildren } from 'react';

import { Button as AntdButton, ButtonProps, Divider } from 'antd';

import { cn } from '@/lib/utils';

const Button = ({ children, icon, ...props }: PropsWithChildren<ButtonProps>) => {
	return (
		<AntdButton
			{...props}
			className={cn('group bg-[#71CF48] hover:bg-[#68C142]! rounded-[5px] px-2', props.className)}>
			<div className="flex items-center">
				{children}
				<Divider type="vertical" className="h-8 top-0 bg-[#68C142] group-hover:bg-[#71CF48]" />
				<Icon component={() => icon} />
			</div>
		</AntdButton>
	);
};

export default Button;
