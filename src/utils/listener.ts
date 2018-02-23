import { MessageType, IMessage } from '../types';

interface IListener {
	type: MessageType;
	fn: (msg: IMessage) => void;
}

export class Listener {
	listeners = [];

	constructor(on: Window) {
		on.addEventListener('message', this.handleIncomingMessage);
	}

	handleIncomingMessage = (ev: MessageEvent) => {
		// todo: validate where message comes from
		const msg = ev.data as IMessage;
		this.listeners
			.filter(listener => listener.type === msg.type)
			.forEach(listener => listener.fn(msg));
	};

	on(type: MessageType, fn: (msg: IMessage) => void) {
		this.listeners.push({ type, fn });
	}
}

export default function listener(on: Window) {
	return new Listener(on);
}
