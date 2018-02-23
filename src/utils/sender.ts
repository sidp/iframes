import { IMessage } from '../types';

export const send = (to: Window, msg: IMessage, targetOrigin = '*') =>
	to.postMessage(msg, targetOrigin);

const sender = (to: Window, targetOrigin = '*') => msg =>
	send(to, msg, targetOrigin);

export default sender;
