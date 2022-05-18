import React, { useEffect, useRef } from 'react';
import canvasStore from 'src/store/canvasStore';
import styles from './Canvas.module.scss';

const Canvas: React.FC = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			canvasStore.setCanvas(canvasRef.current);
		}
	}, []);

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

	const mouseDownHandler = (): void => {
		canvasStore.pushToUndo(canvasRef.current?.toDataURL());
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<canvas ref={canvasRef} onMouseDown={mouseDownHandler} />
			</div>
		</div>
	);
};

export default Canvas;
