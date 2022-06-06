import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Message } from 'src/api/message';
import { Methods } from 'src/api/methods';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import lobbyStore from 'src/store/lobbyStore';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	const params = useParams();

	const drawHandler = (msg: Message): void => {
		console.log('kek');
	};

	useEffect(() => {
		const socket: WebSocket = new WebSocket('ws://localhost:5000');
		lobbyStore.setSocket(socket);
		lobbyStore.setSessionId(params.id);
		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					id: params.id,
					username: lobbyStore.username,
					method: Methods.CONNECTION,
				})
			);
			socket.onmessage = (e) => {
				const msg: Message = JSON.parse(e.data);
				switch (msg.method) {
					case Methods.CONNECTION:
						console.log(`${msg.username} connected`);
						break;
					case Methods.DRAW:
						drawHandler(msg);
						break;
					default:
						break;
				}
			};
		};

		return () => {
			socket.close();
		};
	}, []);

	return (
		<div className={styles.container}>
			<Board />
			<Chat />
		</div>
	);
};

export default observer(Lobby);
