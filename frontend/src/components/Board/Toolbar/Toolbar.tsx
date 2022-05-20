import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import PencilIcon from 'src/components/Svg/PencilIcon';
import toolStore from 'src/store/toolStore';
import canvasStore from 'src/store/canvasStore';
import Pencil from 'src/utils/tools/Pencil';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = observer((): JSX.Element => {
	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<button
					type="button"
					onClick={() => {
						if (canvasStore.canvas) {
							if (toolStore.tool instanceof Pencil) {
								toolStore.tool.destroyEvents();
								toolStore.setTool(null);
							} else {
								toolStore.setTool(
									new Pencil(canvasStore.canvas)
								);
							}
						}
					}}
					className={cn(styles.button, {
						[styles.active]: toolStore.tool instanceof Pencil,
					})}
				>
					<PencilIcon className={styles.icon} />
				</button>
			</div>
		</div>
	);
});

export default Toolbar;
