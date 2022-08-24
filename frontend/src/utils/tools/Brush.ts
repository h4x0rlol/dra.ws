import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { getLineType } from '../helpers';
import Tool from './Tool';

export default class Brush extends Tool {
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(canvas, ctx);
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
		canvasStore.pushToUndo(this.canvas?.toDataURL('image/jpeg', 0.85));
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
			this.draw(coordinates.x, coordinates.y);
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
			this.draw(touchCoordinates.x, touchCoordinates.y);
		}
	}

	mouseUpHandler(): void {
		this.mouseDown = false;
		const message = {
			method: Methods.DRAW,
			id: lobbyStore.sessionId,
			image: {
				src: this.canvas.toDataURL('image/jpeg', 0.85),
			},
		};
		this.sendMessage(JSON.stringify(message));
	}

	draw(x: number, y: number): void {
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.shadowBlur = this.lineWidth / 2;
		this.ctx.setLineDash(
			getLineType(toolStore.lineType, toolStore.lineWidth)
		);
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
