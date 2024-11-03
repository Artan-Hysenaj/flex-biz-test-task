import Router from '@/navigation/Router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import { jobSites } from './api/DUMMY_DATA';

import './index.css';

if (!localStorage.getItem('jobSites')) {
	localStorage.setItem('jobSites', JSON.stringify(jobSites));
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
);
