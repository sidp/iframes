export enum MessageType {
	INIT = 'init',
	SCROLL_TO = 'scroll-to',
}

export interface IMessage {
	type: MessageType;
}

export interface IScrollMessage extends IMessage {
	x: number;
	y: number;
}
