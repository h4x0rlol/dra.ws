import { Figure } from './figures';
import { Methods } from './methods';

export enum MessageTypes {
	OUTCOMING = 'outcoming',
	INCOMING = 'incoming',
}

export type Message = {
	id: string;
	username: string;
	userId: string;
	method: Methods;
	figure: Figure;
	users: string[];
	message: string;
	date: string;
	type: MessageTypes;
};

export type ChatMessage = {
	id: string;
	userId: string;
	username: string;
	method: Methods;
	message: string;
	date: string;
	type: MessageTypes;
};
