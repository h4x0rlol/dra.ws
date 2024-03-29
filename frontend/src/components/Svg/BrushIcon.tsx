import React, { SVGProps } from 'react';

export const BrushIcon: React.FC<SVGProps<SVGElement>> = ({
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
			<path d="M18.247 6.763c-1.215 2.033-2.405 4.002-3.056 5.023-.82 1.287-1.102 1.471-2.748 2.142l-.173-.145c.363-1.752.491-2.063 1.606-3.106.882-.823 2.598-2.351 4.371-3.914zm-10.269 11.254l.871.727c-.16 2.549-2.361 3.452-4.231 3.222 1.736-1.604 1.924-3.639 3.36-3.949zm14.746-17.831s-7.887 6.857-10.213 9.03c-1.838 1.719-1.846 2.504-2.441 5.336l2.016 1.681c2.671-1.099 3.44-1.248 4.793-3.373 1.713-2.687 7.016-11.698 7.016-11.698.422-.748-.516-1.528-1.171-.976zm-14.098 15.767c-5.093.053-3.121 5.901-8.626 5.445 3.252 4.523 11.38 3.041 10.832-3.604l-2.206-1.841z" />
		</svg>
	);
};
