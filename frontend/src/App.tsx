import React, { useEffect } from 'react';
import { getTheme } from './utils/themeController';
import Board from './views/Board/Board';

const App: React.FC = (): JSX.Element => {
	useEffect(() => {
		getTheme();
	}, []);

	return <Board />;
};

export default App;
