import $ from "jquery"
import ko from "knockout"
import wordGameTemplate from "wordgame.ko.html!text"
import WordGame from "wordgame.ko.js"
import wordGameNavTemplate from "wordgamenav.ko.html!text"
import {WordGameNav} from "wordgamenav.ko.js"
import wordGameNavbarTemplate from "wordgamenavbar.ko.html!text"
import page from 'page'

function WordGameApp() {
	this.page = ko.observable()
	this.ctx = ko.observable()
	this.setCtx = (ctx, next) => {
		this.ctx(ctx)
		next()
	}
	this.gotoNavigate = (ctx) => {
		console.log('nav')
		this.page('nav')
	}
	this.gotoPuzzle = (ctx) => {
		this.page('puzzle')
	}

	this.init = () => {
		page('*', this.setCtx)
		page('/', this.gotoNavigate);
		page('/puzzle/:id', this.gotoPuzzle);
		page.start()
	}	
}

let init = () => {
	ko.components.register('wordgame', {
		viewModel: WordGame,
		template: wordGameTemplate,
	})
	ko.components.register('wordgamenav', {
		viewModel: WordGameNav,
		template: wordGameNavTemplate,
	})
	ko.components.register('navbar', {
		template: wordGameNavbarTemplate
	})
	let wordGameApp = new WordGameApp()
	wordGameApp.init()
	ko.applyBindings(wordGameApp, $('body').get(0));
}

init()
