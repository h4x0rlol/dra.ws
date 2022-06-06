import axios from 'axios';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import Brush from 'src/utils/tools/Brush';
import styles from './Canvas.module.scss';

const Canvas: React.FC = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const params = useParams();
	useEffect(() => {
		if (canvasRef.current) {
			canvasStore.setCanvas(canvasRef.current);
			toolStore.tool?.destroyEvents();
			toolStore.setTool(null);
		}
	}, []);

	useEffect(() => {
		if (canvasStore.canvas && lobbyStore.socket && lobbyStore.sessionId) {
			console.log('here');
			toolStore.setTool(
				new Brush(
					canvasStore.canvas,
					lobbyStore.socket,
					lobbyStore.sessionId
				)
			);
		}
	}, [canvasStore.canvas, lobbyStore.socket, lobbyStore.sessionId]);

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === 'z') {
				canvasStore.undo();
			}

			if (e.ctrlKey && e.key === 'y') {
				canvasStore.redo();
			}
		});

		return () => {
			document.removeEventListener('keydown', (e) => {
				if (e.ctrlKey && e.key === 'z') {
					canvasStore.undo();
				}

				if (e.ctrlKey && e.key === 'y') {
					canvasStore.redo();
				}
			});
		};
	}, []);

	const mouseUpHandler = (): void => {
		if (lobbyStore.socket && canvasStore.canvas) {
			console.log('update');
			lobbyStore.socket?.send(
				JSON.stringify({
					id: params.id,
					method: Methods.UPDATE,
					image: canvasStore.canvas?.toDataURL(),
				})
			);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<canvas ref={canvasRef} onMouseUp={mouseUpHandler} />
			</div>
		</div>
	);
};

export default observer(Canvas);
