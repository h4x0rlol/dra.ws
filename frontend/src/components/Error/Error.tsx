import { useTranslation } from 'react-i18next';
import styles from './Error.module.scss';

export const Error = ({ message }: { message: string }): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.error}>
			<p>{t('error.routerError')}</p>
			<p>{message}</p>
		</div>
	);
};
