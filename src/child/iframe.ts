/**
 * Control the iframe in the parent window
 */

import { read } from './setup';
import { MessageType, IResizeMessage } from '../types';
import { send } from '../utils/sender';

interface ISetOrGetFunction {
	(x: number, y?: number): void;
	(): number;
}

interface ISendResizeArgs {
	width?: number | string;
	height?: number | string;
}

function sendResize({ width, height }: ISendResizeArgs) {
	const msg: IResizeMessage = {
		type: MessageType.RESIZE,
		width,
		height,
	};

	// todo: correctly set origin
	send(window.parent, msg, '*');
}

export const size: ISetOrGetFunction = (
	width?: number | string,
	height?: number | string
) => {
	if (typeof width === 'undefined') {
		// todo: return size
		return 0;
	}
	sendResize({ width, height });
};

export const height: ISetOrGetFunction = (height?: number | string) => {
	if (typeof height === 'undefined') {
		// todo: get the iframe height
		return 0;
	}
	sendResize({ height });
};

export const width: ISetOrGetFunction = (width?: number | string) => {
	if (typeof width === 'undefined') {
		// todo: get the iframe width
		return 0;
	}
	sendResize({ width });
};
