import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { axiosConfig } from './api/axios.config';
import Loader from './components/Loader/Loader';
import { getTheme } from './utils/themeController';
import Home from './views/Home/Home';
import Lobby from './views/Lobby/Lobby';

const App: React.FC = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getTheme();
		axiosConfig.get('/health').then((res) => {
			if (res.status === 200) {
				setIsLoading(false);
			}
		});
	}, []);

	if (isLoading) {
		return <Loader />;
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
