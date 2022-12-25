import { observer } from 'mobx-react-lite';
import React from 'react';
import { Welcome } from 'src/components/Welcome';

export const Home: React.FC = observer((): JSX.Element => {
	return <Welcome />;
});
