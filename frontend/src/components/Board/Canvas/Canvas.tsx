import React, { useEffect, useRef } from 'react';
import styles from './Canvas.module.scss';

const Canvas: React.FC = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		// canvasState.setCanvas(canvasRef.current);
	}, []);

	// useEffect(() => {
	// 	document.addEventListener('keydown', (e) => {
	// 	  if (e.ctrlKey && e.key === 'z') {
	// 		canvasState.undo();
	// 	  }

	// 	  if (e.ctrlKey && e.key === 'y') {
	// 		canvasState.redo();
	// 	  }
	// 	});

	// 	return () => {
	// 	  document.removeEventListener('keydown', (e) => {
	// 		if (e.ctrlKey && e.key === 'z') {
	// 		  canvasState.undo();
	// 		}

	// 		if (e.ctrlKey && e.key === 'y') {
	// 		  canvasState.redo();
	// 		}
	// 	  });
	// 	};
	//   }, []);

	const mouseDownHandler = (): void => {
		// canvasState.pushToUndo(canvasRef.current.toDataURL());
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
