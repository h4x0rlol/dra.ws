import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import styles from './Message.module.scss';

interface MessageProps {
	messageType: 'incoming' | 'outcoming';
}

const Message: React.FC<MessageProps> = ({
	messageType,
}: MessageProps): JSX.Element => {
	return (
		<div
			className={cn(styles.wrapper, {
				[styles.incoming]: messageType === 'incoming',
				[styles.outcoming]: messageType === 'outcoming',
			})}
		>
			<div className={styles.info}>
				<div className={styles.name}>nickname</div>
				<span className={styles.time}>16:05</span>
			</div>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, ex
			voluptatum omnis eos atque, quod commodi quaerat laborum quo maiores
			possimus neque explicabo facere nulla sequi! Laborum blanditiis,
			quisquam possimus dignissimos ea dolorum provident, voluptatibus
			ipsum cumque natus maiores quia mollitia sapiente tenetur sequi
			delectus itaque perspiciatis labore. Repudiandae amet accusantium
			assumenda aut voluptatum inventore non, quibusdam delectus
			reiciendis, eaque vel, maxime perferendis aliquid a eum quod? Dolore
			ex unde velit ullam ipsum, officiis provident magni accusamus
			corrupti? Labore eaque deserunt dolore similique aperiam officia
			dignissimos omnis at rem enim nulla nobis facilis sed, sapiente,
			nisi libero fugit dolor excepturi totam exercitationem adipisci
			laboriosam cumque! Quibusdam suscipit perferendis, recusandae
			obcaecati culpa qui, libero dolores ratione veritatis molestias
			voluptate ipsam eos doloribus quo omnis similique odit consequuntur
			nihil nostrum numquam. Laborum aliquid sequi recusandae facilis
			officia omnis delectus dignissimos eos cumque eaque, libero,
			consectetur rerum, iusto ipsam alias accusamus soluta similique quas
			nesciunt reiciendis corrupti at! Quia nisi veritatis quis obcaecati,
			vero officiis ducimus temporibus ipsum quos illum neque repellat
			praesentium doloribus aut necessitatibus ad sapiente, voluptate
			reprehenderit. Consequatur commodi amet ut asperiores vitae odit
			soluta molestias maxime accusamus aliquam, molestiae distinctio
			labore? Culpa, odit ipsam? Ad ratione iste quas rem.
		</div>
	);
};

export default observer(Message);
