import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { axiosConfig } from 'src/api/axios.config';
import { useParams } from 'react-router-dom';

import styles from './UsersList.module.scss';

const UsersList: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const params = useParams();
	const [users, setUsers] = useState<string[]>([]);

	// TODO MOVE TO WS
	useEffect(() => {
		axiosConfig.get('/users', { params: { id: params.id } }).then((res) => {
			setUsers(res.data?.users);
		});
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.welcome}>{t('room.users')}</div>
			<div className={styles.wrapper}>
				<ul className={styles.list}>
					{users.map((user) => {
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
