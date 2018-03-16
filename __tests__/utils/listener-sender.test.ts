import listener from '../../src/utils/listener';
import sender from '../../src/utils/sender';
import { MessageType } from '../../src/types';

describe('sending messages', () => {
	it('send and receives messages', () => {
		const listen = listener(window);
		listen.on(MessageType.INIT, msg => {
			expect(msg.type).toBe(MessageType.INIT);
		});
		const send = sender(window);
		send({ type: MessageType.INIT });
	});
});
