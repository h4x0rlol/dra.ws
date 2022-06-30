import canvasStore from 'src/store/canvasStore';
import Tool from './Tool';

export default class Line extends Tool {
	currentX: number;

	currentY: number;

	saved: string;

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.lineWidth = 3;
		this.ctx.globalAlpha = 1;
		this.currentX = 0;
		this.currentY = 0;
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
		this.currentX =
			(e.offsetX * this.canvas.width) / this.canvas.clientWidth || 0;
		this.currentY =
			(e.offsetY * this.canvas.height) / this.canvas.clientHeight || 0;
		this.ctx.moveTo(this.currentX, this.currentY);
		this.saved = this.canvas.toDataURL();
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
		this.currentX = (x * this.canvas.width) / this.canvas.clientWidth || 0;
		this.currentY =
			(y * this.canvas.height) / this.canvas.clientHeight || 0;
		this.ctx.moveTo(this.currentX, this.currentY);
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
			this.ctx.beginPath();
			this.ctx.moveTo(this.currentX, this.currentY);
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		};
	}
}
