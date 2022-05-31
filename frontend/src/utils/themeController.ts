import themeStore from 'src/store/themeStore';

const setTheme = (themeName: string): void => {
	localStorage.setItem('theme', themeName);
	document.documentElement.className = themeName;
	themeStore.setTheme(themeName);
};

const getTheme = (): void => {
	const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const localTheme = localStorage.getItem('theme');

	if (localTheme) {
		setTheme(localTheme);
	} else if (dark) {
		setTheme('dark');
	} else {
		setTheme('light');
	}
};

export { setTheme, getTheme };
