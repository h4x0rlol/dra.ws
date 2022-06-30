import lobbyStore from 'src/store/lobbyStore';
import { Coordinates } from '../types';

export default class Tool {
	canvas: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;

	mouseDown: boolean;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d', {
			alpha: false,
		}) as unknown as CanvasRenderingContext2D;
		this.mouseDown = false;
		this.destroyEvents();
	}

	set color(color: string) {
		this.ctx.strokeStyle = color;
	}

	set lineWidth(width: number) {
		this.ctx.lineWidth = width;
	}

	set lineType(type: number[]) {
		this.ctx.setLineDash(type);
	}

	getCanvasCoordinates(xCord: number, yCord: number): Coordinates {
		const x = (xCord * this.canvas.width) / this.canvas.clientWidth || 0;
		const y = (yCord * this.canvas.height) / this.canvas.clientHeight || 0;
		return {
			x,
			y,
		};
	}

	getTouchCoordinates = (ev: TouchEvent): Coordinates => {
		const bcr = (
			ev as unknown as React.MouseEvent<HTMLElement>
		).currentTarget.getBoundingClientRect();
		const x = ev.targetTouches[0].clientX - bcr.x;
		const y = ev.targetTouches[0].clientY - bcr.y;
		return {
			x,
			y,
		};
	};

	sendMessage = (message: string): void => {
		lobbyStore.socket?.send(message);
	};

	destroyEvents(): void {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
		this.canvas.onclick = null;
		this.canvas.ontouchstart = null;
		this.canvas.ontouchmove = null;
		this.canvas.ontouchend = null;
	}
}
