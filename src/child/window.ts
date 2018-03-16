/**
 * Control the parent window
 */

import { isFramed } from './setup';
import { MessageType, IScrollMessage } from '../types';
import { send } from '../utils/sender';

/**
 * Scroll the parent window to a provided position.
 */

export const scrollTo = (x: number, y: number): boolean => {
	if (!isFramed()) return false;

	const msg: IScrollMessage = {
		type: MessageType.SCROLL_TO,
		x,
		y,
	};

	// todo: correctly set origin
	send(window.parent, msg, '*');
	return true;
};
