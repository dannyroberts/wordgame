import puzzleNames from 'puzzleNames.json!text'

export class WordGameNav {
	constructor() {
		this.puzzleNames = JSON.parse(puzzleNames)
	}
}
