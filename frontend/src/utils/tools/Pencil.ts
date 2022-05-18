import Tool from './Tool';

export default class Pencil extends Tool {
	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.lineWidth = 1;
		this.ctx.globalAlpha = 1;
		this.listen();
	}

	listen(): void {
		this.canvas.onmouseup = this.mouseUpHandler.bind(this);
		this.canvas.onmousedown = this.mouseDownHandler.bind(this);
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
	}

	mouseUpHandler(): void {
		this.mouseDown = false;
	}

	mouseDownHandler(e: MouseEvent): void {
		this.mouseDown = true;
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

	draw(x: number, y: number): void {
		if (this.ctx) {
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		}
	}
}
