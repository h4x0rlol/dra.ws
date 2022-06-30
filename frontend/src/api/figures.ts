import { MouseCoord } from 'src/utils/tools/Triangle';

export enum Figures {
	BRUSH = 'brush',
	RECT = 'rect',
	CIRCLE = 'circle',
	ERASER = 'eraser',
	LINE = 'line',
	PENCIL = 'pencil',
	TRIANGLE = 'triangle',
	FINISH = 'finish',
}

export type Figure = {
	type: Figures;
	x: number;
	y: number;
	a: MouseCoord;
	b: MouseCoord;
	c: MouseCoord;
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
