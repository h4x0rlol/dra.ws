import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import lobbyStore from 'src/store/lobbyStore';
import ModalComponent from '../ModalComponent/ModalComponent';
import UserIcon from '../Svg/UserIcon';
import styles from './JoinModal.module.scss';

const JoinModallContent = observer((): JSX.Element => {
	const { t } = useTranslation();
	const [username, setUsername] = useState('');
	const [error, setError] = useState(false);

	const handlePress = (): void => {
		if (username.length <= 8) {
			lobbyStore.setUserName(username);
			lobbyStore.closeJoinModal();
		}
	};

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUsername(e.target.value);
		if (e.target.value.length > 8) {
			setError(true);
		} else {
			setError(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.username}>
					<UserIcon
						width={30}
						height={30}
						className={styles.user_svg}
					/>
					<div className={styles.input_wrapper}>
						<input
							type="text"
							placeholder={t('home.placeholder')}
							value={username}
							onChange={(e) => handleChangeName(e)}
							className={styles.input}
						/>
						{error && (
							<div className={styles.error}>
								{t('home.error')}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={styles.buttons}>
				<button
					type="button"
					className={styles.button}
					onClick={handlePress}
				>
					{t('home.start')}
				</button>
			</div>
		</div>
	);
});

const JoinModal = (): JSX.Element => {
	const onRequestClose = (): null => {
		return null;
	};

	return (
		<ModalComponent
			className={styles.container}
			isOpen={lobbyStore.isJoinModalOpen}
			onClose={onRequestClose}
			child={<JoinModallContent />}
		/>
	);
};

export default observer(JoinModal);
