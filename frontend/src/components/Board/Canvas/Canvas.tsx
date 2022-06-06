import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import Brush from 'src/utils/tools/Brush';
import styles from './Canvas.module.scss';

const Canvas: React.FC = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};

export default observer(Canvas);
