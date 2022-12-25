import React from 'react';
import { Canvas } from './Canvas';
import { SettingsBar } from './SettingsBar';
import { Toolbar } from './Toolbar';

import styles from './Board.module.scss';

export const Board: React.FC = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<SettingsBar />
			<Toolbar />
			<Canvas />
		</div>
	);
};
