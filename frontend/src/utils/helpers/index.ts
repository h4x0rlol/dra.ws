export const preventNegativeValue = (n: number): number | null =>
	!!n && Math.abs(n) >= 0 ? Math.abs(n) : null;

export const Colors = {
	blue: '#0000ff',
	brown: '#a52a2a',
	darkblue: '#00008b',
	darkcyan: '#008b8b',
	darkgreen: '#006400',
	darkkhaki: '#bdb76b',
	darkmagenta: '#8b008b',
	darkolivegreen: '#556b2f',
	darkorange: '#ff8c00',
	darkorchid: '#9932cc',
	darkred: '#8b0000',
	darksalmon: '#e9967a',
	darkviolet: '#9400d3',
	fuchsia: '#ff00ff',
	green: '#008000',
	indigo: '#4b0082',
	magenta: '#ff00ff',
	maroon: '#800000',
	navy: '#000080',
	olive: '#808000',
	orange: '#ffa500',
	violet: '#800080',
	red: '#ff0000',
};

export const getRandomColor = (): string => {
	let res = '#a52a2a';
	let count = 0;
	Object.keys(Colors).forEach((color) => {
		count += 1;
		if (Math.random() < 1 / count) {
			res = color;
		}
	});
	return res;
};
