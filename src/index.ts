import setup from './parent/setup';
import * as parentWindow from './child/window';
import * as iframe from './child/iframe';

const iframeApi = {
	setup,
	parentWindow,
	iframe,
};

(<any>window).sidpIframe = iframeApi;
export default iframeApi;
