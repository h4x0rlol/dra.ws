import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './UsersList.module.scss';

const UsersList: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.welcome}>{t('room.users')}</div>
			<div className={styles.wrapper}>
				<ul className={styles.list}>
					<li className={styles.item}>Ultra_cool_name</li>
					<li className={styles.item}>Ultra_cool_name</li>
					<li className={styles.item}>Ultra_cool_name</li>
					<li className={styles.item}>Ultra_cool_name</li>
				</ul>
			</div>
		</div>
	);
};

export default UsersList;
