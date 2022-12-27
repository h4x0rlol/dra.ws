import { makeAutoObservable } from 'mobx';
import Tool from 'src/utils/tools/Tool';

class ToolStore {
	tool: Tool | null = null;

	color: string = '#000000';

	lineWidth: number = 5;

	fill: boolean = false;

	lineType: string = 'default';

	constructor() {
		makeAutoObservable(this);
	}

	setTool(tool: Tool | null): void {
		this.tool = tool;
		this.setColor(this.color);
		this.setLineWidth(this.lineWidth);
		this.setLineType(this.lineType);
	}

	setColor(color: string): void {
		this.color = color;
		if (this.tool) {
			this.tool.color = this.color;
		}
	}

	setLineWidth(width: number): void {
		this.lineWidth = width;
		if (this.tool) {
			this.tool.lineWidth = this.lineWidth;
		}
	}

	setFill(fill: boolean): void {
		this.fill = fill;
	}

	setLineType(type: string): void {
		switch (type) {
			case 'default':
				this.lineType = 'default';
				if (this.tool) {
					this.tool.lineType = [];
				}
				break;
			case 'dashed':
				this.lineType = 'dashed';
				if (this.tool) {
					this.tool.lineType = [
						this.lineWidth * 3,
						this.lineWidth * 2,
					];
				}
				break;
			case 'dotted':
				this.lineType = 'dotted';
				if (this.tool) {
					this.tool.lineType = [this.lineWidth, this.lineWidth * 2];
				}
				break;
			default:
				this.lineType = 'default';
				if (this.tool) {
					this.tool.lineType = [];
				}
		}
	}
}

export default new ToolStore();
