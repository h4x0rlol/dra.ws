import React from 'react';
import Canvas from 'src/components/Board/Canvas';
import SettingsBar from 'src/components/Board/SettingsBar';
import Toolbar from 'src/components/Board/Toolbar';
import './Board.scss';

const Board: React.FC = (): JSX.Element => {
	return (
		<div className="board">
			<SettingsBar />
			<Toolbar />
			<Canvas />
		</div>
	);
};

export default Board;
