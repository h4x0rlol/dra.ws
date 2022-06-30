import { Figures } from 'src/api/figures';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { getLineType } from '../helpers';
import Tool from './Tool';

export interface MouseCoord {
	x: number;
	y: number;
}

export default class Triangle extends Tool {
	mouse: MouseCoord[];

	constructor(canvas: HTMLCanvasElement) {
		super(canvas);
		this.mouse = [];
		this.listen();
	}

	listen(): void {
		this.canvas.onclick = this.mouseClickHandler.bind(this);
	}

	mouseClickHandler(e: MouseEvent): void {
		canvasStore.pushToUndo(this.canvas?.toDataURL());
		const coordinates = this.getCanvasCoordinates(e.offsetX, e.offsetY);
		this.mouse.push(coordinates);
		if (this.mouse.length >= 3) {
			const message = {
				method: Methods.DRAW,
				id: lobbyStore.sessionId,
				figure: {
					type: Figures.TRIANGLE,
					a: this.mouse[0],
					b: this.mouse[1],
					c: this.mouse[2],
					fill: toolStore.fill,
					lineWidth: toolStore.lineWidth,
					lineType: getLineType(
						toolStore.lineType,
						toolStore.lineWidth
					),
					color: toolStore.color,
				},
			};
			this.mouse = [];
			this.sendMessage(JSON.stringify(message));
		}
		this.draw();
	}

	draw(): void {
		this.ctx.strokeStyle = toolStore.color;
		this.ctx.lineWidth = toolStore.lineWidth;
		this.ctx.setLineDash(
			getLineType(toolStore.lineType, toolStore.lineWidth)
		);

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
	}

	static staticDraw(
		ctx: CanvasRenderingContext2D,
		a: MouseCoord,
		b: MouseCoord,
		c: MouseCoord,
		fill: boolean,
		lineWidth: number,
		lineType: number[],
		color: string
	): void {
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.shadowBlur = 0;
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.setLineDash(lineType);
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
		ctx.lineTo(c.x, c.y);
		ctx.closePath();
		ctx.stroke();

		if (fill) {
			ctx.fillStyle = color;
			ctx.fill();
		}

		lobbyStore.socket?.send(
			JSON.stringify({
				id: lobbyStore.sessionId,
				method: Methods.UPDATE,
				image: canvasStore.canvas?.toDataURL(),
			})
		);
	}
}
