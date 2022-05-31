import { makeAutoObservable } from 'mobx';

class ThemeStore {
	theme: string = '';

	constructor() {
		makeAutoObservable(this);
	}

	setTheme(theme: string): void {
		this.theme = theme;
	}
}

export default new ThemeStore();
