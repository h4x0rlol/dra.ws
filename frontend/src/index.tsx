import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { Loader } from './components/Loader';
import App from './App';
import 'src/i18n';
import 'src/styles/index.scss';

const UI: React.FC = (): JSX.Element => {
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
