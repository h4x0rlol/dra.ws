import { Methods, sendMessage } from 'src/api';
import canvasStore from 'src/store/canvasStore';
import lobbyStore from 'src/store/lobbyStore';
import toolStore from 'src/store/toolStore';
import { JPEGQUALITY } from '../constants';
import { getLineType } from '../helpers';
import { MouseCoord } from '../types';
import { Tool } from './Tool';

export class Triangle extends Tool {
	mouse: MouseCoord[];

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		super(canvas, ctx);
		this.mouse = [];
		this.listen();
	}

	listen(): void {
		this.canvas.onclick = this.mouseClickHandler.bind(this);
	}

	mouseClickHandler(e: MouseEvent): void {
		canvasStore.pushToUndo(
			this.canvas?.toDataURL('image/jpeg', JPEGQUALITY)
		);
		const coordinates = this.getCanvasCoordinates(e.offsetX, e.offsetY);
		this.mouse.push(coordinates);
		this.draw();
		if (this.mouse.length >= 3) {
			const message = {
				method: Methods.DRAW,
				id: lobbyStore.sessionId,
				image: {
					src: this.canvas.toDataURL('image/jpeg', JPEGQUALITY),
				},
			};
			this.mouse = [];
			sendMessage(JSON.stringify(message));
		}
	}

	draw(): void {
		this.ctx.strokeStyle = toolStore.color;
		this.ctx.lineWidth = toolStore.lineWidth;
		this.ctx.lineCap = 'butt';
		this.ctx.lineJoin = 'miter';
		this.ctx.shadowBlur = 0;
		this.ctx.setLineDash(
			getLineType(toolStore.lineType, toolStore.lineWidth)
		);

		if (this.mouse.length >= 3) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.mouse[0].x, this.mouse[0].y);
			this.ctx.lineTo(this.mouse[1].x, this.mouse[1].y);
			this.ctx.lineTo(this.mouse[2].x, this.mouse[2].y);
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
	}
}
