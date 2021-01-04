export interface StringSimilarity {
	/**
	 * Compute and return a measure of similarity between 2 strings.
	 * @param s1
	 * @param s2
	 * @return similarity (0 means both strings are completely different)
	 */
	similarity(s1: string, s2: string): number;
}
