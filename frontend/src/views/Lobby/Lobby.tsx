import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosConfig } from 'src/api/axios.config';
import { WS_URL } from 'src/api/urls';
import { Figures } from 'src/api/figures';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, Message, MessageTypes } from 'src/api/message';
import { Methods } from 'src/api/methods';
import { useBeforeunload } from 'react-beforeunload';
import Board from 'src/components/Board/Board';
import Chat from 'src/components/Chat/Chat';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import Brush from 'src/utils/tools/Brush';
import Rect from 'src/utils/tools/Rect';
import Circle from 'src/utils/tools/Circle';
import Eraser from 'src/utils/tools/Eraser';
import Line from 'src/utils/tools/Line';
import Pencil from 'src/utils/tools/Pencil';
import Triangle from 'src/utils/tools/Triangle';
import ExitModal from 'src/components/ExitModal/ExitModal';
import JoinModal from 'src/components/JoinModal/JoinModal';
import { animals, uniqueNamesGenerator } from 'unique-names-generator';
import styles from './Lobby.module.scss';

const Lobby: React.FC = (): JSX.Element => {
	const params = useParams();

	const drawHandler = (msg: Message): void => {
		const {
			type,
			x,
			y,
			a,
			b,
			c,
			startX,
			startY,
			width,
			height,
			radius,
			fill,
			lineType,
			lineWidth,
			color,
		} = msg.figure;
		const ctx = canvasStore.canvas?.getContext('2d', {
			alpha: false,
		}) as unknown as CanvasRenderingContext2D;
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
				ctx.beginPath();
				break;
			case Figures.CIRCLE:
				Circle.staticDraw(
					ctx,
					x,
					y,
					radius,
					fill,
					lineWidth,
					lineType,
					color
				);
				ctx.beginPath();
				break;
			case Figures.ERASER:
				Eraser.draw(ctx, x, y, lineWidth);
				break;
			case Figures.LINE:
				Line.staticDraw(
					ctx,
					x,
					y,
					startX,
					startY,
					lineWidth,
					lineType,
					color
				);
				ctx.beginPath();
				break;
			case Figures.PENCIL:
				Pencil.draw(ctx, x, y, lineWidth, lineType, color);
				break;
			case Figures.TRIANGLE:
				Triangle.staticDraw(
					ctx,
					a,
					b,
					c,
					fill,
					lineWidth,
					lineType,
					color
				);
				ctx.beginPath();
				break;
			case Figures.FINISH:
				ctx.beginPath();
				break;
			default:
				break;
		}
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

	const setMessage = (messages: ChatMessage): void => {
		lobbyStore.setMessages(messages);
	};

	useEffect(() => {
		getImageData();
	}, []);

	useEffect(() => {
		if (lobbyStore.username.length === 0) {
			const shortName = uniqueNamesGenerator({
				dictionaries: [animals],
				length: 1,
			});
			lobbyStore.setUserName(shortName.substring(0, 8));
		}

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
						setMessage({
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

		return () => {
			socket.send(
				JSON.stringify({
					id: params.id,
					username: lobbyStore.username,
					method: Methods.CLOSE,
				})
			);
			socket.close();
		};
	}, []);

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
