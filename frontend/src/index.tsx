import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import 'src/i18n';
import 'src/styles/index.scss';
import App from './App';
import { ErrorFallback } from './components/ErrorFallback';
import { Loader } from './components/Loader';

const UI = (): JSX.Element => {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.reload()}
		>
			<Suspense fallback={<Loader />}>
				<App />
			</Suspense>
		</ErrorBoundary>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<UI />
	</React.StrictMode>,
	document.getElementById('root')
);
