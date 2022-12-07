import { Methods } from './methods';

export enum MessageTypes {
	OUTCOMING = 'outcoming',
	INCOMING = 'incoming',
}

export interface Image {
	src: string;
}

export interface MouseCoord {
	x: number;
	y: number;
}

export type Message = {
	id: string;
	username: string;
	userId: string;
	method: Methods;
	image: Image;
	users: string[];
	message: string;
	date: string;
	type: MessageTypes;
};

export type ChatMessage = Pick<
	Message,
	'id' | 'userId' | 'username' | 'method' | 'message' | 'date' | 'type'
>;
