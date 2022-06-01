import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LobbyContainer.module.scss';
import CreateLobby from '../CreateLobby/CreateLobby';
import LobbyList from '../LobbyList/LobbyList';

const LobbyContainer: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const [isCreateLobby, setIsCreateLobby] = useState(true);

	return (
		<>
			<div className={styles.options}>
				<button
					type="button"
					className={cn(styles.option, {
						[styles.active]: isCreateLobby,
						[styles.inactive]: !isCreateLobby,
					})}
					onClick={() => setIsCreateLobby(true)}
				>
					{t('home.create')}
				</button>

				<button
					type="button"
					className={cn(styles.option, {
						[styles.active]: isCreateLobby,
						[styles.inactive]: !isCreateLobby,
					})}
					onClick={() => setIsCreateLobby(false)}
				>
					{t('home.list')}
				</button>
			</div>
			{isCreateLobby ? <CreateLobby /> : <LobbyList />}
		</>
	);
};

export default observer(LobbyContainer);
