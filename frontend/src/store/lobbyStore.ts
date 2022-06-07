import { makeAutoObservable } from 'mobx';
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from 'unique-names-generator';

class LobbyStore {
	username: string = '';

	socket: WebSocket | null = null;

	sessionId: string | null = null;

	isPublic: boolean = true;

	constructor() {
		makeAutoObservable(this);
	}

	setUserName(username: string): void {
		this.username = username;
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
