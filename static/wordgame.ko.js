import {randomchoice, shuffle} from "random"
import _ from "lodash"

export default function (params) {
	let self = this;
	self.puzzleName = params.puzzleName;
	self.words = ko.observableArray()
	self.allChunks = ko.observableArray()
	self.staged = ko.observableArray()
	self.used = ko.observableArray()
	
	self.stage = (chunk) => {
		self.staged.push(chunk)
	}
	self.unstage = (chunk) => {
		self.staged.remove(chunk)
	}
	self.submitStaged = () => {
		let wordText = _.map(self.staged(), 'text').join('')
		for (let word of self.words()) {
			if (word.word === wordText) {
				word.guessed(true)
				self.used.push.apply(self.used, self.staged())
				break
			}
		}
		self.staged([])
	}
	self.gameOver = ko.computed(() => {
		return _.every(self.words(), (word) => word.guessed())
	})
	$.ajax({
		url: `/static/puzzles/${self.puzzleName()}.json`,
	}).done((data) => {
		let allChunks = []
		for (let word of data) {
			self.words.push(new Word(word))
		}
		for (let word of self.words()) {
			for (let chunkText of word.chunks) {
				let chunk = {
					text: chunkText,
				}
				chunk.isVisible = ko.computed(() => {
					return (!self.staged().includes(chunk) && 
						!self.used().includes(chunk))
				})
				allChunks.push(chunk)
			}
		}
		shuffle(allChunks)
		self.allChunks(allChunks)
	})
}


function Word(o) {
	let self = this;
	self.word = o.word
	self.clue = o.clue
	self.guessed = ko.observable(false)
	self.chunks = (word) => {
		let length = word.length;
		let chunkSizes = [];
		while (length) {
			let chunkSize;
			if (length === 2 || length === 4) {
				chunkSize = 2;
			} else if (length === 3) {
				chunkSize = 3;
			} else {
				chunkSize = randomchoice([2, 3])				
			}
			chunkSizes.push(chunkSize);
			length -= chunkSize;
		}
		shuffle(chunkSizes);
		let chunks = [];
		let bookmark = 0;
		for (let chunkSize of chunkSizes) {
			chunks.push(word.slice(bookmark, bookmark + chunkSize))
			bookmark += chunkSize
		}
		return chunks;
	}(self.word)
}