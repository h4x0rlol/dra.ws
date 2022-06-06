import { Figure, Figures } from './figures';
import { Methods } from './methods';

export type Message = {
	id: string;
	username: string;
	method: Methods;
	figure: Figure;
};
