export class CharacterSubstitutionInterface {
	constructor(
		public cost: (c1: string, c2: string) => number,
	) { }
}
