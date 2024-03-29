import { Methods, sendMessage } from 'src/api';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import { JPEGQUALITY } from '../constants';
import { Tool } from './Tool';

export class Brush extends Tool {
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(canvas, ctx);
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
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
		canvasStore.pushToUndo(
			this.canvas?.toDataURL('image/jpeg', JPEGQUALITY)
		);
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
				src: this.canvas.toDataURL('image/jpeg', JPEGQUALITY),
			},
		};
		sendMessage(JSON.stringify(message));
	}

	draw(x: number, y: number): void {
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
