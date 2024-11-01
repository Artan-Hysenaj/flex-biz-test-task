import React, { PropsWithChildren } from 'react';

import { Flex, Typography } from 'antd';

import { cn } from '@/lib/utils';

const { Text } = Typography;

const Wrapper = ({
	children,
	title,
	extra,
	className,
}: PropsWithChildren<{ title?: string; extra?: React.ReactNode; className?: string }>) => {
	return (
		<div className={cn('rounded-[10px] overflow-hidden shadow-[0_1px_4px_0px_#00000029]', className)}>
			{(title || extra) && (
				<Flex justify="space-between" align="center" className="h-11 w-full bg-[#F8F8FA] p-2.5">
					<header className="text-[#323338] font-semibold leading-5 mx-2.5 w-full">
						<Text style={{ maxWidth: '100%' }} ellipsis={{ tooltip: title }}>
							{title}
						</Text>
					</header>
					{extra}
				</Flex>
			)}
			<main className="w-full h-[calc(100%-2.75rem)] overflow-auto">{children}</main>
		</div>
	);
};

export default Wrapper;
