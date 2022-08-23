import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Methods } from 'src/api/methods';
import SendIcon from 'src/components/Svg/SendIcon';
import lobbyStore from 'src/store/lobbyStore';
import { getLocalTime, getUtcTime } from 'src/utils/helpers';
import Message from '../Message/Message';
import styles from './Room.module.scss';

const Room: React.FC = (): JSX.Element => {
	const { t } = useTranslation();
	const params = useParams();
	const [message, setMessage] = useState<string>('');
	const listRef = useRef<HTMLDivElement>(null);

	const getCurrentTime = (): string => getLocalTime(getUtcTime());

	const scrollToLastMessage: () => void = useCallback(() => {
		const lastChild = listRef.current?.lastElementChild;
		lastChild?.scrollIntoView({
			block: 'end',
			inline: 'nearest',
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		scrollToLastMessage();
	}, [lobbyStore.messages, scrollToLastMessage]);

	const handleSend = (): void => {
		lobbyStore.socket?.send(
			JSON.stringify({
				id: params.id,
				userId: lobbyStore.userId,
				username: lobbyStore.username,
				method: Methods.MESSAGE,
				message,
				date: getUtcTime(),
			})
		);
		setMessage('');
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.message}>
					<p className={styles.welcome}>{t('room.welcome')}</p>
					<p className={styles.start_time}>{getCurrentTime()}</p>
				</div>
			</div>

			<div className={styles.messages} ref={listRef}>
				{lobbyStore.messages.map((m, i) => {
					return (
						<Message
							key={`${m.userId}-${i + 1}`}
							messageType={m.type}
							message={m.message}
							name={m.username}
							date={getLocalTime(m.date)}
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
