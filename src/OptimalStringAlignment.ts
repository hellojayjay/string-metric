import { StringDistance } from "./interfaces/StringDistance";
import { createTwoDimensionalArray, isNullOrUndefined } from "./utils/utils";

export class OptimalStringAlignment implements StringDistance {

	distance(s1: string, s2: string) {
		if (isNullOrUndefined(s1)) {
			throw new Error('s1 must neither be null nor undefined');
		}

		if (isNullOrUndefined(s2)) {
			throw new Error('s2 must neither be null nor undefined');
		}

		if (s1 === s2) {
			return 0;
		}

		const n = s1.length;
		const m = s2.length;

		if (n == 0) {
			return m;
		}

		if (m == 0) {
			return n;
		}

		const d = createTwoDimensionalArray(n + 2, m + 2);

		for (let i = 0; i <= n; i++) {
			d[i][0] = i;
		}
		for (let j = 0; j <= m; j++) {
			d[0][j] = j;
		}

		let cost;

		for (let i = 1; i <= n; i++) {
			for (let j = 1; j <= m; j++) {

				cost = 1;
				if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
					cost = 0;
				}

				d[i][j] = this.min(
					d[i - 1][j - 1] + cost, // substitution
					d[i][j - 1] + 1, // insertion
					d[i - 1][j] + 1 // deletion
				);

				//transposition check
				if (i > 1 && j > 1
					&& s1.charAt(i - 1) === s2.charAt(j - 2)
					&& s1.charAt(i - 2) === s2.charAt(j - 1)) {
					d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
				}
			}
		}

		return d[n][m];
	}

	private min(a: number, b: number, c: number): number {
		return Math.min(a, Math.min(b, c));
	}
}
