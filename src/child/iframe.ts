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

/**
 * Get or set the size of the iframe
 */

export const size: ISetOrGetTuple = (width?: sizeParam, height?: sizeParam) => {
	if (typeof width === 'undefined' || typeof height === 'undefined') {
		const { size: { width, height } } = getSizeInfo();
		const values: [number, number] = [width, height];
		return values;
	}
	sendResize({ width, height });
};

/**
 * Get or set the width of the iframe
 */

export const width: ISetOrGetValue = (width?: sizeParam) => {
	if (typeof width === 'undefined') {
		const { size: { width } } = getSizeInfo();
		return width;
	}
	sendResize({ width });
};

/**
 * Get or set the height of the iframe
 */

export const height: ISetOrGetValue = (height?: sizeParam) => {
	if (typeof height === 'undefined') {
		const { size: { height } } = getSizeInfo();
		return height;
	}
	sendResize({ height });
};

/**
 * Get the iframe’s position from the top of the document
 */

export const top = () => {
	const { document: { top } } = getSizeInfo();
	return top;
};

/**
 * Get the iframe’s position from the left of the document
 */

export const left = () => {
	const { document: { left } } = getSizeInfo();
	return left;
};

/**
 * Get the iframe’s position from the right of the document
 */

export const right = () => {
	const { document: { right } } = getSizeInfo();
	return right;
};

/**
 * Get the iframe’s position from the bottom of the document
 */

export const bottom = () => {
	const { document: { bottom } } = getSizeInfo();
	return bottom;
};

/**
 * Collection of functions to get the position of the iframe relative to the
 * current viewport.
 */

export const viewport = {
	/**
	 * Get the position from the top of the viewport
	 */
	top(): number {
		const { viewport: { top } } = getSizeInfo();
		return top;
	},
	/**
	 * Get the position from the left of the viewport
	 */
	left(): number {
		const { viewport: { left } } = getSizeInfo();
		return left;
	},
	/**
	 * Get the position from the right of the viewport
	 */
	right(): number {
		const { viewport: { right } } = getSizeInfo();
		return right;
	},
	/**
	 * Get the position from the bottom of the viewport
	 */
	bottom(): number {
		const { viewport: { bottom } } = getSizeInfo();
		return bottom;
	},
};

/**
 * Get all size info.
 */

export const all = () => getSizeInfo();
