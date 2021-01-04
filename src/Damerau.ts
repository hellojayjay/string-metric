import { MetricStringDistance } from './interfaces/MetricStringDistance';
import { createTwoDimensionalArray, isNullOrUndefined } from './utils/utils';

export class Damerau implements MetricStringDistance {

	distance(s1: string, s2: string): number {
		if (isNullOrUndefined(s1)) {
			throw new Error('s1 must neither be null nor undefined');
		}

		if (isNullOrUndefined(s2)) {
			throw new Error('s2 must neither be null nor undefined');
		}

		if (s1 === s2) {
			return 0;
		}

		const inf = s1.length + s2.length;

		const da = new Map<string, number>();

		for (let d = 0; d < s1.length; d++) {
			da.set(s1[d], 0);
		}

		for (let d = 0; d < s2.length; d++) {
			da.set(s2[d], 0);
		}

		const h: number[][] = createTwoDimensionalArray(s1.length + 2, s2.length + 2);

		for (let i = 0; i <= s1.length; i++) {
			h[i + 1][0] = inf;
			h[i + 1][1] = i;
		}

		for (let j = 0; j <= s2.length; j++) {
			h[0][j + 1] = inf;
			h[1][j + 1] = j;
		}

		for (let i = 1; i <= s1.length; i++) {
			let db = 0;

			for (let j = 1; j <= s2.length; j++) {
				const i1 = da.get(s2[j - 1])!;
				const j1 = db;

				let cost = 1;
				if (s1[i - 1] === s2[j - 1]) {
					cost = 0;
					db = j;
				}

				h[i + 1][j + 1] = this.min(
					h[i][j] + cost,
					h[i + 1][j] + 1,
					h[i][j + 1] + 1,
					h[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1)
				)
			}

			da.set(s1[i - 1], i);
		}

		return h[s1.length + 1][s2.length + 1];
	}

	private min(a: number, b: number, c: number, d: number): number {
		return this.minWithNaN(a, this.minWithNaN(b, this.minWithNaN(c, d)));
	}

	private minWithNaN(a: number, b: number) {
		if (isNaN(a) && isNaN(b)) {
			return 0;
		}
		if (isNaN(a)) {
			return b;
		}
		if (isNaN(b)) {
			return a;
		}
		return Math.min(a, b);
	}
}
