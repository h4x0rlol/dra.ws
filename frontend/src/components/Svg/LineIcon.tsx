import React, { SVGProps } from 'react';

export const LineIcon: React.FC<SVGProps<SVGElement>> = ({
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
			<path d="M 20.292969 2.2929688 L 2.2929688 20.292969 L 3.7070312 21.707031 L 21.707031 3.7070312 L 20.292969 2.2929688 z" />
		</svg>
	);
};
