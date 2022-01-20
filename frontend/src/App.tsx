import React, { useEffect } from 'react';
import { getTheme } from './utils/themeController';

const App: React.FC = (): JSX.Element => {
	useEffect(() => {
		getTheme();
	}, []);

	return <div>Hello world</div>;
};

export default App;
