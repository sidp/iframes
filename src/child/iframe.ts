/**
 * Control the iframe in the parent window
 */

import { getSizeInfo, isFramed } from './setup';
import { MessageType, IResizeMessage, ISizeInfo } from '../types';
import { send } from '../utils/sender';

export type sizeParam = number | string;

export interface ISetOrGetValue {
	(n: sizeParam): void;
	(): number | boolean;
}

export interface ISetOrGetTuple {
	(a: sizeParam, b: sizeParam): void;
	(): [number, number] | boolean;
}

interface ISendResizeArgs {
	width?: sizeParam;
	height?: sizeParam;
}

function sendResize({ width, height }: ISendResizeArgs) {
	if (!isFramed()) return false;

	const msg: IResizeMessage = {
		type: MessageType.RESIZE,
		width,
		height,
	};

	// todo: correctly set origin
	send(window.parent, msg, '*');
	return true;
}

/**
 * Get or set the size of the iframe
 */

export const size: ISetOrGetTuple = (width?: sizeParam, height?: sizeParam) => {
	if (!isFramed()) return false;

	if (typeof width === 'undefined' || typeof height === 'undefined') {
		const { size: { width, height } } = getSizeInfo();
		const values: [number, number] = [width, height];
		return values;
	}

	return sendResize({ width, height });
};

/**
 * Get or set the width of the iframe
 */

export const width: ISetOrGetValue = (width?: sizeParam) => {
	if (!isFramed()) return;

	if (typeof width === 'undefined') {
		const { size: { width } } = getSizeInfo();
		return width;
	}

	return sendResize({ width });
};

/**
 * Get or set the height of the iframe
 */

export const height: ISetOrGetValue = (height?: sizeParam) => {
	if (!isFramed()) return false;

	if (typeof height === 'undefined') {
		const { size: { height } } = getSizeInfo();
		return height;
	}

	return sendResize({ height });
};

/**
 * Get the iframe’s position from the top of the document
 */

export const top = () => {
	if (!isFramed()) return false;
	const { document: { top } } = getSizeInfo();
	return top;
};

/**
 * Get the iframe’s position from the left of the document
 */

export const left = () => {
	if (!isFramed()) return false;
	const { document: { left } } = getSizeInfo();
	return left;
};

/**
 * Get the iframe’s position from the right of the document
 */

export const right = () => {
	if (!isFramed()) return false;
	const { document: { right } } = getSizeInfo();
	return right;
};

/**
 * Get the iframe’s position from the bottom of the document
 */

export const bottom = () => {
	if (!isFramed()) return false;
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
	top() {
		if (!isFramed()) return false;
		const { viewport: { top } } = getSizeInfo();
		return top;
	},
	/**
	 * Get the position from the left of the viewport
	 */
	left() {
		if (!isFramed()) return false;
		const { viewport: { left } } = getSizeInfo();
		return left;
	},
	/**
	 * Get the position from the right of the viewport
	 */
	right() {
		if (!isFramed()) return false;
		const { viewport: { right } } = getSizeInfo();
		return right;
	},
	/**
	 * Get the position from the bottom of the viewport
	 */
	bottom() {
		if (!isFramed()) return false;
		const { viewport: { bottom } } = getSizeInfo();
		return bottom;
	},
};

/**
 * Get all size info.
 */

export const all = (): ISizeInfo | false => {
	if (!isFramed()) return false;
	return getSizeInfo();
};
