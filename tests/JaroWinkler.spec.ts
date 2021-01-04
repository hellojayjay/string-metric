import { JaroWinkler } from './../src/JaroWinkler';

describe('JaroWinkler', () => {
	let instance: JaroWinkler;

	beforeEach(() => {
		instance = new JaroWinkler();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('similarity', () => {

		it('"My string" "My string", similarity is 1', () => {
			const s1 = 'My string';
			const s2 = 'My string';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBe(1);
		});

		it('"My string" "My tsring", similarity close to 0.974074', () => {
			const s1 = 'My string';
			const s2 = 'My tsring';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBeCloseTo(0.974074);
		});

		it('"My string" "My ntrisg", similarity close to 0.896296', () => {
			const s1 = 'My string';
			const s2 = 'My ntrisg';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBeCloseTo(0.896296);
		});

		it('"henka" "henkan", similarity close to 0.972222', () => {
			const s1 = 'henkan';
			const s2 = 'henka';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBeCloseTo(0.972222);
		});

		it('"jones" "johnson", similarity close to 0.832380', () => {
			const s1 = 'jones';
			const s2 = 'johnson';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBeCloseTo(0.832380);
		});

		it('"necessary" "nessecary", similarity close to 0.94074', () => {
			const s1 = 'necessary';
			const s2 = 'nessecary';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBeCloseTo(0.94074);
		});

		it('"abc" "xyz", similarity is 0', () => {
			const s1 = 'abc';
			const s2 = 'xyz';

			const similarity = instance.similarity(s1, s2);

			expect(similarity).toBe(0);
		});
	});

	describe('distance', () => {
		it('same strings distance is 0', () => {
			const s1 = 'My string';
			const s2 = 'My string';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(0);
		});

		it('totally different strings distance is 1', () => {
			const s1 = 'abc';
			const s2 = 'xyz';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1);
		});

		it('partial different strings distance is 1-similarity', () => {
			const s1 = 'abc';
			const s2 = 'abd';

			const similarity = instance.similarity(s1, s2);
			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1 - similarity);
		});
	});

	describe('exceptions', () => {
		it('s1 is null', () => {
			try {
				instance.similarity(null as any, 'kitten');
			} catch (error) {
				expect(error.message).toBe('s1 must neither be null nor undefined');
			}
		});

		it('s2 is null', () => {
			try {
				instance.similarity('kitten', null as any);
			} catch (error) {
				expect(error.message).toBe('s2 must neither be null nor undefined');
			}
		});
	});
});
