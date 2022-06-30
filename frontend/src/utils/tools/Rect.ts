import { Figures } from 'src/api/figures';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { getLineType } from '../helpers';
import Tool from './Tool';

export default class Rect extends Tool {
	startX: number;

	startY: number;

	width: number;

	height: number;

	saved: string;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.shadowBlur = 0;
		this.startX = 0;
		this.startY = 0;
		this.width = 0;
		this.height = 0;
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

	mouseDownHandler(e: MouseEvent): void {
		this.mouseDown = true;
		canvasStore.pushToUndo(this.canvas?.toDataURL());
		this.startX =
			(e.offsetX * this.canvas.width) / this.canvas.clientWidth || 0;
		this.startY =
			(e.offsetY * this.canvas.height) / this.canvas.clientHeight || 0;
		this.saved = this.canvas.toDataURL();
	}

	mouseMoveHandler(e: MouseEvent): void {
		if (this.mouseDown) {
			const currentX =
				(e.offsetX * this.canvas.width) / this.canvas.clientWidth || 0;
			const currentY =
				(e.offsetY * this.canvas.height) / this.canvas.clientHeight ||
				0;
			this.width = currentX - this.startX;
			this.height = currentY - this.startY;

			this.draw(this.startX, this.startY, this.width, this.height);
		}
	}

	touchDownHandler(ev: TouchEvent): void {
		const bcr = (
			ev as unknown as React.MouseEvent<HTMLElement>
		).currentTarget.getBoundingClientRect();
		const x = ev.targetTouches[0].clientX - bcr.x;
		const y = ev.targetTouches[0].clientY - bcr.y;

		this.mouseDown = true;
		canvasStore.pushToUndo(this.canvas?.toDataURL());
		this.startX = (x * this.canvas.width) / this.canvas.clientWidth || 0;
		this.startY = (y * this.canvas.height) / this.canvas.clientHeight || 0;
		this.saved = this.canvas.toDataURL();
	}

	touchMoveHandler(ev: TouchEvent): void {
		if (this.mouseDown) {
			ev.preventDefault();
			const bcr = (
				ev as unknown as React.MouseEvent<HTMLElement>
			).currentTarget.getBoundingClientRect();
			const x = ev.targetTouches[0].clientX - bcr.x;
			const y = ev.targetTouches[0].clientY - bcr.y;
			const currentX =
				(x * this.canvas.width) / this.canvas.clientWidth || 0;
			const currentY =
				(y * this.canvas.height) / this.canvas.clientHeight || 0;
			this.width = currentX - this.startX;
			this.height = currentY - this.startY;

			this.draw(this.startX, this.startY, this.width, this.height);
		}
	}

	mouseUpHandler(): void {
		this.mouseDown = false;
		lobbyStore.socket?.send(
			JSON.stringify({
				method: Methods.DRAW,
				id: lobbyStore.sessionId,
				figure: {
					type: Figures.RECT,
					x: this.startX,
					y: this.startY,
					fill: toolStore.fill,
					width: this.width,
					height: this.height,
					lineWidth: toolStore.lineWidth,
					lineType: getLineType(
						toolStore.lineType,
						toolStore.lineWidth
					),
					color: toolStore.color,
				},
			})
		);
	}

	draw(x: number, y: number, w: number, h: number): void {
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
			this.ctx.rect(x, y, w, h);

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
		w: number,
		h: number,
		fill: boolean,
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
		ctx.rect(x, y, w, h);

		if (fill) {
			ctx.fillStyle = color;
			ctx.fill();
		}

		ctx.stroke();
	}
}
