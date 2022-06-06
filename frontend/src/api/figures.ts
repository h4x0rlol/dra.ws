export enum Figures {
	BRUSH = 'brush',
	FINISH = 'finish',
}

export type Figure = {
	type: Figures;
	x: number;
	y: number;
};
