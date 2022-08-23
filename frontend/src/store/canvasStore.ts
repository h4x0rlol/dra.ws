import { makeAutoObservable } from 'mobx';
import { Methods } from 'src/api/methods';
import { Message } from 'src/api/types';
import Tool from 'src/utils/tools/Tool';
import lobbyStore from './lobbyStore';

class CanvasStore {
	canvas: HTMLCanvasElement | null = null;

	ctx: CanvasRenderingContext2D | null = null;

	src: string = '';

	background: string = '#fff';

	undoList: string[] = [];

	redoList: string[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas: HTMLCanvasElement): void {
		canvas.width = 1600;
		canvas.height = 900;
		canvas.style.width = '1600px';
		canvas.style.height = '900px';
		this.canvas = canvas;
		const ctx = this.canvas?.getContext(
			'2d'
		) as unknown as CanvasRenderingContext2D;
		this.ctx = ctx;
		this.setBackground(this.background);
	}

	setSrc(src: string): void {
		this.src = src;
	}

	setBackground(color: string): void {
		if (this.canvas && this.ctx) {
			this.ctx.globalCompositeOperation = 'destination-over';
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.globalCompositeOperation = 'source-over';
		}
	}

	pushToUndo(data: string | undefined): void {
		if (data) {
			this.undoList.push(data);
		}
	}

	pushToRedo(data: string | undefined): void {
		if (data) {
			this.redoList.push(data);
		}
	}

	undo(): void {
		if (this.undoList.length > 0) {
			const dataUrl = this.undoList.pop();
			this.pushToRedo(this.canvas?.toDataURL());

			if (dataUrl) {
				const img: HTMLImageElement = new Image();
				img.src = dataUrl;
				img.onload = () => {
					if (this.canvas) {
						this.ctx?.clearRect(
							0,
							0,
							this.canvas.width,
							this.canvas?.height
						);
						this.ctx?.drawImage(
							img,
							0,
							0,
							this.canvas.width,
							this.canvas.height
						);
					}
				};

				setTimeout(() => {
					lobbyStore.socket?.send(
						JSON.stringify({
							id: lobbyStore.sessionId,
							method: Methods.UNDO,
							image: this.canvas?.toDataURL(),
						})
					);
				});
			}
		}
	}

	redo(): void {
		if (this.redoList.length > 0) {
			const dataUrl = this.redoList.pop();
			this.pushToUndo(this.canvas?.toDataURL());

			if (dataUrl) {
				const img = new Image();
				img.src = dataUrl;
				img.onload = () => {
					if (this.canvas) {
						this.ctx?.clearRect(
							0,
							0,
							this.canvas.width,
							this.canvas.height
						);
						this.ctx?.drawImage(
							img,
							0,
							0,
							this.canvas.width,
							this.canvas.height
						);
					}
				};
			}

			setTimeout(() => {
				lobbyStore.socket?.send(
					JSON.stringify({
						id: lobbyStore.sessionId,
						method: Methods.REDO,
						image: this.canvas?.toDataURL(),
					})
				);
			});
		}
	}

	clear(): void {
		this.pushToUndo(this.canvas?.toDataURL());
		if (this.canvas) {
			this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.setBackground(this.background);
		}

		setTimeout(() => {
			lobbyStore.socket?.send(
				JSON.stringify({
					id: lobbyStore.sessionId,
					method: Methods.CLEAR,
					image: this.canvas?.toDataURL(),
				})
			);
		});
	}

	draw(msg: Message): void {
		const { src } = msg.image;
		this.setSrc(src);
		if (this.ctx) {
			Tool.staticDraw(this.ctx, this.src);
		}
	}
}

export default new CanvasStore();
