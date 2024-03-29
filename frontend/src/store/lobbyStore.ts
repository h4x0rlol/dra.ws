import { makeAutoObservable } from 'mobx';
import { ChatMessage } from 'src/api/types';
import { RoomState } from 'src/utils/types';
import { animals, uniqueNamesGenerator } from 'unique-names-generator';

class LobbyStore {
	username: string = '';

	socket: WebSocket | null = null;

	sessionId: string | null = null;

	userId: string = '';

	isPublic: boolean = false;

	isJoinFromLobby: boolean = false;

	roomState: RoomState = RoomState.CHAT;

	users: string[] = [];

	messages: ChatMessage[] = [];

	isExitModalOpen: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	get isJoinModalOpen(): boolean {
		return !this.isJoinFromLobby;
	}

	setUserId(id: string): void {
		this.userId = id;
	}

	setUsername(username: string): void {
		this.username = username;
	}

	checkUserName(username: string): void {
		if (username.length === 0) {
			const shortName = uniqueNamesGenerator({
				dictionaries: [animals],
				length: 1,
			});
			this.setUsername(shortName.substring(0, 8));
		} else {
			this.setUsername(username);
		}
	}

	setMessage(message: ChatMessage): void {
		if (this.messages.length > 100) {
			this.messages.splice(0, 50);
		}
		this.messages = [...this.messages, message];
	}

	setRoomState(roomState: RoomState): void {
		this.roomState = roomState;
	}

	setUsers(users: string[]): void {
		this.users = users;
	}

	setIsPublic(isPublic: boolean): void {
		this.isPublic = isPublic;
	}

	setIsJoinFromLobby(isJoinFromLobby: boolean): void {
		this.isJoinFromLobby = isJoinFromLobby;
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
