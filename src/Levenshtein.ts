import { MetricStringDistance } from './interfaces/MetricStringDistance';
import { isNullOrUndefined } from './utils/utils';

export class Levenshtein implements MetricStringDistance {

	distance(s1: string, s2: string, limit: number = Number.MAX_VALUE): number {

		if (isNullOrUndefined(s1)) {
			throw new Error('s1 must neither be null nor undefined');
		}

		if (isNullOrUndefined(s2)) {
			throw new Error('s2 must neither be null nor undefined');
		}

		if (s1 === s2) {
			return 0;
		}

		if (s1.length === 0) {
			return s2.length;
		}

		if (s2.length === 0) {
			return s1.length;
		}

		let v0: number[] = Array(s2.length + 1);
		let v1: number[] = Array(s2.length + 1);
		let vtemp: number[] = [];

		for (let i = 0; i < v0.length; i++) {
			v0[i] = i;
		}

		for (let i = 0; i < s1.length; i++) {
			v1[0] = i + 1;

			let minv1 = v1[0];

			for (let j = 0; j < s2.length; j++) {
				let cost = 1;
				if (s1[i] === s2[j]) {
					cost = 0;
				}
				v1[j + 1] = Math.min(
					v1[j] + 1,
					Math.min(
						v0[j + 1] + 1,
						v0[j] + cost
					)
				);

				minv1 = Math.min(minv1, v1[j + 1]);
			}

			if (minv1 >= limit) {
				return limit;
			}

			vtemp = v0;
			v0 = v1;
			v1 = vtemp;
		}

		return v0[s2.length];
	}
}
