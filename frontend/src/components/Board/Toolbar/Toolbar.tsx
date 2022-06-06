import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import toolStore from 'src/store/toolStore';
import canvasStore from 'src/store/canvasStore';
import Pencil from 'src/utils/tools/Pencil';
import PencilIcon from 'src/components/Svg/PencilIcon';
import Brush from 'src/utils/tools/Brush';
import BrushIcon from 'src/components/Svg/BrushIcon';
import Line from 'src/utils/tools/Line';
import LineIcon from 'src/components/Svg/LineIcon';
import Tool from 'src/utils/tools/Tool';
import Rect from 'src/utils/tools/Rect';
import RectIcon from 'src/components/Svg/RectIcon';
import Triangle from 'src/utils/tools/Triangle';
import TriangleIcon from 'src/components/Svg/TriangleIcon';
import Circle from 'src/utils/tools/Circle';
import CircleIcon from 'src/components/Svg/CircleIcon';
import Eraser from 'src/utils/tools/Eraser';
import EraserIcon from 'src/components/Svg/EraserIcon';
import lobbyStore from 'src/store/lobbyStore';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = (): JSX.Element => {
	const onSelect = (CurrentTool: typeof Tool): void => {
		if (canvasStore.canvas && lobbyStore.socket && lobbyStore.sessionId) {
			if (toolStore.tool instanceof CurrentTool) {
				toolStore.tool.destroyEvents();
				toolStore.setTool(null);
			} else {
				toolStore.setTool(
					new CurrentTool(
						canvasStore.canvas,
						lobbyStore.socket,
						lobbyStore.sessionId
					)
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
};

export default observer(Toolbar);
