import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import { getTheme } from './utils/themeController';
import Home from './views/Home/Home';
import Lobby from './views/Lobby/Lobby';

// TODO
// Make popups (choose tool, copied link, exit)
// Make brush
// Make text on canvas

const App: React.FC = (): JSX.Element => {
	const [home, setHome] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getTheme();
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (home) {
		return <Home />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/lobby/:id" element={<Lobby />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
