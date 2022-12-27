import { useTranslation } from 'react-i18next';
import styles from './ErrorFallback.module.scss';

interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
	error,
	resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element => {
	const { t } = useTranslation();
	return (
		<div className={styles.wrapper}>
			<div className={styles.container} role="alert">
				<p>{t('error.message')}</p>
				<p>{error?.message}</p>
				<button
					type="button"
					className={styles.button}
					onClick={resetErrorBoundary}
				>
					{t('error.retry')}
				</button>
			</div>
		</div>
	);
};
