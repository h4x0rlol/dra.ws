import React from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';

export const Loader: React.FC = (): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.loader}>
				<div className={cn(styles.wave, styles.top_wave)}>
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
				</div>
				<div className={cn(styles.wave, styles.bottom_wave)}>
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
					<div />
				</div>
			</div>
		</div>
	);
};
