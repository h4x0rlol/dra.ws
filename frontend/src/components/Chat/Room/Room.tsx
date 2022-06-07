import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import SendIcon from 'src/components/Svg/SendIcon';
import lobbyStore from 'src/store/lobbyStore';
import { Methods } from 'src/api/methods';
import { useParams } from 'react-router-dom';
import { MessageTypes } from 'src/api/message';
import Message from '../Message/Message';

import styles from './Room.module.scss';

const Room: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const params = useParams();
	const [message, setMessage] = useState<string>('');

	const handleSend = (): void => {
		lobbyStore.socket?.send(
			JSON.stringify({
				id: params.id,
				userId: lobbyStore.userId,
				username: lobbyStore.username,
				method: Methods.MESSAGE,
				message,
				date: new Date().toLocaleTimeString('en-US', {
					hour12: false,
					hour: 'numeric',
					minute: 'numeric',
				}),
				type: MessageTypes.OUTCOMING,
			})
		);
		setMessage('');
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.message}>
					<p className={styles.welcome}>{t('room.welcome')}</p>
					<p className={styles.start_time}>
						{new Date().toLocaleTimeString('en-US', {
							hour12: false,
							hour: 'numeric',
							minute: 'numeric',
						})}
					</p>
				</div>
			</div>

			<div className={styles.messages}>
				{lobbyStore.messages.map((m, i) => {
					return (
						<Message
							key={`m.username-${i + 1}`}
							messageType={m.type}
							message={m.message}
							name={m.username}
							date={m.date}
						/>
					);
				})}
			</div>

			<div className={styles.input_wrapper}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className={styles.textarea_wrapper}>
						<textarea
							className={styles.textarea}
							placeholder={t('room.placeholder')}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									console.log('send');
									handleSend();
								}
							}}
						/>
					</div>

					<button
						type="button"
						className={styles.button}
						onClick={handleSend}
					>
						<SendIcon className={styles.svg} />
					</button>
				</form>
			</div>
		</>
	);
};

export default observer(Room);
