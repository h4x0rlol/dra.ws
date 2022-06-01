import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import SendIcon from 'src/components/Svg/SendIcon';
import Message from '../Message/Message';
import styles from './Room.module.scss';

const Room: React.FC = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.container}>
				<div className={styles.message}>
					<p className={styles.welcome}>{t('room.welcome')}</p>
					<p className={styles.start_time}>16:05</p>
				</div>
			</div>

			<div className={styles.messages}>
				<Message messageType="incoming" />
				<Message messageType="outcoming" />
				<Message messageType="incoming" />
				<Message messageType="outcoming" />
			</div>

			<div className={styles.input_wrapper}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						console.log('send');
					}}
				>
					<div className={styles.textarea_wrapper}>
						<textarea
							className={styles.textarea}
							placeholder={t('room.placeholder')}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									console.log('send');
								}
							}}
						/>
					</div>

					<button type="button" className={styles.button}>
						<SendIcon className={styles.svg} />
					</button>
				</form>
			</div>
		</>
	);
};

export default observer(Room);
