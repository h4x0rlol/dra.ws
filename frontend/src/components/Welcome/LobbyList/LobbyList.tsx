import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { axiosConfig } from 'src/api';
import lobbyStore from 'src/store/lobbyStore';
import styles from './LobbyList.module.scss';

export const LobbyList: React.FC = observer((): JSX.Element => {
	const { t } = useTranslation();
	const [list, setList] = useState<string[]>([]);
	const [error, setError] = useState('');

	const handlePress = (): void => {
		lobbyStore.checkUserName(
			lobbyStore.username.length > 8 ? '' : lobbyStore.username
		);
		lobbyStore.setIsJoinFromLobby(true);
	};

	useEffect(() => {
		axiosConfig
			.get('/lobbies')
			.then((res) => {
				if (res.status === 200) {
					setList(res.data?.lobbies);
				}
			})
			.catch((e: Error) => {
				setError(e.message);
			});
	}, []);

	return (
		<div className={styles.wrapper}>
			{list.length > 0 ? (
				<ul>
					{list?.map((lobby) => {
						return (
							<li className={styles.item} key={lobby}>
								<Link
									to={`lobby/${lobby}`}
									className={styles.link}
									onClick={handlePress}
								>
									{lobby}
								</Link>
							</li>
						);
					})}
				</ul>
			) : (
				<div className={styles.empty}>
					{error ? <div>{error}</div> : <div>{t('home.empty')}</div>}
				</div>
			)}
		</div>
	);
});
