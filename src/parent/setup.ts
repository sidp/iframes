import { MessageType, IMessage, IScrollMessage } from '../types';
import listener, { Listener } from '../utils/listener';

interface IIFrameOptions {
	nav?: boolean;
}

class IFrame {
	el: HTMLIFrameElement;
	opts: IIFrameOptions;
	listener: Listener;

	constructor(el: HTMLIFrameElement, opts: IIFrameOptions = {}) {
		this.el = el;
		this.opts = opts;
		this.listener = listener(window);

		// Send a message to the iframe window saying this initialized
		console.log('initialized');

		// todo: correctly set target origin
		this.el.contentWindow.postMessage({ type: MessageType.INIT }, '*');

		this.listener.on(MessageType.SCROLL_TO, this.handleScrollTo);
	}

	handleScrollTo(msg: IScrollMessage) {
		const { x, y } = msg;
		window.scrollTo(x, y);
	}
}

function setup(frame: HTMLIFrameElement, opts: IIFrameOptions = {}) {
	return new IFrame(frame, opts);
}

export default setup;
