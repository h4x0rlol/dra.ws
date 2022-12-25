import React from 'react';
import themeStore from 'src/store/themeStore';
import { observer } from 'mobx-react-lite';
import { setTheme } from 'src/utils/themeController';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ThemeToggle.scss';

export const ThemeToggle: React.FC = observer((): JSX.Element => {
	const activeTheme: string = themeStore.theme;
	const inactiveTheme: string = activeTheme === 'light' ? 'dark' : 'light';

	const handleThemeChange = (): void => {
		setTheme(inactiveTheme);
	};

	return (
		<>
			<input
				type="checkbox"
				id="checkbox"
				className="checkbox"
				checked={activeTheme === 'dark'}
				onChange={handleThemeChange}
				tabIndex={-1}
			/>
			<label
				htmlFor="checkbox"
				className="label"
				// eslint-disable-next-line
				tabIndex={0}
				aria-hidden="true"
				onKeyPress={(e) => {
					e.preventDefault();
					if (e.key === ' ' || e.key === 'Spacebar') {
						handleThemeChange();
					}
				}}
			>
				<i className="moon">
					<FontAwesomeIcon icon={faMoon} />
				</i>
				<i className="sun">
					<FontAwesomeIcon icon={faSun} />
				</i>
				<div className="ball" />
			</label>
		</>
	);
});
