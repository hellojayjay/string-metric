export function isNullOrUndefined(v: any) {
	return v === null || v === undefined;
}

export function createTwoDimensionalArray(d1: number, d2: number): any[][] {
	const array = Array(d1);

	for (let i = 0; i < array.length; i++) {
		array[i] = Array(d2);
	}

	return array;
}
