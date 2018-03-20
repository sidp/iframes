/**
 *
 */

import { MessageType, ISizeInfo } from '../types';
import listenerCreator from '../utils/listener';
import { send } from '../utils/sender';

let initialized = false;
let loadedInFrame: boolean;

try {
	loadedInFrame = window.self !== window.top;
} catch (e) {
	loadedInFrame = true;
}

let iframeSizeInfo: ISizeInfo;

if (loadedInFrame && !initialized) {
	initialized = true;

	// todo: set allowed origin for listener
	const listener = listenerCreator(window, '*');
	listener.on(MessageType.SET_SIZE_INFO, msg => {
		iframeSizeInfo = msg.sizeInfo;
	});

	send(window.parent, { type: MessageType.INIT }, '*');
}

/**
 * Check if this page is in an iframe
 */

export function isFramed(): boolean {
	return loadedInFrame;
}

/**
 * Get all the size and position of the iframe relative to the parent
 * window and viewport.
 */

export function getSizeInfo() {
	return iframeSizeInfo;
}
