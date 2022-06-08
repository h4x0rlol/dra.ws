import canvasStore from 'src/store/canvasStore';
import Tool from './Tool';

export default class Pencil extends Tool {
	constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
		super(canvas, socket, id);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.lineWidth = 1;
		this.ctx.globalAlpha = 1;
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
		this.ctx.beginPath();
		this.ctx.moveTo(
			(e.offsetX * this.canvas.width) / this.canvas.clientWidth || 0,
			(e.offsetY * this.canvas.height) / this.canvas.clientHeight || 0
		);
	}

	mouseMoveHandler(e: MouseEvent): void {
		if (this.mouseDown) {
			this.draw(
				(e.offsetX * this.canvas.width) / this.canvas.clientWidth || 0,
				(e.offsetY * this.canvas.height) / this.canvas.clientHeight || 0
			);
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
		this.ctx.beginPath();
		this.ctx.moveTo(
			(x * this.canvas.width) / this.canvas.clientWidth || 0,
			(y * this.canvas.height) / this.canvas.clientHeight || 0
		);
	}

	touchMoveHandler(ev: TouchEvent): void {
		if (this.mouseDown) {
			ev.preventDefault();
			const bcr = (
				ev as unknown as React.MouseEvent<HTMLElement>
			).currentTarget.getBoundingClientRect();
			const x = ev.targetTouches[0].clientX - bcr.x;
			const y = ev.targetTouches[0].clientY - bcr.y;
			this.draw(
				(x * this.canvas.width) / this.canvas.clientWidth || 0,
				(y * this.canvas.height) / this.canvas.clientHeight || 0
			);
		}
	}

	mouseUpHandler(): void {
		this.mouseDown = false;
	}

	draw(x: number, y: number): void {
		this.ctx.shadowBlur = 0;
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	}
}
