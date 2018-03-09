export enum MessageType {
	INIT = 'init',
	SCROLL_TO = 'scroll-to',
	OTHER = 'other',
}

export interface ISimpleMessage {
	type: MessageType;
}

export interface IScrollMessage extends ISimpleMessage {
	type: MessageType.SCROLL_TO;
	x: number;
	y: number;
	origin?: number;
}

export interface IOtherMessage extends ISimpleMessage {
	type: MessageType.OTHER;
	text: string;
}

export type IMessage = ISimpleMessage | IScrollMessage | IOtherMessage;

export interface IListener {
	type: MessageType;
	fn: (msg: IMessage) => void;
}
