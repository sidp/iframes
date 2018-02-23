/**
 * Control the parent window
 */

import { MessageType, IScrollMessage } from '../types';
import { send } from '../utils/sender';

const parentWindow = {
	scrollTo(x: number, y: number): void {
		const msg: IScrollMessage = {
			type: MessageType.SCROLL_TO,
			x,
			y,
		};

		// todo: correctly set origin
		send(window.parent, msg, '*');
	},
};

export default parentWindow;
