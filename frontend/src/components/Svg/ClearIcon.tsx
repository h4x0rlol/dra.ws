import React, { SVGProps } from 'react';

export const ClearIcon: React.FC<SVGProps<SVGElement>> = ({
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
			<path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 L 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 14.205991 4 16.202724 4.9004767 17.650391 6.3496094 L 15 9 L 22 9 L 22 2 L 19.060547 4.9394531 C 17.251786 3.1262684 14.757292 2 12 2 z" />
		</svg>
	);
};
