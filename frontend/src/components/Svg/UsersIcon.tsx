import React, { SVGProps } from 'react';

export const UsersIcon: React.FC<SVGProps<SVGElement>> = ({
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
			<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z" />
		</svg>
	);
};
