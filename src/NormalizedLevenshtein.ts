import { Levenshtein } from './Levenshtein';
import { NormalizedStringDistance } from './interfaces/NormalizedStringDistance';
import { NormalizedStringSimilarity } from './interfaces/NormalizedStringSimilarity';
import { isNullOrUndefined } from './utils/utils';

export class NormalizedLevenshtein implements NormalizedStringDistance, NormalizedStringSimilarity {

	private l = new Levenshtein();

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

		const mLen = Math.max(s1.length, s2.length);

		if (mLen === 0) {
			return 0;
		}

		return this.l.distance(s1, s2) / mLen;
	}

	similarity(s1: string, s2: string): number {
		return 1 - this.distance(s1, s2);
	}
}
