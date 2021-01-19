import { NormalizedStringDistance } from "./interfaces/NormalizedStringDistance";
import { isNullOrUndefined } from "./utils/utils";

export class NGram implements NormalizedStringDistance {

	private readonly DEFAULT_N = 2;
	private n: number;

	constructor(n?: number) {
		this.n = isNullOrUndefined(n) ? this.DEFAULT_N : <number>n;
	}

	distance(s0: string, s1: string) {
		if (isNullOrUndefined(s0)) {
			throw new Error('s0 must neither be null nor undefined');
		}

		if (isNullOrUndefined(s1)) {
			throw new Error('s1 must neither be null nor undefined');
		}

		if (s0 === s1) {
			return 0;
		}

		const special = '\n';
		const sl = s0.length;
		const tl = s1.length;

		if (sl == 0 || tl == 0) {
			return 1;
		}

		let cost = 0;
		if (sl < this.n || tl < this.n) {
			for (let i = 0, ni = Math.min(sl, tl); i < ni; i++) {
				if (s0.charAt(i) == s1.charAt(i)) {
					cost++;
				}
			}
			return cost / Math.max(sl, tl);
		}

		const sa: string[] = Array(sl + this.n - 1);
		let p: number[]; //'previous' cost array, horizontally
		let d: number[]; // cost array, horizontally
		let d2: number[]; //placeholder to assist in swapping p and d

		//construct sa with prefix
		for (let i = 0; i < sa.length; i++) {
			if (i < this.n - 1) {
				sa[i] = special; //add prefix
			} else {
				sa[i] = s0.charAt(i - this.n + 1);
			}
		}
		p = Array(sl + 1);
		d = Array(sl + 1);

		// indexes into strings s and t
		let i; // iterates through source
		let j; // iterates through target

		let t_j: string[] = Array(this.n); // jth n-gram of t

		for (i = 0; i <= sl; i++) {
			p[i] = i;
		}

		for (j = 1; j <= tl; j++) {
			//construct t_j n-gram
			if (j < this.n) {
				for (let ti = 0; ti < this.n - j; ti++) {
					t_j[ti] = special; //add prefix
				}
				for (let ti = this.n - j; ti < this.n; ti++) {
					t_j[ti] = s1.charAt(ti - (this.n - j));
				}
			} else {
				t_j = s1.substring(j - this.n, j).split('');
			}
			d[0] = j;
			for (i = 1; i <= sl; i++) {
				cost = 0;
				let tn = this.n;
				//compare sa to t_j
				for (let ni = 0; ni < this.n; ni++) {
					if (sa[i - 1 + ni] != t_j[ni]) {
						cost++;
					} else if (sa[i - 1 + ni] == special) {
						//discount matches on prefix
						tn--;
					}
				}
				let ec = cost / tn;
				// minimum of cell to the left+1, to the top+1,
				// diagonally left and up +cost
				d[i] = Math.min(
					Math.min(d[i - 1] + 1, p[i] + 1), p[i - 1] + ec);
			}
			// copy current distance counts to 'previous row' distance counts
			d2 = p;
			p = d;
			d = d2;
		}

		// our last action in the above loop was to switch d and p, so p now
		// actually has the most recent cost counts
		return p[sl] / Math.max(tl, sl);
	}
}
