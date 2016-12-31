export function randomchoice(array) {
	return array[Math.floor(Math.random() * array.length)]
}

export function shuffle(array) {
	let indicies = [...array.keys()];
	for (let i of indicies) {
		let j = randomchoice(indicies)
		let arrayI, arrayJ;
		arrayI = array[i]
		arrayJ = array[j]
		array[i] = arrayJ
		array[j] = arrayI
	}
}
