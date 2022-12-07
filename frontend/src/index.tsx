import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'src/i18n';
import 'src/styles/index.scss';
import App from './App';
import Loader from './components/Loader/Loader';

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<Loader />}>
			<App />
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
);
