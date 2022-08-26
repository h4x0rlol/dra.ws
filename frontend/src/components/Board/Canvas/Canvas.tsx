import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import canvasStore from 'src/store/canvasStore';
import toolStore from 'src/store/toolStore';
import Brush from 'src/utils/tools/Brush';
import Circle from 'src/utils/tools/Circle';
import Eraser from 'src/utils/tools/Eraser';
import Line from 'src/utils/tools/Line';
import Pencil from 'src/utils/tools/Pencil';
import Rect from 'src/utils/tools/Rect';
import styles from './Canvas.module.scss';

const Canvas: React.FC = (): JSX.Element => {
	const [isOutOfBounds, setIsOutOfBounds] = useState<boolean>(true);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			canvasStore.setCanvas(canvasRef.current);
			toolStore.tool?.destroyEvents();
			toolStore.setTool(null);
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

	const handleMouseOver = (): void => {
		setIsOutOfBounds(false);
	};

	const outOfBoundsMouseHandler = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent
	): void => {
		if (e.target === e.currentTarget) {
			if (toolStore.tool != null && !isOutOfBounds) {
				if (
					toolStore.tool instanceof Brush ||
					toolStore.tool instanceof Circle ||
					toolStore.tool instanceof Eraser ||
					toolStore.tool instanceof Pencil ||
					toolStore.tool instanceof Rect ||
					toolStore.tool instanceof Line
				) {
					setIsOutOfBounds(true);
					toolStore.tool.mouseUpHandler();
				}
			}
		}
	};

	return (
		<div
			className={styles.container}
			onMouseMove={(e) => outOfBoundsMouseHandler(e)}
			onTouchMove={(e) => outOfBoundsMouseHandler(e)}
		>
			<div className={styles.wrapper}>
				<canvas ref={canvasRef} onMouseDown={handleMouseOver} />
			</div>
		</div>
	);
};

export default observer(Canvas);
