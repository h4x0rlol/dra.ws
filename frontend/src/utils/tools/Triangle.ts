import canvasStore from 'src/store/canvasStore';
import toolStore from 'src/store/toolStore';
import Tool from './Tool';

interface MouseCoord {
	x: number;
	y: number;
}

interface TriangleCoord {
	a: MouseCoord;
	b: MouseCoord;
	c: MouseCoord;
}

export default class Triangle extends Tool {
	mouse: MouseCoord[];

	triangles: TriangleCoord[];

	constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
		super(canvas, socket, id);
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.lineWidth = 1;
		this.ctx.globalAlpha = 1;
		this.mouse = [];
		this.triangles = [];
		this.listen();
	}

	listen(): void {
		this.canvas.onclick = this.mouseClickHandler.bind(this);
	}

	mouseClickHandler(e: MouseEvent): void {
		canvasStore.pushToUndo(this.canvas?.toDataURL());
		this.mouse.push({
			x: (e.offsetX * this.canvas.width) / this.canvas.clientWidth || 0,
			y: (e.offsetY * this.canvas.height) / this.canvas.clientHeight || 0,
		});
		if (this.mouse.length >= 3) {
			this.triangles.push({
				a: this.mouse[0],
				b: this.mouse[1],
				c: this.mouse[2],
			});
			this.mouse = [];
		}
		this.draw();
	}

	draw(): void {
		for (let tIndex = 0; tIndex < this.triangles.length; tIndex += 1) {
			const triangle = this.triangles[tIndex];
			this.ctx.beginPath();
			this.ctx.moveTo(triangle.a.x, triangle.a.y);
			this.ctx.lineTo(triangle.b.x, triangle.b.y);
			this.ctx.lineTo(triangle.c.x, triangle.c.y);
			this.ctx.closePath();
			this.ctx.stroke();

			if (toolStore.fill) {
				this.ctx.fillStyle = toolStore.color;
				this.ctx.fill();
			}
		}

		if (this.mouse.length > 0) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.mouse[0].x, this.mouse[0].y);
		}
		if (this.mouse.length > 1) {
			this.ctx.lineTo(this.mouse[1].x, this.mouse[1].y);
		}
		if (this.mouse.length > 0) {
			this.ctx.stroke();
		}
		this.triangles = [];
	}
}
