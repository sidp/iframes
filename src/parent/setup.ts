import { MessageType, IMessage, IScrollMessage } from '../types';
import listener, { Listener } from '../utils/listener';
import sender from '../utils/sender';

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
		this.listener = listener(window);
		this.send = sender(this.el.contentWindow, '*');

		// Send a message to the iframe window saying this initialized
		console.log('initialized');

		// todo: correctly set target origin
		this.send({ type: MessageType.INIT });

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
