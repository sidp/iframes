import setup from './parent/setup';
import * as parentWindow from './child/window';
import * as iframe from './child/iframe';
import { isFramed } from './child/setup';

(<any>window).sidpIframe = { setup, parentWindow, iframe, isFramed };
export { setup, parentWindow, iframe, isFramed };
