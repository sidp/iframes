export interface IPosition {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface ISize {
	width: number;
	height: number;
}

export interface IPointPosition {
	x: number;
	y: number;
}

export interface ISizeInfo {
	viewport: IPosition;
	document: IPosition;
	size: ISize;
	scroll: IPointPosition;
}

export type AllowedOrigin = string[] | string;

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
	sizeInfo: ISizeInfo;
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
