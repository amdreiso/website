
const keywords = ["var", "delete", "call"]
const keyword_color = "#ffff55"

let elements = document.querySelectorAll("code")
for (e of elements) {
	const res = highlight(e.innerHTML)
	e.innerHTML = res
}

function highlight(text) {
	let i = 0
	let words = []
	let word = ""

	text = text.replaceAll(";", " ")

	while (i < text.length) {
		const ch = text.charAt(i)

		if (ch == "\n") {
			words.push("\n")
			i++
			continue
		}

		if (ch == " ") {
			words.push(word)
			word = ""
			i++
			continue
		}

		word += ch
		i++
	}

	console.log(words)

	for (word of words) {
		if (keywords.indexOf(word) != -1) {
			let newWord = "<keyword>"+word+"</keyword>"
			words[words.indexOf(word)] = newWord

		}

		let num = parseInt(word)
		if (!Number.isNaN(num)) {
			let newWord = "<number>"+word+"</number>"
			words[words.indexOf(word)] = newWord

		}

		if (word == "//") {
			let og = word
			let str = word + " "
			let index = words.indexOf(word)
			let amt = 0
			index ++

			while (word != "\n") {
				word = words[index]
				str += word + " "
				amt ++
				index ++
			}

			for (let i = 0; i < amt; i++) {
			}

			let newWord = "<comment>"+str+"</comment>"
			words[words.indexOf(og)] = newWord
		}
	}

	text = words.join(" ")
	return text
}

