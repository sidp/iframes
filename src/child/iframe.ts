/**
 * Control the iframe in the parent window
 */

import { getRect } from './setup';
import { MessageType, IResizeMessage } from '../types';
import { send } from '../utils/sender';

type sizeParam = number | string;

interface ISetOrGetValue {
	(n: sizeParam): void;
	(): number;
}

interface ISetOrGetTuple {
	(a: sizeParam, b: sizeParam): void;
	(): [number, number];
}

interface ISendResizeArgs {
	width?: sizeParam;
	height?: sizeParam;
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

export const size: ISetOrGetTuple = (width?: sizeParam, height?: sizeParam) => {
	if (typeof width === 'undefined' || typeof height === 'undefined') {
		const { width, height } = getRect();
		const values: [number, number] = [width, height];
		return values;
	}
	sendResize({ width, height });
};

export const height: ISetOrGetValue = (height?: sizeParam) => {
	if (typeof height === 'undefined') {
		const { height } = getRect();
		return height;
	}
	sendResize({ height });
};

export const width: ISetOrGetValue = (width?: sizeParam) => {
	if (typeof width === 'undefined') {
		const { width } = getRect();
		return width;
	}
	sendResize({ width });
};

export const viewport = {
	top(): number {
		const { top } = getRect();
		return top;
	},
	left(): number {
		const { left } = getRect();
		return left;
	},
	right(): number {
		const { right } = getRect();
		return right;
	},
	bottom(): number {
		const { bottom } = getRect();
		return bottom;
	},
};
