import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { axiosConfig } from './api';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import { getTheme } from './utils/themeController';
import Home from './views/Home/Home';
import Lobby from './views/Lobby/Lobby';

const App: React.FC = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		getTheme();
		axiosConfig
			.get('/health')
			.then((res) => {
				if (res.status === 200) {
					setIsLoading(false);
				}
			})
			.catch((e: Error) => {
				setError(e.message);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <Error message={error} />;
	}

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/lobby/:id" element={<Lobby />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</HashRouter>
	);
};

export default App;
