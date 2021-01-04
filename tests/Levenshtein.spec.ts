import { Levenshtein } from '../src/Levenshtein';

describe('Levenshtein', () => {
	let instance: Levenshtein;

	beforeEach(() => {
		instance = new Levenshtein();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('distance', () => {

		it('"My string" "My string", distance is 0', () => {
			expect(instance.distance('My string', 'My string')).toBe(0);
		});

		it('"My string" "My tring", distance is 1', () => {
			expect(instance.distance('My string', 'My tring')).toBe(1);
		});

		it('"My string" "M string2", distance is 2', () => {
			expect(instance.distance('My string', 'M string2')).toBe(2);
		});

		it('"My string" "M string2", distance is 2, with limit 4', () => {
			expect(instance.distance('My string', 'M string2', 4)).toBe(2);
		});

		it('"My string" "M string2", distance is 1, with limit 1', () => {
			expect(instance.distance('My string', 'M string2', 1)).toBe(1);
		});

		it('"kitten" "sitting", distance is 3', () => {
			expect(instance.distance('kitten', 'sitting')).toBe(3);
		});
	});

	describe('any string has length 0', () => {

		it('s1.length = 0', () => {
			expect(instance.distance('', 'kitten')).toBe(6);
		});

		it('s2.length = 0', () => {
			expect(instance.distance('kitten', '')).toBe(6);
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
