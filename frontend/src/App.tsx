import React, { useEffect } from 'react';

const App: React.FC = (): JSX.Element => {
	useEffect(() => {
		document.documentElement.className = 'dark';
	}, []);

	return <div>Hello world</div>;
};

export default App;
