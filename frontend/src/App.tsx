import React, { useEffect, useState } from 'react';
import Loader from './components/Loader/Loader';
import { getTheme } from './utils/themeController';
import Home from './views/Home/Home';
import Lobby from './views/Lobby/Lobby';

// TODO
// Make popups (choose tool, copied link, exit)
// Make brush
// Make text on canvas

const App: React.FC = (): JSX.Element => {
	const [home, setHome] = useState(true);
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

	return <Lobby />;
};

export default App;
