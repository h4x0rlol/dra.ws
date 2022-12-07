import React from 'react';
import Canvas from 'src/components/Board/Canvas/Canvas';
import SettingsBar from 'src/components/Board/SettingsBar/SettingsBar';
import Toolbar from 'src/components/Board/Toolbar/Toolbar';
import styles from './Board.module.scss';

const Board: React.FC = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<SettingsBar />
			<Toolbar />
			<Canvas />
		</div>
	);
};

export default Board;
