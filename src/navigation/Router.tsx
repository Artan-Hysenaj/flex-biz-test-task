/**
 * This module defines the main router for the application.
 *
 * @module Router
 * @see {@link https://reactrouter.com/} for more information on React Router.
 */

/* eslint-disable react-refresh/only-export-components */
import { RootError } from '@/navigation/Error';
import { MainLayout } from '@/navigation/Layout';

import { createElement } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { JobSites } from '@/screens/JobSites';

export const router = createBrowserRouter([
	{
		path: '',
		element: <MainLayout />,
		errorElement: <RootError />,
		children: [
			{
				path: '/',
				element: <Navigate to="/job-sites" />,
			},
			{
				path: '/job-sites',
				element: <JobSites />,
			},
			{
				path: '/job-sites/:id',
				lazy: () => import('@/screens/JobSiteDetails'),
			},
		],
	},
]);

/**
 * The main Router component.
 *
 * @returns {JSX.Element} The Router component.
 */
function Router(): JSX.Element {
	return createElement(RouterProvider, { router });
}

export default Router;

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}
