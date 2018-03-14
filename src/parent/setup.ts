import {
	MessageType,
	IMessage,
	IScrollMessage,
	IResizeMessage,
	ISetSizeInfoMessage,
} from '../types';
import listener, { Listener } from '../utils/listener';
import sender from '../utils/sender';
import { viewportPosition, documentPosition, elementSize } from '../utils/dom';

interface IIFrameOptions {
	nav?: boolean;
}

class IFrame {
	el: HTMLIFrameElement;
	opts: IIFrameOptions;
	listener: Listener;
	send: (msg: IMessage) => void;

	constructor(el: HTMLIFrameElement, opts: IIFrameOptions = {}) {
		this.el = el;
		this.opts = opts;

		this.send = sender(this.el.contentWindow, '*');
		this.listener = listener(window);

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
			},
		};
		this.send(msg);
	};
}

function setup(frame: HTMLIFrameElement, opts: IIFrameOptions = {}) {
	return new IFrame(frame, opts);
}

export default setup;

/**
 * Helpers
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
