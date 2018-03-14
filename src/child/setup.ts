/**
 *
 */

import { MessageType } from '../types';
import listenerCreator from '../utils/listener';
import { send } from '../utils/sender';

let initialized = false;
let isFramed: boolean;

try {
	isFramed = window.self !== window.top;
} catch (e) {
	isFramed = true;
}

let iframeRect: ClientRect | DOMRect;

if (isFramed && !initialized) {
	// Send a message to the iframe window saying this initialized
	// todo: correctly set target origin
	initialized = true;

	const listener = listenerCreator(window);
	listener.on(MessageType.SET_SIZE_INFO, msg => {
		iframeRect = msg.rect;
	});

	send(window.parent, { type: MessageType.INIT }, '*');
}

export function getRect() {
	return iframeRect;
}
