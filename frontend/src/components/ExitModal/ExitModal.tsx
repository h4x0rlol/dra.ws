import { observer } from 'mobx-react-lite';
import React from 'react';
import lobbyStore from 'src/store/lobbyStore';
import ModalComponent from '../ModalComponent/ModalComponent';
import styles from './ExitModal.module.scss';

const ExitModal = (): JSX.Element => {
	return (
		<ModalComponent
			className={styles.container}
			isOpen={lobbyStore.isExitModalOpen}
			onClose={lobbyStore.closeExitModal}
			child={<div>Exit modal</div>}
		/>
	);
};

export default observer(ExitModal);
