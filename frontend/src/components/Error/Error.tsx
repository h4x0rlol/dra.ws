import { useTranslation } from 'react-i18next';
import styles from './Error.module.scss';

const Error = ({ message }: { message: string }): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<p>{t('error.routerError')}</p>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default Error;
