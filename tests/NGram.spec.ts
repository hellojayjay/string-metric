import { NGram } from '../src/NGram';

describe('NGram', () => {
	let instance: NGram;

	beforeEach(() => {
		instance = new NGram();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('distance', () => {
		it('same strings distance is 0', () => {
			const s1 = 'SIJK';
			const s2 = 'SIJK';

			expect(instance.distance(s1, s2)).toBe(0);
		});

		it('"ABABABAB", "ABCABCABCABC", "POIULKJH"', () => {
			const s0 = 'ABABABAB';
			const s1 = 'ABCABCABCABC';
			const s2 = 'POIULKJH';

			expect(instance.distance(s0, s1) < instance.distance(s0, s2)).toBe(true);
		});
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
