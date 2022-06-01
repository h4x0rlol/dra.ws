import React, { useState } from 'react';
import Navbar from 'src/components/Chat/Navbar/Navbar';
import Room from 'src/components/Chat/Room/Room';
import UsersList from 'src/components/Chat/UsersList/UsersList';
import styles from './Chat.module.scss';

const Chat: React.FC = (): JSX.Element => {
	const [users, setUsers] = useState(false);
	return (
		<div className={styles.container}>
			<Navbar />
			{users ? <UsersList /> : <Room />}
		</div>
	);
};

export default Chat;
