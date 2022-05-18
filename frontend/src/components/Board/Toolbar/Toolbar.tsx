import React, { useState } from 'react';
import cn from 'classnames';
import Pencil from 'src/components/Svg/Pencil';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<button className={styles.button} type="button">
					<Pencil
						onClick={() => {
							// toolState.setTool(new Pencil(canvasState.canvas));
							// setCurrentTool('Pencil');
						}}
						// className={cn(styles.icon, {
						// 	[styles.active]: currentTool === 'Pencil',
						// })}
					/>
				</button>
			</div>
		</div>
	);
};

export default Toolbar;
