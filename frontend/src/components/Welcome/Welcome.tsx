import { observer } from 'mobx-react-lite';
import React from 'react';
import CreateLobby from './CreateLobby/CreateLobby';
import LobbyList from './LobbyList/LobbyList';
import styles from './Welcome.module.scss';

const Welcome: React.FC = (): JSX.Element => {
	return (
		<div>
			<LobbyList />
		</div>
	);
};

export default observer(Welcome);
