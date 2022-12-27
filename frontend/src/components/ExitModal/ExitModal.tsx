import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import lobbyStore from 'src/store/lobbyStore';
import { ModalComponent } from '../ModalComponent';
import styles from './ExitModal.module.scss';

const ExitModalContent = observer((): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleYes = (): void => {
		navigate(`/`);
		lobbyStore.closeExitModal();
	};

	const handleNo = (): void => {
		lobbyStore.closeExitModal();
	};

	return (
		<div className={styles.wrapper}>
			<p>{t('room.exit_message')}</p>
			<p className={styles.description}>{t('room.exit_description')}</p>
			<div className={styles.buttons}>
				<button
					type="button"
					className={styles.button}
					onClick={handleYes}
				>
					{t('room.exit_yes')}
				</button>
				<button
					type="button"
					className={styles.button}
					onClick={handleNo}
				>
					{t('room.exit_no')}
				</button>
			</div>
		</div>
	);
});

export const ExitModal = observer((): JSX.Element => {
	return (
		<ModalComponent
			className={styles.container}
			isOpen={lobbyStore.isExitModalOpen}
			onClose={lobbyStore.closeExitModal}
			child={<ExitModalContent />}
		/>
	);
});
