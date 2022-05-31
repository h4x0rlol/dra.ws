import React, { useEffect, useState } from 'react';
import { getTheme } from './utils/themeController';
import Lobby from './views/Lobby/Lobby';

const App: React.FC = (): JSX.Element => {
	useEffect(() => {
		getTheme();
	}, []);

	const [status, setStatus] = useState('weslcome'); // path to index

	return <Lobby />;
};

export default App;
