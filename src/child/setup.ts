/**
 *
 */

import { MessageType } from '../types';
import listenerCreator from '../utils/listener';
import { send } from '../utils/sender';

const listener = listenerCreator(window);

let isInFrame: boolean;
try {
	isInFrame = window.self !== window.top;
} catch (e) {
	isInFrame = true;
}

if (isInFrame) {
	// Send a message to the iframe window saying this initialized
	// todo: correctly set target origin
	send(window.parent, { type: MessageType.INIT }, '*');
}

export function read() {}
