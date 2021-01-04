export interface StringDistance {

	/**
	 * Compute and return a measure of distance.
	 * Must be &gt;= 0.
	 * @param s1
	 * @param s2
	 * @return
	 */
	distance(s1: string, s2: string): number;
}
