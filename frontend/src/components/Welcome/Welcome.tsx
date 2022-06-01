import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './Welcome.module.scss';

const Welcome: React.FC = (): JSX.Element => {
	return <div>Welcome</div>;
};

export default observer(Welcome);
