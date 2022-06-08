import { Figures } from 'src/api/figures';
import { Methods } from 'src/api/methods';
import canvasStore from 'src/store/canvasStore';
import toolStore from 'src/store/toolStore';
import { getLineType } from '../helpers';
import Tool from './Tool';

export default class Brush extends Tool {
	constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
		super(canvas, socket, id);
		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';

		//  TODO
		// https://codesandbox.io/s/paint-tool-final-g362x?from-embed=&file=/src/index.js:2345-2351
		// Make brush
		// this.ctx.globalAlpha = '0.01';
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
			this.socket?.send(
				JSON.stringify({
					method: Methods.DRAW,
					id: this.id,
					figure: {
						type: Figures.BRUSH,
						x:
							(e.offsetX * this.canvas.width) /
								this.canvas.clientWidth || 0,
						y:
							(e.offsetY * this.canvas.height) /
								this.canvas.clientHeight || 0,
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

			this.socket?.send(
				JSON.stringify({
					method: Methods.DRAW,
					id: this.id,
					figure: {
						type: Figures.BRUSH,
						x,
						y,
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
	}

	mouseUpHandler(): void {
		this.mouseDown = false;

		this.socket?.send(
			JSON.stringify({
				method: Methods.DRAW,
				id: this.id,
				figure: {
					type: Figures.FINISH,
				},
			})
		);
	}

	static draw(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		lineWidth: number,
		lineType: number[],
		color: string
	): void {
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.setLineDash(lineType);
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.shadowColor = color;
		ctx.shadowBlur = lineWidth / 2;
		ctx.quadraticCurveTo(
			x + Number((Math.random() * 10).toFixed()),
			y + Number((Math.random() * 10).toFixed()),
			x,
			y
		);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}
