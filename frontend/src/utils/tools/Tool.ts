import { MouseCoord } from 'src/api/types';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';

export default class Tool {
	canvas: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;

	mouseDown: boolean;

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
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

	getCanvasCoordinates(xCord: number, yCord: number): MouseCoord {
		const x = (xCord * this.canvas.width) / this.canvas.clientWidth || 0;
		const y = (yCord * this.canvas.height) / this.canvas.clientHeight || 0;
		return {
			x,
			y,
		};
	}

	getTouchCoordinates = (ev: TouchEvent): MouseCoord => {
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

	getDistance = (start: number, end: number): number => {
		return end - start;
	};

	static staticDraw(ctx: CanvasRenderingContext2D, src: string): void {
		const img = new Image();
		img.src = src;
		img.onload = () => {
			if (canvasStore.canvas) {
				ctx.clearRect(
					0,
					0,
					canvasStore.canvas.width,
					canvasStore.canvas.height
				);
				ctx.drawImage(
					img,
					0,
					0,
					canvasStore.canvas.width,
					canvasStore.canvas.height
				);
			}
		};
	}

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
