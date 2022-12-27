import { Methods, sendMessage } from 'src/api';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { JPEGQUALITY } from '../constants';
import { getLineType } from '../helpers';
import { Tool } from './Tool';

export class Circle extends Tool {
	startX: number;

	startY: number;

	radius: number;

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(canvas, ctx);
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		this.ctx.shadowBlur = 0;
		this.startX = 0;
		this.startY = 0;
		this.radius = 0;
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
		const coordinates = this.getCanvasCoordinates(x, y);
		canvasStore.pushToUndo(
			this.canvas.toDataURL('image/jpeg', JPEGQUALITY)
		);
		this.startX = coordinates.x;
		this.startY = coordinates.y;
	}

	mouseDownHandler(e: MouseEvent): void {
		this.downHandler(e.offsetX, e.offsetY);
	}

	mouseMoveHandler(e: MouseEvent): void {
		if (this.mouseDown) {
			const coordinates = this.getCanvasCoordinates(e.offsetX, e.offsetY);
			const width = this.getDistance(coordinates.x, this.startX);
			const height = this.getDistance(coordinates.y, this.startY);
			this.radius = Math.sqrt(width ** 2 + height ** 2);
			this.draw(this.startX, this.startY, this.radius);
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
			const coordinates = this.getCanvasCoordinates(
				touchCoordinates.x,
				touchCoordinates.y
			);
			const width = this.getDistance(coordinates.x, this.startX);
			const height = this.getDistance(coordinates.y, this.startY);
			this.radius = Math.sqrt(width ** 2 + height ** 2);
			this.draw(this.startX, this.startY, this.radius);
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

	draw(x: number, y: number, r: number): void {
		const img = new Image();
		img.src = canvasStore.src;
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(
				img,
				0,
				0,
				this.canvas.width,
				this.canvas.height
			);
			this.ctx.strokeStyle = toolStore.color;
			this.ctx.lineWidth = toolStore.lineWidth;
			this.ctx.setLineDash(
				getLineType(toolStore.lineType, toolStore.lineWidth)
			);

			this.ctx.beginPath();
			this.ctx.arc(x, y, r, 0, 2 * Math.PI);
			if (toolStore.fill) {
				this.ctx.fillStyle = toolStore.color;
				this.ctx.fill();
			}
			this.ctx.stroke();
		};
	}
}
