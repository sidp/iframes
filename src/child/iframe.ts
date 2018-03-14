/**
 * Control the iframe in the parent window
 */

import { getSizeInfo } from './setup';
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
		const { size: { width, height } } = getSizeInfo();
		const values: [number, number] = [width, height];
		return values;
	}
	sendResize({ width, height });
};

export const height: ISetOrGetValue = (height?: sizeParam) => {
	if (typeof height === 'undefined') {
		const { size: { height } } = getSizeInfo();
		return height;
	}
	sendResize({ height });
};

export const width: ISetOrGetValue = (width?: sizeParam) => {
	if (typeof width === 'undefined') {
		const { size: { width } } = getSizeInfo();
		return width;
	}
	sendResize({ width });
};

export const top = () => {
	const { document: { top } } = getSizeInfo();
	return top;
};

export const left = () => {
	const { document: { left } } = getSizeInfo();
	return left;
};

export const right = () => {
	const { document: { right } } = getSizeInfo();
	return right;
};

export const bottom = () => {
	const { document: { bottom } } = getSizeInfo();
	return bottom;
};

export const viewport = {
	top(): number {
		const { viewport: { top } } = getSizeInfo();
		return top;
	},
	left(): number {
		const { viewport: { left } } = getSizeInfo();
		return left;
	},
	right(): number {
		const { viewport: { right } } = getSizeInfo();
		return right;
	},
	bottom(): number {
		const { viewport: { bottom } } = getSizeInfo();
		return bottom;
	},
};

export const all = () => getSizeInfo();
