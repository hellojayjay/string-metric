import { LongestCommonSubsequence } from './../src/LongestCommonSubsequence';

describe('LongestCommonSubsequence', () => {
	let instance: LongestCommonSubsequence;

	beforeEach(() => {
		instance = new LongestCommonSubsequence();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('distance', () => {
		it('"AGCAT", "GAC" distance is 4', () => {
			const s1 = 'AGCAT';
			const s2 = 'GAC';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(4);
		});

		it('"AGCAT", "AGCT" distance is 1', () => {
			const s1 = 'AGCAT';
			const s2 = 'AGCT';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1);
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
