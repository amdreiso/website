
function readSingleFile(e) {
	var file = e.target.files[0]
	if (!file) return
	var reader = new FileReader()
	reader.onload = function(e) {
	  	var contents = e.target.result
	  	displayContents(contents)
	}
	reader.readAsText(file)
}

function displayContents(contents) {
	console.log(contents)
}

input_file_handler.addEventListener('change', readSingleFile, false)

nav_open.onclick = () => {
	input_file_handler.click()
}

// APP
const DIFFICULTY_EASY 	= 0
const DIFFICULTY_MEDIUM = 1
const DIFFICULTY_HARD 	= 2

class Token {
	constructor(word1, word2) {
		this.word1 = word1
		this.word2 = word2
		this.difficulty = DIFFICULTY_EASY
	}
}

let db = [
	new Token("Eisenfaust", "Iron Fist"),
	new Token("Guten morgen", "good morning"),
]
let name = "deutsch"
let currentToken = undefined
let score = 0

const update = () => {
	language_name.innerHTML = name
	score_count.innerHTML = "score: " + score
}

const get = () => {
	const index = Math.floor(Math.random() * db.length)
	if (currentToken === db[index]) {
		get()
		return;
	}
	currentToken = db[index]
	token_display.innerHTML = currentToken.word1 + ": ???"
}

const reveal = () => {
	if (currentToken == undefined) return
	token_display.innerHTML = currentToken.word1 + ": " + currentToken.word2
}

const add = () => {
	const word1 = panel_input_word1.value
	const word2 = panel_input_word2.value
	panel_input_word1.value = ""
	panel_input_word2.value = ""
	db.push(new Token(word1, word2))
	toggleAddPanel()
}

const guess = () => {
	if (currentToken.word2.toLowerCase() == guess_input.value.toLowerCase()) {
		score ++
	} else {
		score = 0
	}
	guess_input.value = ""
	get()
	update()
}

const toggleAddPanel = () => {
	add_panel.classList.toggle("hidden")
}

button_reveal.onclick = reveal
button_get.onclick = get
button_add.onclick = toggleAddPanel 
panel_add_cancel.onclick = toggleAddPanel
panel_add_add.onclick = add 

get()
update()

document.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 13:
			guess()
			break;
		case 27:
			if (!add_panel.classList.contains("hidden")) {
				toggleAddPanel()
			}
			break;
	}
});


