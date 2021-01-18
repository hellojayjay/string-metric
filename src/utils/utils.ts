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

export function fillTwoDimensionalArray(arr: any[][], value: any = 0): void {
	for (const row of arr) {
		for (let i = 0; i < row.length; i++) {
			row[i] = value;
		}
	}
}
