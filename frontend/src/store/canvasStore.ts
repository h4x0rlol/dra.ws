import { makeAutoObservable } from 'mobx';
import { Methods, sendMessage } from 'src/api';
import { Message } from 'src/api/types';
import { JPEGQUALITY } from 'src/utils/constants';
import { Tool } from 'src/utils/tools';
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
		canvas.width = 1280;
		canvas.height = 960;
		canvas.style.width = '1280px';
		canvas.style.height = '960px';
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
			this.pushToRedo(this.canvas?.toDataURL('image/jpeg', JPEGQUALITY));

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
					const message = {
						id: lobbyStore.sessionId,
						method: Methods.DRAW,
						image: {
							src: this.canvas?.toDataURL(
								'image/jpeg',
								JPEGQUALITY
							),
						},
					};
					sendMessage(JSON.stringify(message));
				}, 50);
			}
		}
	}

	redo(): void {
		if (this.redoList.length > 0) {
			const dataUrl = this.redoList.pop();
			this.pushToUndo(this.canvas?.toDataURL('image/jpeg', JPEGQUALITY));

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
				const message = {
					id: lobbyStore.sessionId,
					method: Methods.DRAW,
					image: {
						src: this.canvas?.toDataURL('image/jpeg', JPEGQUALITY),
					},
				};
				sendMessage(JSON.stringify(message));
			}, 50);
		}
	}

	clear(): void {
		this.pushToUndo(this.canvas?.toDataURL('image/jpeg', JPEGQUALITY));
		if (this.canvas) {
			this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.setBackground(this.background);
		}

		setTimeout(() => {
			const message = {
				id: lobbyStore.sessionId,
				method: Methods.DRAW,
				image: {
					src: this.canvas?.toDataURL('image/jpeg', JPEGQUALITY),
				},
			};
			sendMessage(JSON.stringify(message));
		}, 50);
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
