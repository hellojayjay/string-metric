import { Damerau } from '../src/Damerau';

describe('Damerau', () => {
	let instance: Damerau;

	beforeEach(() => {
		instance = new Damerau();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('distance', () => {

		it('"ABCDEF" "ABDCEF", distance is 1', () => {
			expect(instance.distance('ABCDEF', 'ABDCEF')).toBe(1);
		});

		it('"ABCDEF" "BACDFE", distance is 2', () => {
			expect(instance.distance('ABCDEF', 'BACDFE')).toBe(2);
		});

		it('"ABCDEF" "ABCDE", distance is 1', () => {
			expect(instance.distance('ABCDEF', 'ABCDE')).toBe(1);
		});
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
