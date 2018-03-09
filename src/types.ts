export enum MessageType {
	INIT = 'INIT',
	SCROLL_TO = 'SCROLL_TO',
	RESIZE = 'RESIZE',
	SET_SIZE_INFO = 'SET_SIZE_INFO',
}

export interface ISimpleMessage {
	type: MessageType;
}

export interface IScrollMessage {
	type: MessageType.SCROLL_TO;
	x: number;
	y: number;
}

export interface IResizeMessage {
	type: MessageType.RESIZE;
	width?: number | string;
	height?: number | string;
}

export interface ISetSizeInfoMessage {
	type: MessageType.SET_SIZE_INFO;
	rect: ClientRect | DOMRect;
}

export type IMessage =
	| ISimpleMessage
	| IScrollMessage
	| IResizeMessage
	| ISetSizeInfoMessage;

export interface IListener {
	type: MessageType;
	fn: (msg: IMessage) => void;
}
