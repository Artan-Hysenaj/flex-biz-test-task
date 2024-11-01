import Wrapper from '@/shared/Wrapper';

import { useMemo } from 'react';

import { JobStatusColorsEnum } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { JobSite } from '@/types';

const Statistics = ({ data }: { data: JobSite[] | undefined }) => {
	const statistics = useMemo(() => {
		return data?.reduce(
			(acc, curr) => {
				acc[curr.status] += 1;
				return acc;
			},
			{ 'In Progress': 0, Completed: 0, 'On Hold': 0 }
		);
	}, [data]);
	return (
		<Wrapper className="mb-4">
			<div className="flex justify-between gap-2.5 p-2">
				{statistics &&
					Object.keys(statistics)?.map((statKey) => (
						<div
							key={statKey}
							className={cn(
								'w-full p-8 rounded-[10px] text-center text-white font-semibold text-3xl leading-10',
								`bg-[${JobStatusColorsEnum[statKey]}]`
							)}>
							{statistics[statKey as keyof typeof statistics]} {statKey}
						</div>
					))}
			</div>
		</Wrapper>
	);
};

export default Statistics;
