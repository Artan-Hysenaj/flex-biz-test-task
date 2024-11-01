import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Layout, Spin } from 'antd';

/**
 * The main application layout.
 */
export function MainLayout(): JSX.Element {
	return (
		<Layout className="bg-white">
			<Layout.Header className="text-white flex items-center">
				<h1 className="font-bold text-3xl">
					<Link to="/">
						<span className="font-light">Dummy</span>Users
					</Link>
				</h1>
			</Layout.Header>
			<Layout.Content className="container min-h-[calc(100vh-133px)]">
				<Suspense fallback={<Spin spinning fullscreen />}>
					<Outlet />
				</Suspense>
			</Layout.Content>
			<Layout.Footer>Dummy Users ©{new Date().getFullYear()} Created by Artan Hysenaj</Layout.Footer>
		</Layout>
	);
}
