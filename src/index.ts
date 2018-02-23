import setup from './parent/setup';
import parentWindow from './child/window';
import iframe from './child/iframe';

const iframeApi = {
	setup,
	parentWindow,
	iframe,
};

(<any>window).sidpIframe = iframeApi;
export default iframeApi;
