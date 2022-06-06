import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Figures } from 'src/api/figures';
import { Message } from 'src/api/message';
import { Methods } from 'src/api/methods';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import Brush from 'src/utils/tools/Brush';
import Rect from 'src/utils/tools/Rect';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	const params = useParams();

	const drawHandler = (msg: Message): void => {
		const { type, x, y, width, height, fill, lineType, lineWidth, color } =
			msg.figure;
		const ctx = canvasStore.canvas?.getContext(
			'2d'
		) as unknown as CanvasRenderingContext2D;
		switch (type) {
			case Figures.BRUSH:
				Brush.draw(ctx, x, y, lineWidth, lineType, color);
				break;
			case Figures.RECT:
				Rect.staticDraw(
					ctx,
					x,
					y,
					width,
					height,
					fill,
					lineWidth,
					lineType,
					color
				);
				break;
			case Figures.FINISH:
				ctx.beginPath();
				break;
			default:
				break;
		}
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
