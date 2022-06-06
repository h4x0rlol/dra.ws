import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserIcon from 'src/components/Svg/UserIcon';
import lobbyStore from 'src/store/lobbyStore';
import styles from './CreateLobby.module.scss';

const CreateLobby: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const usernameRef = useRef<HTMLInputElement | null>(null);

	const createHandler = (): void => {
		lobbyStore.setUserName(usernameRef.current?.value);
		navigate(`/lobby/f${(+new Date()).toString(16)}`);
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
					<input
						type="text"
						placeholder={t('home.placeholder')}
						ref={usernameRef}
						className={styles.input}
					/>
				</div>

				{/* <div className={styles.error}>Maximum length must be 8 symbols</div> */}
			</div>

			<div className={styles.buttons}>
				<button
					type="button"
					className={styles.button}
					onClick={createHandler}
				>
					{t('home.start')}
				</button>
				<div className={styles.input_wrapper}>
					<p className={styles.p}>{t('home.private')} </p>
					<input type="checkbox" className={styles.checkbox} />
				</div>
			</div>
		</div>
	);
};

export default observer(CreateLobby);
