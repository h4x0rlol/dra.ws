import { observer } from 'mobx-react-lite';
import React from 'react';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<Board />
			<Chat />
		</div>
	);
};

export default observer(Lobby);
