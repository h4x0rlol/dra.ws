import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { MessageTypes } from 'src/api/message';
import styles from './Message.module.scss';

interface MessageProps {
	messageType?: MessageTypes;
	name?: string;
	date?: string;
	message?: string;
}

const Message: React.FC<MessageProps> = ({
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
				<span className={styles.time}>{date}</span>
			</div>
			{message}
		</div>
	);
};

export default observer(Message);
