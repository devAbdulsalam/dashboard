import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './assets/css/main.css';
import { AuthContextProvider } from './context/authContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 2 * 60 * 1000,
		},
	},
});
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<Toaster />
				<App />
			</AuthContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
