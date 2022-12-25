import React from 'react';
import { observer } from 'mobx-react-lite';
import lobbyStore, { RoomState } from 'src/store/lobbyStore';
import { Navbar } from './Navbar';
import { Room } from './Room';
import { UsersList } from './UsersList';

import styles from './Chat.module.scss';

export const Chat: React.FC = observer((): JSX.Element => {
	return (
		<div className={styles.container}>
			<Navbar />
			{lobbyStore.roomState === RoomState.USERS ? (
				<UsersList />
			) : (
				<Room />
			)}
		</div>
	);
});
