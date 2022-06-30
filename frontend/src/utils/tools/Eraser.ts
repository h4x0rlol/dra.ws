import { Figures } from 'src/api/figures';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import Tool from './Tool';

export default class Eraser extends Tool {
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.listen();
	}

	listen(): void {
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);

		this.canvas.ontouchstart = this.touchDownHandler.bind(this);
		this.canvas.ontouchmove = this.touchMoveHandler.bind(this);
		this.canvas.ontouchend = this.mouseUpHandler.bind(this);
	}

	private downHandler(x: number, y: number): void {
		this.mouseDown = true;
		canvasStore.pushToUndo(this.canvas?.toDataURL());
		const coordinates = this.getCanvasCoordinates(x, y);
		this.ctx.beginPath();
		this.ctx.moveTo(coordinates.x, coordinates.y);
	}

	mouseDownHandler(e: MouseEvent): void {
		this.downHandler(e.offsetX, e.offsetY);
	}

	mouseMoveHandler(e: MouseEvent): void {
		if (this.mouseDown) {
			const coordinates = this.getCanvasCoordinates(e.offsetX, e.offsetY);
			const message = {
				method: Methods.DRAW,
				id: lobbyStore.sessionId,
				figure: {
					type: Figures.ERASER,
					x: coordinates.x,
					y: coordinates.y,
					lineWidth: toolStore.lineWidth,
				},
			};
			this.sendMessage(JSON.stringify(message));
		}
	}

	touchDownHandler(ev: TouchEvent): void {
		const touchCoordinates = this.getTouchCoordinates(ev);
		this.downHandler(touchCoordinates.x, touchCoordinates.y);
	}

	touchMoveHandler(ev: TouchEvent): void {
		if (this.mouseDown) {
			ev.preventDefault();
			const touchCoordinates = this.getTouchCoordinates(ev);
			const message = {
				method: Methods.DRAW,
				id: lobbyStore.sessionId,
				figure: {
					type: Figures.ERASER,
					x: touchCoordinates.x,
					y: touchCoordinates.y,
					lineWidth: toolStore.lineWidth,
				},
			};
			this.sendMessage(JSON.stringify(message));
		}
	}

	mouseUpHandler(): void {
		this.mouseDown = false;
		const message = {
			method: Methods.DRAW,
			id: lobbyStore.sessionId,
			figure: {
				type: Figures.FINISH,
			},
		};
		this.sendMessage(JSON.stringify(message));
	}

	static draw(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		lineWidth: number
	): void {
		ctx.strokeStyle = 'white';
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.shadowBlur = 0;
		ctx.setLineDash([]);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
