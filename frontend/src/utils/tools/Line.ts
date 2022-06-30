import { Figures } from 'src/api/figures';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { getLineType } from '../helpers';
import Tool from './Tool';

export default class Line extends Tool {
	startX: number;

	startY: number;

	saved: string;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.shadowBlur = 0;
		this.startX = 0;
		this.startY = 0;
		this.saved = '';
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

	mouseUpHandler(e: MouseEvent): void {
		this.mouseDown = false;
		const coordinates = this.getCanvasCoordinates(e.offsetX, e.offsetY);
		const message = {
			method: Methods.DRAW,
			id: lobbyStore.sessionId,
			figure: {
				type: Figures.LINE,
				x: coordinates.x,
				y: coordinates.y,
				startX: this.startX,
				startY: this.startY,
				lineWidth: toolStore.lineWidth,
				lineType: getLineType(toolStore.lineType, toolStore.lineWidth),
				color: toolStore.color,
			},
		};
		this.sendMessage(JSON.stringify(message));
	}

	touchUpHandler(ev: TouchEvent): void {
		this.mouseDown = false;
		ev.preventDefault();
		const bcr = (
			ev as unknown as React.MouseEvent<HTMLElement>
		).currentTarget.getBoundingClientRect();
		const x = ev.changedTouches[0].clientX - bcr.x;
		const y = ev.changedTouches[0].clientY - bcr.y;

		const message = {
			method: Methods.DRAW,
			id: lobbyStore.sessionId,
			figure: {
				type: Figures.LINE,
				x,
				y,
				startX: this.startX,
				startY: this.startY,
				lineWidth: toolStore.lineWidth,
				lineType: getLineType(toolStore.lineType, toolStore.lineWidth),
				color: toolStore.color,
			},
		};
		this.sendMessage(JSON.stringify(message));
	}

	draw(x: number, y: number): void {
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
			this.ctx.moveTo(this.startX, this.startY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		};
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		startX: number,
		startY: number,
		lineWidth: number,
		lineType: number[],
		color: string
	): void {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.setLineDash(lineType);
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.shadowBlur = 0;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
