import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LobbyContainer.module.scss';
import { CreateLobby } from '../CreateLobby';
import { LobbyList } from '../LobbyList';

enum Options {
	CREATE = 'CREATE',
	LIST = 'LIST',
}

export const LobbyContainer: React.FC = observer((): JSX.Element => {
	const { t } = useTranslation();
	const [isCreateLobby, setIsCreateLobby] = useState(Options.CREATE);

	return (
		<>
			<div className={styles.options}>
				<button
					type="button"
					className={cn(styles.option, {
						[styles.active]: isCreateLobby === Options.CREATE,
						[styles.inactive]: isCreateLobby === Options.LIST,
					})}
					onClick={() => setIsCreateLobby(Options.CREATE)}
				>
					{t('home.create')}
				</button>

				<button
					type="button"
					className={cn(styles.option, {
						[styles.active]: isCreateLobby === Options.LIST,
						[styles.inactive]: isCreateLobby === Options.CREATE,
					})}
					onClick={() => setIsCreateLobby(Options.LIST)}
				>
					{t('home.list')}
				</button>
			</div>
			{isCreateLobby === Options.CREATE ? <CreateLobby /> : <LobbyList />}
		</>
	);
});
