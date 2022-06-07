import React from 'react';
import { observer } from 'mobx-react-lite';
import Navbar from 'src/components/Chat/Navbar/Navbar';
import Room from 'src/components/Chat/Room/Room';
import UsersList from 'src/components/Chat/UsersList/UsersList';
import lobbyStore, { RoomState } from 'src/store/lobbyStore';
import styles from './Chat.module.scss';

const Chat: React.FC = (): JSX.Element => {
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
};

export default observer(Chat);
