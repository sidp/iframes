import setup from './parent/setup';
import * as parentWindow from './child/window';
import * as iframe from './child/iframe';

(<any>window).sidpIframe = { setup, parentWindow, iframe };
export { setup, parentWindow, iframe };
