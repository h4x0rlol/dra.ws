import React from 'react';
import { observer } from 'mobx-react-lite';
import './Loader.scss';

const Loader: React.FC = (): JSX.Element => {
	return (
		<div className="wrapper">
			<div className="loader">
				<div className="wave top-wave">
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
				<div className="wave bottom-wave">
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

export default observer(Loader);
