import { observer } from 'mobx-react-lite';
import React, { ReactNode } from 'react';
import Modal from 'react-modal';
import styles from './ModalComponent.module.scss';

Modal.setAppElement('#root');

interface ModalComponentProps {
	isOpen: boolean;
	onClose: () => void;
	className: string;
	child: ReactNode;
}

const ModalComponent = ({
	isOpen,
	onClose,
	className,
	child,
}: ModalComponentProps): JSX.Element => {
	return (
		<Modal
			isOpen={Boolean(isOpen)}
			onRequestClose={onClose}
			contentLabel="Modal window"
			shouldCloseOnEsc={Boolean(true)}
			className={className}
			overlayClassName={styles.overlay}
		>
			{child}
		</Modal>
	);
};

export default observer(ModalComponent);
