/**
 * Control the parent window
 */

import { MessageType, IScrollMessage } from '../types';

const parentWindow = {
	scrollTo(x: number, y: number): void {
		const msg: IScrollMessage = {
			type: MessageType.SCROLL_TO,
			x,
			y,
		};
		// todo: correctly set origin
		window.parent.postMessage(msg, '*');
	},
};

export default parentWindow;
