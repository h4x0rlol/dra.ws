import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosConfig } from 'src/api/axios.config';
import { WS_URL } from 'src/api/urls';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageTypes } from 'src/api/message';
import { Methods } from 'src/api/methods';
import { useBeforeunload } from 'react-beforeunload';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import ExitModal from 'src/components/ExitModal/ExitModal';
import JoinModal from 'src/components/JoinModal/JoinModal';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	const params = useParams();

	const drawHandler = (msg: Message): void => {
		canvasStore.draw(msg);
	};

	const getImageData = (): void => {
		if (canvasStore.canvas) {
			const ctx = canvasStore.canvas.getContext(
				'2d'
			) as unknown as CanvasRenderingContext2D;
			axiosConfig.get(`/image?id=${params.id}`).then((response) => {
				const img = new Image();
				img.src = response.data;
				img.onload = () => {
					if (canvasStore.canvas) {
						ctx.clearRect(
							0,
							0,
							canvasStore.canvas.width,
							canvasStore.canvas.height
						);
						ctx.drawImage(
							img,
							0,
							0,
							canvasStore.canvas.width,
							canvasStore.canvas.height
						);
					}
				};
			});
		}
	};

	const setUsers = (users: string[]): void => {
		lobbyStore.setUsers(users);
	};

	const connectionHandler = (): void => {
		const socket: WebSocket = new WebSocket(WS_URL);
		lobbyStore.setSocket(socket);
		lobbyStore.setSessionId(params.id);
		lobbyStore.setUserId(uuidv4());
		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					id: params.id,
					username: lobbyStore.username,
					method: Methods.CONNECTION,
					public: lobbyStore.isPublic,
				})
			);
			socket.onmessage = (e) => {
				const msg: Message = JSON.parse(e.data);
				switch (msg.method) {
					case Methods.CONNECTION:
						setUsers(msg.users);
						break;
					case Methods.CLOSE:
						setUsers(msg.users);
						break;
					case Methods.DRAW:
						drawHandler(msg);
						break;
					case Methods.UNDO:
						getImageData();
						break;
					case Methods.REDO:
						getImageData();
						break;
					case Methods.CLEAR:
						getImageData();
						break;
					case Methods.MESSAGE:
						lobbyStore.setMessage({
							id: msg.id,
							userId: msg.userId,
							username: msg.username,
							method: msg.method,
							message: msg.message,
							date: msg.date,
							type:
								msg.userId === lobbyStore.userId
									? MessageTypes.OUTCOMING
									: MessageTypes.INCOMING,
						});
						break;
					default:
						break;
				}
			};
		};
	};

	useEffect(() => {
		getImageData();
	}, [lobbyStore.isJoinFromLobby]);

	useEffect(() => {
		if (lobbyStore.isJoinFromLobby) {
			connectionHandler();
		}

		return () => {
			lobbyStore.socket?.send(
				JSON.stringify({
					id: params.id,
					username: lobbyStore.username,
					method: Methods.CLOSE,
				})
			);
			lobbyStore.socket?.close();
		};
	}, [lobbyStore.isJoinFromLobby]);

	useBeforeunload(() => {
		lobbyStore.socket?.send(
			JSON.stringify({
				id: params.id,
				username: lobbyStore.username,
				method: Methods.CLOSE,
			})
		);
		lobbyStore.socket?.close();
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
