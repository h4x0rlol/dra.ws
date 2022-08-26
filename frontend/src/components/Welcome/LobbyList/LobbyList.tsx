import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { axiosConfig } from 'src/api/axios.config';
import lobbyStore from 'src/store/lobbyStore';
import styles from './LobbyList.module.scss';

const LobbyList: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const [list, setList] = useState<string[]>([]);

	const handlePress = (): void => {
		lobbyStore.checkUserName(lobbyStore.username);
		lobbyStore.setIsJoinFromLobby(true);
	};

	useEffect(() => {
		axiosConfig.get('/lobbies').then((res) => {
			if (res.status === 200) {
				setList(res.data?.lobbies);
			}
		});
	}, []);

	return (
		<div className={styles.wrapper}>
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
			{list.length === 0 && (
				<div className={styles.empty}>
					<div>{t('home.empty')}</div>
				</div>
			)}
		</div>
	);
};

export default observer(LobbyList);
