import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MessageTypes } from 'src/api/types';
import { getLocalTime } from 'src/utils/helpers';
import styles from './Message.module.scss';

interface MessageProps {
	messageType: MessageTypes;
	name: string;
	date: string;
	message: string;
}

export const Message: React.FC<MessageProps> = observer(
	({
		messageType = MessageTypes.OUTCOMING,
		name = '',
		date = '',
		message = '',
	}: MessageProps): JSX.Element => {
		return (
			<div
				className={cn(styles.wrapper, {
					[styles.incoming]: messageType === MessageTypes.INCOMING,
					[styles.outcoming]: messageType === MessageTypes.OUTCOMING,
				})}
			>
				<div className={styles.info}>
					<div className={styles.name}>{name}</div>
					<span className={styles.time}>{getLocalTime(date)}</span>
				</div>
				{message}
			</div>
		);
	}
);
