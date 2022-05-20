export default class Tool {
	canvas: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;

	mouseDown: boolean;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext(
			'2d'
		) as unknown as CanvasRenderingContext2D;

		this.mouseDown = false;
		this.destroyEvents();
	}

	set color(color: string) {
		this.ctx.strokeStyle = color;
	}

	set lineWidth(width: number) {
		this.ctx.lineWidth = width;
	}

	set lineType(type: number[]) {
		this.ctx.setLineDash(type);
	}

	destroyEvents(): void {
		this.canvas.onmouseup = null;
		this.canvas.onmousedown = null;
		this.canvas.onmousemove = null;
		this.canvas.onclick = null;
		this.canvas.ontouchstart = null;
		this.canvas.ontouchmove = null;
		this.canvas.ontouchend = null;
	}
}
