import Box from '@/shared/icons/Box';

import { Flex } from 'antd';

const NoServiceSelected = () => {
	return (
		<Flex vertical justify="center" align="center" className="h-full">
			<Box />
			<h5 className="font-semibold leading-5">No Service Selected</h5>
			<p>Please select a service on your left to proceed.</p>
		</Flex>
	);
};

export default NoServiceSelected;
