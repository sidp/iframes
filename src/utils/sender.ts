import { IMessage } from '../types';

export const send = (to: Window, msg: IMessage, targetOrigin = '*') =>
	to.postMessage(msg, targetOrigin);

export default (to: Window, targetOrigin = '*') => (msg: IMessage) =>
	send(to, msg, targetOrigin);
