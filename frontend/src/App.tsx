import React, { useEffect, useState } from 'react';
import { getTheme } from './utils/themeController';
import Lobby from './views/Lobby/Lobby';

// TODO
// Make popups (choose tool, copied link, exit)
// Make brush
// Make text on canvas

const App: React.FC = (): JSX.Element => {
	const [status, setStatus] = useState('weslcome'); // path to index
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getTheme();
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <Lobby />;
};

export default App;
