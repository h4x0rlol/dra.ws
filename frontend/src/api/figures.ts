export enum Figures {
	BRUSH = 'brush',
	RECT = 'rect',
	CIRCLE = 'circle',
	ERASER = 'eraser',
	LINE = 'line',
	FINISH = 'finish',
}

export type Figure = {
	type: Figures;
	x: number;
	y: number;
	startX: number;
	startY: number;
	width: number;
	height: number;
	radius: number;
	fill: boolean;
	lineWidth: number;
	lineType: number[];
	color: string;
};
