import { NormalizedLevenshtein } from '../src/NormalizedLevenshtein';

describe('NormalizedLevenshtein', () => {
	let instance: NormalizedLevenshtein;

	beforeEach(() => {
		instance = new NormalizedLevenshtein();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('strings are equal', () => {

		it('"string" "string"', () => {
			expect(instance.distance('string', 'string')).toBe(0);
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
