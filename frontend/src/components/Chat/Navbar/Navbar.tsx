import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ExitIcon from 'src/components/Svg/ExitIcon';
import ShareIcon from 'src/components/Svg/ShareIcon';
import UserIcon from 'src/components/Svg/UserIcon';
import UsersIcon from 'src/components/Svg/UsersIcon';
import styles from './Navbar.module.scss';

const Navbar: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.item}>
					<UserIcon className={styles.user_svg} />
					<p className={styles.p}>adeptqqq</p>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<p className={styles.p}>Private</p>
					<input type="checkbox" className={styles.checkbox} />
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<p className={styles.p}>{t('navbar.users')}</p>
					<button type="button" className={styles.button}>
						<UsersIcon className={styles.svg} />
					</button>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>sssss</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<button type="button" className={styles.button}>
						<ShareIcon className={styles.svg} />
					</button>
				</div>
				<div className={styles.hr} />

				<div className={styles.item}>
					<button type="button" className={styles.button}>
						<ExitIcon className={styles.svg} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default observer(Navbar);
