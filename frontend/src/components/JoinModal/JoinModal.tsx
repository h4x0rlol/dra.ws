import { observer } from 'mobx-react-lite';
import React from 'react';
import lobbyStore from 'src/store/lobbyStore';
import ModalComponent from '../ModalComponent/ModalComponent';
import styles from './JoinModal.module.scss';

const JoinModal = (): JSX.Element => {
	return (
		<ModalComponent
			className={styles.container}
			isOpen={lobbyStore.isJoinModalOpen}
			onClose={lobbyStore.closeJoinModal}
			child={<div>Join modal</div>}
		/>
	);
};

export default observer(JoinModal);
