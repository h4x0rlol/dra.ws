import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useParams } from 'react-router-dom';
import { axiosConfig, Methods, WS_URL } from 'src/api';
import { Message, MessageTypes } from 'src/api/types';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import ExitModal from 'src/components/ExitModal/ExitModal';
import JoinModal from 'src/components/JoinModal/JoinModal';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import { v4 as uuidv4 } from 'uuid';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	const params = useParams();

	const drawHandler = (msg: Message): void => {
		canvasStore.draw(msg);
	};

	const getImageData: () => void = useCallback(() => {
		if (canvasStore.canvas) {
			const ctx = canvasStore.canvas.getContext(
				'2d'
			) as unknown as CanvasRenderingContext2D;
			axiosConfig.get(`/image?id=${params.id}`).then((response) => {
				const img = new Image();
				img.src = response.data;
				canvasStore.setSrc(response.data);
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
	}, [params.id]);

	const setUsers = (users: string[]): void => {
		lobbyStore.setUsers(users);
	};

	const connectionHandler: () => void = useCallback(() => {
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
	}, [params.id]);

	useEffect(() => {
		getImageData();
	}, [lobbyStore.isJoinFromLobby, getImageData]);

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
	}, [lobbyStore.isJoinFromLobby, connectionHandler, params.id]);

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
