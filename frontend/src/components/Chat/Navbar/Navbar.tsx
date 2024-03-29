import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Id, toast } from 'react-toastify';
import { ExitIcon, ShareIcon, UserIcon, UsersIcon } from 'src/components/Svg';
import { RoomState } from 'src/utils/types';
import { ThemeToggle } from 'src/components/ThemeToggle';
import lobbyStore from 'src/store/lobbyStore';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = observer((): JSX.Element => {
	const { t } = useTranslation();

	const copyNotify = (): Id =>
		toast('Copied to clipboard!', {
			toastId: 'copyNotify',
		});

	const handleCopy = (): void => {
		navigator.clipboard.writeText(window.location.href);
		copyNotify();
	};

	const handleChangeRoomState = (): void => {
		if (lobbyStore.roomState === RoomState.CHAT) {
			lobbyStore.setRoomState(RoomState.USERS);
		} else {
			lobbyStore.setRoomState(RoomState.CHAT);
		}
	};

	const openModal = (): void => {
		lobbyStore.openExitModal();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.item}>
					<UserIcon
						width={25}
						height={25}
						className={styles.user_svg}
					/>
					<p className={styles.p}>{lobbyStore.username}</p>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<p className={styles.p}>Private</p>
					<input
						type="checkbox"
						className={styles.checkbox}
						checked={!lobbyStore.isPublic}
						disabled={Boolean(true)}
					/>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<p className={styles.p}>{t('navbar.users')}</p>
					<button
						type="button"
						className={styles.button}
						onClick={handleChangeRoomState}
					>
						<UsersIcon className={styles.svg} />
					</button>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<ThemeToggle />
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<button
						type="button"
						className={styles.button}
						onClick={handleCopy}
					>
						<ShareIcon className={styles.svg} />
					</button>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<button
						type="button"
						className={styles.button}
						onClick={openModal}
					>
						<ExitIcon className={styles.svg} />
					</button>
				</div>
			</div>
		</div>
	);
});
