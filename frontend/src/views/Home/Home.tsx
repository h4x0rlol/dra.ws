import { observer } from 'mobx-react-lite';
import React from 'react';
import Welcome from 'src/components/Welcome/Welcome';

const Home: React.FC = (): JSX.Element => {
	return <Welcome />;
};

export default observer(Home);
