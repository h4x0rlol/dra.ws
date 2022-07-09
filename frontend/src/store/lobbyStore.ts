import { makeAutoObservable } from 'mobx';
import { ChatMessage } from 'src/api/message';

export enum RoomState {
	CHAT = 'chat',
	USERS = 'users',
}

class LobbyStore {
	username: string = '';

	socket: WebSocket | null = null;

	sessionId: string | null = null;

	userId: string = '';

	isPublic: boolean = false;

	roomState: RoomState = RoomState.CHAT;

	messages: ChatMessage[] = [];

	isExitModalOpen: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setUserId(id: string): void {
		this.userId = id;
	}

	setUserName(username: string): void {
		this.username = username;
	}

	setMessages(message: ChatMessage): void {
		if (this.messages.length > 100) {
			this.messages.splice(0, 50);
		}
		this.messages = [...this.messages, message];
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

	openExitModal = (): void => {
		this.isExitModalOpen = true;
	};

	closeExitModal = (): void => {
		this.isExitModalOpen = false;
	};
}

export default new LobbyStore();
