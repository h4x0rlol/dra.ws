import { makeAutoObservable } from 'mobx';

class CanvasStore {
	canvas: HTMLCanvasElement | null = null;

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
		this.setBackground(this.background);
	}

	setBackground(color: string): void {
		if (this.canvas) {
			const ctx = this.canvas?.getContext(
				'2d'
			) as unknown as CanvasRenderingContext2D;
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			ctx.globalCompositeOperation = 'source-over';
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
			const ctx = this.canvas?.getContext('2d');
			const dataUrl = this.undoList.pop();
			this.pushToRedo(this.canvas?.toDataURL());

			if (dataUrl) {
				const img: HTMLImageElement = new Image();
				img.src = dataUrl;
				img.onload = () => {
					if (this.canvas) {
						ctx?.clearRect(
							0,
							0,
							this.canvas.width,
							this.canvas?.height
						);
						ctx?.drawImage(
							img,
							0,
							0,
							this.canvas.width,
							this.canvas.height
						);
					}
				};
			}
		}
	}

	redo(): void {
		if (this.redoList.length > 0) {
			const ctx = this.canvas?.getContext('2d');
			const dataUrl = this.redoList.pop();
			this.pushToUndo(this.canvas?.toDataURL());

			if (dataUrl) {
				const img = new Image();
				img.src = dataUrl;
				img.onload = () => {
					if (this.canvas) {
						ctx?.clearRect(
							0,
							0,
							this.canvas.width,
							this.canvas.height
						);
						ctx?.drawImage(
							img,
							0,
							0,
							this.canvas.width,
							this.canvas.height
						);
					}
				};
			}
		}
	}

	clear(): void {
		const ctx = this.canvas?.getContext('2d');
		this.pushToUndo(this.canvas?.toDataURL());
		if (this.canvas) {
			ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.setBackground(this.background);
		}
	}
}

export default new CanvasStore();
