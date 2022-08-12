import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import lobbyStore from 'src/store/lobbyStore';
import styles from './UsersList.module.scss';

const UsersList: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<div className={styles.welcome}>{t('room.users')}</div>
			<div className={styles.wrapper}>
				<ul className={styles.list}>
					{lobbyStore.users.map((user) => {
						return (
							<li className={styles.item} key={user}>
								{user}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default observer(UsersList);
