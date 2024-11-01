import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const Wrapper = ({
	children,
	content,
	className,
}: PropsWithChildren<{ content?: string | React.ReactNode; className?: string }>) => {
	return (
		<div className={cn('min-h-11 rounded-[10px] overflow-hidden shadow-[0_1px_4px_0px_#00000029]', className)}>
			{content && (
				<header className="bg-[#F8F8FA] text-[#323338] font-semibold leading-5 px-5 py-2.5">{content}</header>
			)}
			{children}
		</div>
	);
};

export default Wrapper;
