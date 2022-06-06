export enum Figures {
	BRUSH = 'brush',
	RECT = 'rect',
	FINISH = 'finish',
}

export type Figure = {
	type: Figures;
	x: number;
	y: number;
	width: number;
	height: number;
	fill: boolean;
};
