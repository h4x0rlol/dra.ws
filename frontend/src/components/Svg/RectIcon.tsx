import React, { SVGProps } from 'react';

export const RectIcon: React.FC<SVGProps<SVGElement>> = ({
	className,
	onClick,
}): JSX.Element => {
	return (
		<svg
			className={className}
			onClick={onClick}
			xmlns="http://www.w3.org/2000/svg"
			width="25"
			height="25"
			viewBox="0 0 25 25"
		>
			<path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24z" />
		</svg>
	);
};
