import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
	BrushIcon,
	CircleIcon,
	EraserIcon,
	LineIcon,
	PencilIcon,
	RectIcon,
	TriangleIcon,
} from 'src/components/Svg/';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import Brush from 'src/utils/tools/Brush';
import Circle from 'src/utils/tools/Circle';
import Eraser from 'src/utils/tools/Eraser';
import Line from 'src/utils/tools/Line';
import Pencil from 'src/utils/tools/Pencil';
import Rect from 'src/utils/tools/Rect';
import Tool from 'src/utils/tools/Tool';
import Triangle from 'src/utils/tools/Triangle';
import styles from './Toolbar.module.scss';

export const Toolbar: React.FC = observer((): JSX.Element => {
	const onSelect = (CurrentTool: typeof Tool): void => {
		if (
			canvasStore.canvas &&
			canvasStore.ctx &&
			lobbyStore.socket &&
			lobbyStore.sessionId
		) {
			if (toolStore.tool instanceof CurrentTool) {
				toolStore.tool.destroyEvents();
				toolStore.setTool(null);
			} else {
				toolStore.setTool(
					new CurrentTool(canvasStore.canvas, canvasStore.ctx)
				);
			}
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<button
					type="button"
					onClick={() => onSelect(Pencil)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Pencil,
					})}
				>
					<PencilIcon className={styles.icon} />
				</button>

				<button
					type="button"
					onClick={() => onSelect(Brush)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Brush,
					})}
				>
					<BrushIcon className={styles.icon} />
				</button>

				<button
					type="button"
					onClick={() => onSelect(Line)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Line,
					})}
				>
					<LineIcon className={styles.icon} />
				</button>

				<button
					type="button"
					onClick={() => onSelect(Rect)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Rect,
					})}
				>
					<RectIcon className={styles.icon} />
				</button>

				<button
					type="button"
					onClick={() => onSelect(Triangle)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Triangle,
					})}
				>
					<TriangleIcon className={styles.icon} />
				</button>

				<button
					type="button"
					onClick={() => onSelect(Circle)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Circle,
					})}
				>
					<CircleIcon className={styles.icon} />
				</button>

				<button
					type="button"
					onClick={() => onSelect(Eraser)}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Eraser,
					})}
				>
					<EraserIcon className={styles.icon} />
				</button>
			</div>
		</div>
	);
});
