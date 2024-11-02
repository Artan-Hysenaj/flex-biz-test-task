import Wrapper from '@/shared/Wrapper';

import { useMemo } from 'react';

import { JobStatusColorsEnum } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { JobSite, Status } from '@/types';

const Statistics = ({ data }: { data: JobSite[] | undefined }) => {
	const statistics = useMemo(() => {
		const initial: Record<Status, number> = { 'In Progress': 0, Completed: 0, 'On Hold': 0 };
		return (
			data?.reduce((acc, curr) => {
				acc[curr.status] += 1;
				return acc;
			}, initial) ?? initial
		);
	}, [data]);
	return (
		<Wrapper className="mb-4">
			<div className="flex justify-between gap-2.5 p-2">
				{Object.keys(statistics)?.map((statKey) => {
					return (
						<div
							key={statKey}
							style={{ backgroundColor: JobStatusColorsEnum[statKey as Status] }}
							className={cn(
								'w-full p-8 rounded-[10px] text-center text-white font-semibold text-3xl leading-10'
							)}>
							{statistics?.[statKey as Status]} {statKey}
						</div>
					);
				})}
			</div>
		</Wrapper>
	);
};

export default Statistics;
