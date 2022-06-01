import React, { SVGProps } from 'react';

const SendIcon: React.FC<SVGProps<SVGElement>> = ({
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
			<path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
		</svg>
	);
};

export default SendIcon;
