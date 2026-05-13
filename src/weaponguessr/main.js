
class Prompt {
	constructor(name, image) {
		this.name = name;
		this.image = image;
	}
}

let db = [
	new Prompt("gatling gun", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Fort_Laramie_National_Historic_Site_Gatling_gun_16-9-2014_15-26-03.jpg/250px-Fort_Laramie_National_Historic_Site_Gatling_gun_16-9-2014_15-26-03.jpg")
];

const getPrompt = () => {
	const i = Math.floor(Math.random() * db.length);
	display_image.src = db[i].image;
}

const guess = () => {
	const i = game_input.value;

	game_input.value = "";
}

const l_keyboard = (key) => {
	if (key.code == "Enter") {
		guess();
	}
}

document.addEventListener("keydown", l_keyboard);


getPrompt();


