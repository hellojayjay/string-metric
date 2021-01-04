export class CharacterInsDelInterface {
	constructor(
		public deletionCost: (c: string) => number,
		public insertionCost: (c: string) => number,
	) { }
}
