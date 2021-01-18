import { OptimalStringAlignment } from './../src/OptimalStringAlignment';

describe('OptimalStringAlignment', () => {
	let instance: OptimalStringAlignment;

	beforeEach(() => {
		instance = new OptimalStringAlignment();
	});

	it('created', () => {
		expect(instance).toBeTruthy();
	});

	describe('distance', () => {
		it('same strings distance is 0', () => {
			const s1 = 'ABDCEF';
			const s2 = 'ABDCEF';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(0);
		});

		it('"ABDCFE", "ABDCEF" distance is 1', () => {
			const s1 = 'ABDCFE';
			const s2 = 'ABDCEF';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1);
		});

		it('"BBDCEF", "ABDCEF" distance is 1', () => {
			const s1 = 'BBDCEF';
			const s2 = 'ABDCEF';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1);
		});

		it('"BDCEF", "ABDCEF" distance is 1', () => {
			const s1 = 'BDCEF';
			const s2 = 'ABDCEF';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1);
		});

		it('"ABDCEF", "ADCEF" distance is 1', () => {
			const s1 = 'ABDCEF';
			const s2 = 'ADCEF';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(1);
		});

		it('"CA", "ABC" distance is 3', () => {
			const s1 = 'CA';
			const s2 = 'ABC';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(3);
		});

		it('"BAC", "CAB" distance is 2', () => {
			const s1 = 'BAC';
			const s2 = 'CAB';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(2);
		});

		it('"abcde", "awxyz" distance is 4', () => {
			const s1 = 'abcde';
			const s2 = 'awxyz';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(4);
		});

		it('"abcde", "vwxyz" distance is 5', () => {
			const s1 = 'abcde';
			const s2 = 'vwxyz';

			const distance = instance.distance(s1, s2);

			expect(distance).toBe(5);
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
