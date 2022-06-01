import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LobbyList.module.scss';

const LobbyList: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<div className={styles.wrapper}>
			<ul>
				<li className={styles.item}>
					<a href="dsa" className={styles.link}>
						dsadada
					</a>
				</li>
				<li className={styles.item}>
					<a href="dsa" className={styles.link}>
						dsadada
					</a>
				</li>
			</ul>
		</div>
		// <div className={styles.empty}>
		// 	<div>{t('home.empty')}</div>
		// </div>
	);
};

export default observer(LobbyList);
