/**
 *
 */

import { MessageType, ISizeInfo } from '../types';
import listenerCreator from '../utils/listener';
import { send } from '../utils/sender';

let initialized = false;
let isFramed: boolean;

try {
	isFramed = window.self !== window.top;
} catch (e) {
	isFramed = true;
}

let iframeSizeInfo: ISizeInfo;

if (isFramed && !initialized) {
	initialized = true;

	const listener = listenerCreator(window);
	listener.on(MessageType.SET_SIZE_INFO, msg => {
		iframeSizeInfo = msg.sizeInfo;
	});

	send(window.parent, { type: MessageType.INIT }, '*');
}

export function getSizeInfo() {
	return iframeSizeInfo;
}
