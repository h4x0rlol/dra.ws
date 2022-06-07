import { makeAutoObservable } from 'mobx';
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from 'unique-names-generator';

export enum RoomState {
	CHAT = 'chat',
	USERS = 'users',
}

class LobbyStore {
	username: string = '';

	socket: WebSocket | null = null;

	sessionId: string | null = null;

	isPublic: boolean = false;

	roomState: RoomState = RoomState.CHAT;

	constructor() {
		makeAutoObservable(this);
	}

	setUserName(username: string): void {
		this.username = username;
	}

	setRoomState(roomState: RoomState): void {
		this.roomState = roomState;
	}

	setIsPublic(isPublic: boolean): void {
		this.isPublic = isPublic;
	}

	setSocket(socket: WebSocket): void {
		this.socket = socket;
	}

	setSessionId(sessionId: string | undefined): void {
		if (sessionId) {
			this.sessionId = sessionId;
		}
	}
}

export default new LobbyStore();
