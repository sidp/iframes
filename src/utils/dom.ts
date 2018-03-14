import { ISize, IPosition } from '../types';

export function elementSize(el: HTMLElement): ISize {
	const style = getComputedStyle(el);

	let height = el.offsetHeight;
	height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);

	let width = el.offsetWidth;
	width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);

	return { width, height };
}

export const viewportPosition = (el: HTMLElement): IPosition => {
	const rect = el.getBoundingClientRect();
	return {
		top: rect.top,
		left: rect.left,
		right: window.innerWidth - rect.left - rect.width,
		bottom: window.innerHeight - rect.top - rect.height,
	};
};

export const documentPosition = (el: HTMLElement): IPosition => {
	const rect = el.getBoundingClientRect();

	const html = document.documentElement;
	const body = document.body;

	const scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop;
	const scrollLeft = window.pageXOffset || html.scrollLeft || body.scrollLeft;

	const clientTop = html.clientTop || body.clientTop || 0;
	const clientLeft = html.clientLeft || body.clientLeft || 0;

	const documentSize = elementSize(html);

	const top = rect.top + scrollTop - clientTop;
	const left = rect.left + scrollLeft - clientLeft;
	const right = documentSize.width - left - rect.width;
	const bottom = documentSize.height - top - rect.height;

	return {
		top,
		left,
		right,
		bottom,
	};
};
