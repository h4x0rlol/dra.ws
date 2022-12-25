import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import Tool from 'src/utils/tools/Tool';
import { v4 } from 'uuid';
import { axiosConfig } from './axios.config';
import { Methods } from './methods';
import { Message, MessageTypes } from './types';
import { WS_URL } from './urls';

const drawHandler = (msg: Message): void => {
	canvasStore.draw(msg);
};

const setUsers = (users: string[]): void => {
	lobbyStore.setUsers(users);
};

export const connectionHandler = (id: string | undefined): void => {
	const socket: WebSocket = new WebSocket(WS_URL);

	lobbyStore.setSocket(socket);
	lobbyStore.setSessionId(id);
	lobbyStore.setUserId(v4());

	socket.onopen = () => {
		socket.send(
			JSON.stringify({
				id,
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
};

export const getImageData = (id: string | undefined): void => {
	if (canvasStore.canvas) {
		const ctx = canvasStore.canvas.getContext('2d')!;

		axiosConfig
			.get(`/image?id=${id}`)
			.then((response) => {
				const src = response.data;
				canvasStore.setSrc(src);
				Tool.staticDraw(ctx, src);
			})
			.catch((e) => console.log(e));
	}
};

export const closeConnectionHandler = (id: string | undefined): void => {
	lobbyStore.socket?.send(
		JSON.stringify({
			id,
			username: lobbyStore.username,
			method: Methods.CLOSE,
		})
	);
	lobbyStore.socket?.close();
};
