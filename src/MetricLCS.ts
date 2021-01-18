import { MetricStringDistance } from "./interfaces/MetricStringDistance";
import { NormalizedStringDistance } from "./interfaces/NormalizedStringDistance";
import { LongestCommonSubsequence } from "./LongestCommonSubsequence";
import { isNullOrUndefined } from "./utils/utils";

export class MetricLCS implements MetricStringDistance, NormalizedStringDistance {

	private lcs = new LongestCommonSubsequence();

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

		const m_len = Math.max(s1.length, s2.length);
		if (m_len == 0) {
			return 0;
		}

		return 1.0 - (1.0 * this.lcs.length(s1, s2)) / m_len;
	}
}
