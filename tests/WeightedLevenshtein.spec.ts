import { CharacterSubstitutionInterface } from './../src/CharacterSubstitutionInterface';
import { WeightedLevenshtein } from '../src/WeightedLevenshtein';
import { CharacterInsDelInterface } from '../src/CharacterInsDelInterface';

describe('WeightedLevenshtein', () => {
	let instance: WeightedLevenshtein;

	describe('CharacterSubstitutionInterface', () => {
		beforeEach(() => {
			const charsub = new CharacterSubstitutionInterface(
				(c1: string, c2: string) => (c1 === 't' && c2 === 'r') ? 0.5 : 1
			);

			instance = new WeightedLevenshtein(charsub);
		});

		it('created', () => {
			expect(instance).toBeTruthy();
		});

		describe('distance', () => {
			it('"String1" "String1" distance is 0', () => {
				expect(instance.distance('String1', 'String1')).toBe(0);
			});

			it('"String1" "Srring1" distance is 0.5', () => {
				expect(instance.distance('String1', 'Srring1')).toBe(0.5);
			});

			it('"String1" "Srring2" distance is 1.5', () => {
				expect(instance.distance('String1', 'Srring2')).toBe(1.5);
			});

			it('"Strng" "String" distance is 1', () => {
				expect(instance.distance('Strng', 'String')).toBe(1);
			});

			it('"String" "Strng" distance is 1', () => {
				expect(instance.distance('String', 'Strng')).toBe(1);
			});

			it('"String1" "Potato" distance is 1, with limit 4', () => {
				expect(instance.distance('String1', 'Potato', 4)).toBe(4);
			});
		});

		describe('strings are equal', () => {

			it('"string" "string"', () => {
				expect(instance.distance('string', 'string')).toBe(0);
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

	describe('CharacterSubstitutionInterface & CharacterInsDelInterface', () => {
		beforeEach(() => {
			const charsub = new CharacterSubstitutionInterface(
				(c1: string, c2: string) => (c1 === 't' && c2 === 'r') ? 0.5 : 1
			);
			const charchange = new CharacterInsDelInterface(
				(c: string) => c === 'i' ? 0.8 : 1,
				(c: string) => c === 'i' ? 0.5 : 1,
			)

			instance = new WeightedLevenshtein(charsub, charchange);
		});

		it('created', () => {
			expect(instance).toBeTruthy();
		});

		describe('distance', () => {
			it('"String1" "String1" distance is 0', () => {
				expect(instance.distance('String1', 'String1')).toBe(0);
			});

			it('"String1" "Srring1" distance is 0.5', () => {
				expect(instance.distance('String1', 'Srring1')).toBe(0.5);
			});

			it('"String1" "Srring2" distance is 1.5', () => {
				expect(instance.distance('String1', 'Srring2')).toBe(1.5);
			});

			it('"Strng" "String" distance is 0.5', () => {
				expect(instance.distance('Strng', 'String')).toBe(0.5);
			});

			it('"String" "Strng" distance is 0.8', () => {
				expect(instance.distance('String', 'Strng')).toBe(0.8);
			});

			it('"String1" "Potato" distance is 1, with limit 4', () => {
				expect(instance.distance('String1', 'Potato', 4)).toBe(4);
			});
		});

		describe('strings are equal', () => {

			it('"string" "string"', () => {
				expect(instance.distance('string', 'string')).toBe(0);
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
});
