
const display = document.getElementById("display");
const confirmation = document.getElementById("confirmation");
const input = document.getElementById("input");
const streak = document.getElementById("streak");

let tokens = [];

add_token = (code, result) => {
	tokens.push({code: code, result: result});
}

add_token(".-", "A")
add_token("-...", "B")
add_token("-.-.", "C")
add_token("-..", "D")
add_token(".", "E")
add_token("..-.", "F")
add_token("--.", "G")
add_token("....", "H")
add_token("..", "I")
add_token(".---", "J")
add_token("-.-", "K")
add_token(".-..", "L")
add_token("--", "M")
add_token("-.", "N")
add_token("---", "O")
add_token(".--.", "P")
add_token("--.-", "Q")
add_token(".-.", "R")
add_token("...", "S")
add_token("-", "T")
add_token("..-", "U")
add_token("...-", "V")
add_token(".--", "W")
add_token("-..-", "X")
add_token("-.--", "Y")
add_token("--..", "Z")

get_token = () => {
	return tokens[Math.floor(Math.random() * tokens.length)];
}

current_token = 0;
streak_value = 0;

document.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 13:
			guess();
			break;
	}
})

guess = () => {
	var i = input.value;
	if (i.toUpperCase() === current_token.result) {
		confirmation.innerHTML = "you got it right!";
		streak_value ++;
	} else {
		confirmation.innerHTML = "you fool";
		streak_value = 0;
	}
	update();
	input.value = "";
}

update = () => {
	current_token = get_token();
	streak.innerHTML = "streak: " + streak_value;
	display.innerHTML = current_token.code; 
}

update();








