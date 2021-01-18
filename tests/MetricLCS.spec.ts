import { MetricLCS } from '../src/MetricLCS';

describe('MetricLCS', () => {
	let instance: MetricLCS;

	beforeEach(() => {
		instance = new MetricLCS();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('exceptions', () => {
		it('s1 is null', () => {
			try {
				instance.distance(null as any, 'kitten');
			} catch (error) {
				expect(error.message).toBe('s1 must neither be null nor undefined');
			}
		});

		it('s2 is null', () => {
			try {
				instance.distance('kitten', null as any);
			} catch (error) {
				expect(error.message).toBe('s2 must neither be null nor undefined');
			}
		});
	});
});
