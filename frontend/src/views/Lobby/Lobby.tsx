import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useParams } from 'react-router-dom';
import {
	closeConnectionHandler,
	connectionHandler,
	getImageData,
} from 'src/api';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import ExitModal from 'src/components/ExitModal/ExitModal';
import JoinModal from 'src/components/JoinModal/JoinModal';
import lobbyStore from 'src/store/lobbyStore';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	const params = useParams();

	useEffect(() => {
		getImageData(params.id);
	}, [lobbyStore.isJoinFromLobby, params.id]);

	useEffect(() => {
		if (lobbyStore.isJoinFromLobby) {
			connectionHandler(params.id);
		}
	}, [lobbyStore.isJoinFromLobby, params.id]);

	useEffect(() => {
		return () => {
			closeConnectionHandler(params.id);
		};
	}, [params.id]);

	useBeforeunload(() => {
		closeConnectionHandler(params.id);
	});

	return (
		<div className={styles.container}>
			<Board />
			<Chat />
			<ExitModal />
			<JoinModal />
		</div>
	);
};

export default observer(Lobby);
