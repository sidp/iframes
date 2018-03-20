/**
 * Listen for messages and call provided callback functions.
 */

import {
	AllowedOrigin,
	MessageType,
	IMessage,
	IListener,
	ISimpleMessage,
	IScrollMessage,
	IResizeMessage,
	ISetSizeInfoMessage,
} from '../types';

export class Listener {
	listeners: IListener[] = [];
	allowedOrigins: AllowedOrigin;

	constructor(on: Window, allowedOrigins: AllowedOrigin) {
		on.addEventListener('message', this.handleMessages);
		this.allowedOrigins = allowedOrigins;
		this.on = this.on.bind(this);
		this.off = this.off.bind(this);
	}

	handleMessages = (ev: MessageEvent) => {
		const msg = ev.data as IMessage;

		if (!validateOrigin(this.allowedOrigins, ev.origin)) {
			console.warn(ev.origin, 'not allowed');
			return;
		}

		this.listeners
			.filter(listener => listener.type === msg.type)
			.forEach(listener => listener.fn(msg));
	};

	// todo: move this to type def
	on(type: MessageType.INIT, fn: (msg: ISimpleMessage) => void): void;
	on(type: MessageType.SCROLL_TO, fn: (msg: IScrollMessage) => void): void;
	on(type: MessageType.RESIZE, fn: (msg: IResizeMessage) => void): void;
	on(
		type: MessageType.SET_SIZE_INFO,
		fn: (msg: ISetSizeInfoMessage) => void
	): void;
	on(type: MessageType, fn: (msg: any) => void): void {
		if (typeof fn !== 'function') {
			throw new Error(
				`Listener#on(type, fn) requires the second argument to be a function. ${typeof fn} provided.`
			);
		}
		this.listeners.push({ type, fn });
	}

	off(type: MessageType, fn: (msg: any) => void) {
		this.listeners = this.listeners.filter(listener => listener.fn !== fn);
	}
}

export default function listener(on: Window, allowedOrigins: AllowedOrigin) {
	return new Listener(on, allowedOrigins);
}

/**
 * Helpers
 */

function validateOrigin(allowed: AllowedOrigin, origin: string): boolean {
	if (typeof allowed === 'string') {
		return allowed === '*' || allowed === origin;
	}

	return allowed.includes(origin);
}
