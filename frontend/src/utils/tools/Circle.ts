import { Figures } from 'src/api/figures';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { getLineType } from '../helpers';
import Tool from './Tool';

export default class Circle extends Tool {
	startX: number;

	startY: number;

	radius: number;

	saved: string;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		this.ctx.shadowBlur = 0;
		this.startX = 0;
		this.startY = 0;
		this.radius = 0;
		this.saved = '';
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
		const canvasData = this.canvas.toDataURL();
		const coordinates = this.getCanvasCoordinates(x, y);
		canvasStore.pushToUndo(canvasData);
		this.startX = coordinates.x;
		this.startY = coordinates.y;
		this.saved = canvasData;
	}

	mouseDownHandler(e: MouseEvent): void {
		this.downHandler(e.offsetX, e.offsetY);
	}

	mouseMoveHandler(e: MouseEvent): void {
		if (this.mouseDown) {
			const coordinates = this.getCanvasCoordinates(e.offsetX, e.offsetY);
			const width = coordinates.x - this.startX;
			const height = coordinates.y - this.startY;
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
			figure: {
				type: Figures.CIRCLE,
				x: this.startX,
				y: this.startY,
				fill: toolStore.fill,
				radius: this.radius,
				lineWidth: toolStore.lineWidth,
				lineType: getLineType(toolStore.lineType, toolStore.lineWidth),
				color: toolStore.color,
			},
		};
		this.sendMessage(JSON.stringify(message));
	}

	draw(x: number, y: number, r: number): void {
		const img = new Image();
		img.src = this.saved;
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

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		radius: number,
		fill: boolean,
		lineWidth: number,
		lineType: number[],
		color: string
	): void {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.setLineDash(lineType);
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.shadowBlur = 0;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);

		if (fill) {
			ctx.fillStyle = color;
			ctx.fill();
		}

		ctx.stroke();
	}
}
