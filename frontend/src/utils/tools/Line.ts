import { Methods } from 'src/api';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { JPEGQUALITY } from '../constants';
import { getLineType } from '../helpers';
import Tool from './Tool';

export default class Line extends Tool {
	startX: number;

	startY: number;

	offsetX: number;

	offsetY: number;

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(canvas, ctx);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.shadowBlur = 0;
		this.startX = 0;
		this.startY = 0;
		this.offsetX = 0;
		this.offsetY = 0;

		this.listen();
	}

	listen(): void {
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);

		this.canvas.ontouchstart = this.touchDownHandler.bind(this);
		this.canvas.ontouchmove = this.touchMoveHandler.bind(this);
		this.canvas.ontouchend = this.touchUpHandler.bind(this);
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
			this.offsetX = e.offsetX;
			this.offsetY = e.offsetY;
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
			const coordinates = this.getCanvasCoordinates(
				touchCoordinates.x,
				touchCoordinates.y
			);
			this.draw(coordinates.x, coordinates.y);
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
		this.sendMessage(JSON.stringify(message));
	}

	touchUpHandler(ev: TouchEvent): void {
		this.mouseDown = false;
		ev.preventDefault();

		const message = {
			method: Methods.DRAW,
			id: lobbyStore.sessionId,
			image: {
				src: this.canvas.toDataURL('image/jpeg', JPEGQUALITY),
			},
		};
		this.sendMessage(JSON.stringify(message));
	}

	draw(x: number, y: number): void {
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
			this.ctx.moveTo(this.startX, this.startY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		};
	}
}
