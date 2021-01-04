import { CharacterInsDelInterface } from './CharacterInsDelInterface';
import { CharacterSubstitutionInterface } from './CharacterSubstitutionInterface';
import { StringDistance } from './interfaces/StringDistance';
import { isNullOrUndefined } from './utils/utils';

export class WeightedLevenshtein implements StringDistance {

	constructor(
		private charsub: CharacterSubstitutionInterface,
		private charchange?: CharacterInsDelInterface
	) { }

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

		v0[0] = 0;
		for (let i = 1; i < v0.length; i++) {
			v0[i] = v0[i - 1] + this.insertionCost(s2[i - 1]);
		}

		for (let i = 0; i < s1.length; i++) {
			const s1i = s1[i];
			const deletionCost = this.deletionCost(s1i);

			v1[0] = v0[0] + deletionCost;

			let minv1 = v1[0];

			for (let j = 0; j < s2.length; j++) {
				const s2j = s2[j];
				let cost = 0;
				if (s1i !== s2j) {
					cost = this.charsub.cost(s1i, s2j);
				}

				const insertionCost = this.insertionCost(s2j);
				v1[j + 1] = Math.min(
					v1[j] + insertionCost,
					Math.min(
						v0[j + 1] + deletionCost,
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

	private insertionCost(c: string): number {
		if (this.charchange) {
			return this.charchange.insertionCost(c);
		} else {
			return 1;
		}
	}

	private deletionCost(c: string): number {
		if (this.charchange) {
			return this.charchange.deletionCost(c);
		} else {
			return 1;
		}
	}
}
