import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserIcon from 'src/components/Svg/UserIcon';
import styles from './CreateLobby.module.scss';

const CreateLobby: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const [username, setUsername] = useState('');

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
						onChange={(e) => setUsername(e.target.value)}
						className={styles.input}
					/>
				</div>

				{/* <div className={styles.error}>Maximum length must be 8 symbols</div> */}
			</div>

			<div className={styles.buttons}>
				<button type="button" className={styles.button}>
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
