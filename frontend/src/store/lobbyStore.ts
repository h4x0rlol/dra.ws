import { makeAutoObservable } from 'mobx';

class LobbyStore {
	username: string = 'dsadsadsa';

	socket: WebSocket | null = null;

	sessionId: string | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setUserName(username: string | undefined): void {
		if (username) {
			this.username = username;
		} else {
			this.username = 'randname';
		}
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
