import {
	MessageType,
	IMessage,
	IScrollMessage,
	IResizeMessage,
	ISetSizeInfoMessage,
	AllowedOrigin,
} from '../types';
import listener, { Listener } from '../utils/listener';
import sender from '../utils/sender';
import { viewportPosition, documentPosition, elementSize } from '../utils/dom';

export class IFrame {
	el: HTMLIFrameElement;
	listener: Listener;
	send: (msg: IMessage) => void;

	constructor(el: HTMLIFrameElement, allowedOrigin: AllowedOrigin) {
		this.el = el;

		this.send = sender(this.el.contentWindow, '*');
		this.listener = listener(window, allowedOrigin);

		this.listener.on(MessageType.INIT, this.initialize);
	}

	initialize = () => {
		this.listener.on(MessageType.SCROLL_TO, this.handleScrollTo);
		this.listener.on(MessageType.RESIZE, this.handleResize);

		window.addEventListener('resize', this.handleWindowChange);
		window.addEventListener('scroll', this.handleWindowChange);
		this.handleWindowChange();
	};

	handleScrollTo(msg: IScrollMessage) {
		const { x, y } = msg;
		window.scrollTo(x, y);
	}

	handleResize = (msg: IResizeMessage) => {
		let { width, height } = msg;
		width = prepareUnit(width);
		height = prepareUnit(height);

		if (width) {
			this.el.style.width = width;
		}

		if (height) {
			this.el.style.height = height;
		}

		this.handleWindowChange();
	};

	handleWindowChange = () => {
		const msg: ISetSizeInfoMessage = {
			type: MessageType.SET_SIZE_INFO,
			sizeInfo: {
				viewport: viewportPosition(this.el),
				document: documentPosition(this.el),
				size: elementSize(this.el),
				scroll: {
					x: window.scrollX,
					y: window.scrollY,
				},
			},
		};
		this.send(msg);
	};
}

/**
 * Set up the iframe
 */

function setup(frame: HTMLIFrameElement, allowedOrigin: AllowedOrigin) {
	return new IFrame(frame, allowedOrigin);
}

export default setup;

/**
 * Helper functions
 */

const prepareUnit = (no?: string | number): string => {
	if (typeof no === 'undefined') {
		return undefined;
	}

	switch (typeof no) {
		case 'string':
			return String(no);
		case 'number':
			return `${no}px`;
		default:
			throw new Error(
				`Unexpected unit type. Accepted: string, number. Received: ${typeof no}.`
			);
	}
};
