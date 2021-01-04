import { NormalizedStringDistance } from './interfaces/NormalizedStringDistance';
import { NormalizedStringSimilarity } from './interfaces/NormalizedStringSimilarity';
import { isNullOrUndefined } from './utils/utils';

export class JaroWinkler implements NormalizedStringSimilarity, NormalizedStringDistance {

	private readonly DEFAULT_THRESHOLD: number = 0.7;
	private readonly THREE: number = 3;
	private readonly JW_COEF: number = 0.1;
	private readonly threshold: number;

	constructor(threshold?: number) {
		this.threshold = threshold || this.DEFAULT_THRESHOLD;
	}

	similarity(s1: string, s2: string): number {

		if (isNullOrUndefined(s1)) {
			throw new Error('s1 must neither be null nor undefined');
		}

		if (isNullOrUndefined(s2)) {
			throw new Error('s2 must neither be null nor undefined');
		}

		if (s1 === s2) {
			return 1;
		}

		const mtp = this.matches(s1, s2);
		let m = mtp[0];
		if (m === 0) {
			return 0;
		}
		const j = ((m / s1.length + m / s2.length + (m - mtp[1]) / m)) / this.THREE;
		let jw = j;

		if (j > this.threshold) {
			jw = j + Math.min(this.JW_COEF, 1.0 / mtp[this.THREE]) * mtp[2] * (1 - j);
		}

		return jw;
	}

	distance(s1: string, s2: string): number {
		return 1 - this.similarity(s1, s2);
	}

	private matches(s1: string, s2: string): number[] {
		let max: string;
		let min: string;
		if (s1.length > s2.length) {
			max = s1;
			min = s2;
		} else {
			max = s2;
			min = s1;
		}

		const range = Math.max(Math.floor(max.length / 2) - 1, 0);
		const matchIndexes: number[] = Array(min.length);
		matchIndexes.fill(-1);
		const matchFlags: boolean[] = Array(max.length);
		let matches = 0;
		for (let mi = 0; mi < min.length; mi++) {
			const c1 = min[mi];
			for (
				let xi = Math.max(mi - range, 0), xn = Math.min(mi + range + 1, max.length);
				xi < xn;
				xi++
			) {
				if (!matchFlags[xi] && c1 === max[xi]) {
					matchIndexes[mi] = xi;
					matchFlags[xi] = true;
					matches++;
					break;
				}
			}
		}

		const ms1: string[] = Array(matches);
		const ms2: string[] = Array(matches);
		for (let i = 0, si = 0; i < min.length; i++) {
			if (matchIndexes[i] !== -1) {
				ms1[si] = min[i];
				si++;
			}
		}
		for (let i = 0, si = 0; i < max.length; i++) {
			if (matchFlags[i]) {
				ms2[si] = max[i];
				si++;
			}
		}

		let transpositions = 0;
		for (let mi = 0; mi < ms1.length; mi++) {
			if (ms1[mi] !== ms2[mi]) {
				transpositions++;
			}
		}
		let prefix = 0;
		for (let mi = 0; mi < min.length; mi++) {
			if (s1[mi] === s2[mi]) {
				prefix++;
			} else {
				break;
			}
		}

		return [matches, Math.floor(transpositions / 2), prefix, max.length];
	}
}
