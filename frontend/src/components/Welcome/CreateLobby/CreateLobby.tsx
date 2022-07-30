import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserIcon from 'src/components/Svg/UserIcon';
import lobbyStore from 'src/store/lobbyStore';
import styles from './CreateLobby.module.scss';

const CreateLobby: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [username, setUsername] = useState(lobbyStore.username);
	const [error, setError] = useState(false);

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUsername(e.target.value);
		if (e.target.value.length > 8) {
			setError(true);
		} else {
			setError(false);
		}
	};

	const createHandler = (): void => {
		if (username.length <= 8) {
			lobbyStore.setUserName(username);
			lobbyStore.setIsJoinFromLobby(true);
			const uuid = uuidv4();
			navigate(`/lobby/f${uuid}`);
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
					<input
						type="text"
						placeholder={t('home.placeholder')}
						value={username}
						onChange={(e) => handleChangeName(e)}
						className={styles.input}
					/>
				</div>

				{error && <div className={styles.error}>{t('home.error')}</div>}
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
					<input
						type="checkbox"
						className={styles.checkbox}
						checked={!lobbyStore.isPublic}
						onChange={() =>
							lobbyStore.setIsPublic(!lobbyStore.isPublic)
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default observer(CreateLobby);
