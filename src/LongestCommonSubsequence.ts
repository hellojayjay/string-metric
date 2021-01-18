import { StringDistance } from "./interfaces/StringDistance";
import { createTwoDimensionalArray, fillTwoDimensionalArray, isNullOrUndefined } from "./utils/utils";

export class LongestCommonSubsequence implements StringDistance {

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

		return s1.length + s2.length - 2 * this.length(s1, s2);
	}

	length(s1: string, s2: string): number {
		if (isNullOrUndefined(s1)) {
			throw new Error('s1 must neither be null nor undefined');
		}

		if (isNullOrUndefined(s2)) {
			throw new Error('s2 must neither be null nor undefined');
		}

		const s1_length = s1.length;
		const s2_length = s2.length;
		const x = s1;
		const y = s2;

		const c = createTwoDimensionalArray(s1_length + 1, s2_length + 1);
		fillTwoDimensionalArray(c);

		for (let i = 1; i <= s1_length; i++) {
			for (let j = 1; j <= s2_length; j++) {
				if (x[i - 1] === y[j - 1]) {
					c[i][j] = c[i - 1][j - 1] + 1;
				} else {
					c[i][j] = Math.max(c[i][j - 1], c[i - 1][j]);
				}
			}
		}

		return c[s1_length][s2_length];
	}
}
