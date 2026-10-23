
const DIFFICULTY_EASY 	= 0;
const DIFFICULTY_MEDIUM = 1;
const DIFFICULTY_HARD 	= 2;

class Prompt {
	constructor(name, image) {
		this.name = name;
		this.image = image;
		this.difficulty = DIFFICULTY_EASY;
	}
}

const resolveName = (value, name) => {
	if (Array.isArray(value)) {
		for (val of value) {
			if (name.toLowerCase() == val.toLowerCase()) {
				return true;
			}
		}
		return false;
	}

	return (value.toLowerCase() == name.toLowerCase());
}

//new Prompt("gatling gun", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Fort_Laramie_National_Historic_Site_Gatling_gun_16-9-2014_15-26-03.jpg/250px-Fort_Laramie_National_Historic_Site_Gatling_gun_16-9-2014_15-26-03.jpg")

let db = {
	aircraft: [],
	artillery: [],
	infantry: [],
};

db.aircraft.push(new Prompt("Fokker", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Zijaanzicht_van_de_Fokker_V.8_vijfdekker_%282161_026102%29.jpg/960px-Zijaanzicht_van_de_Fokker_V.8_vijfdekker_%282161_026102%29.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"));

db.artillery.push(new Prompt(["ZiS-2", "ZiS 2"], "https://upload.wikimedia.org/wikipedia/commons/3/3c/Zis2_nn.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original"));

db.infantry.push(new Prompt(["AK-47", "AK 47"], "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/AK-47_type_II_noBG.png/960px-AK-47_type_II_noBG.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"));

db.infantry.push(new Prompt(["American-180", "american 180"], "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/American-180.jpg/960px-American-180.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"));

db.infantry.push(new Prompt(["ppsh-41", "ppsh 41"], "https://upload.wikimedia.org/wikipedia/commons/0/01/PPSh-41_from_soviet.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))

db.infantry.push(new Prompt(["m1-garand", "m1 garand"], "https://upload.wikimedia.org/wikipedia/commons/7/71/M14_Stand-off_Munitions_Disruptor_%28SMUD%29_%287414626342%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))

db.infantry.push(new Prompt(["mg42"], "https://upload.wikimedia.org/wikipedia/commons/c/c1/MG42-machine-gun-batey-haosef-1.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))

db.infantry.push(new Prompt(["m16"], "https://upload.wikimedia.org/wikipedia/commons/6/68/NMAH-2004-26289-10.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))

db.infantry.push(new Prompt(["mat-49", "mat 49"], "https://upload.wikimedia.org/wikipedia/commons/0/02/MAT_Submachine_Gun.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))

db.infantry.push(new Prompt(["mp40", "mp 40", "mp-40"], "https://upload.wikimedia.org/wikipedia/commons/7/7c/MP_40_AYF_2.JPG?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))

db.infantry.push(new Prompt(["m4", "m4 carbine"], "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Coltm4a1.jpeg/3840px-Coltm4a1.jpeg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail"))

db.infantry.push(new Prompt(["m2 browning"], "https://upload.wikimedia.org/wikipedia/commons/1/1d/PEO_Browning_M2E2_QCB_%28c1%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"))


const DB_GetKeys = () => {
	let arr = [];
	for (value in db) {
		if (Array.isArray(db[value]))
			arr.push(value);
	}
	return arr;
}

const rand = (val) => {
	return Math.floor(Math.random() * val);
}

let current = {};
let score = 0;

const setCurrentPrompt = (name, category, index) => {
	current.name = name;
	current.category = category;
	current.index = index;
}

const getPrompt = () => {
	const keys = DB_GetKeys();
	const categoryIndex = rand(keys.length);
	const category = keys[categoryIndex];
	const entry = db[category];
	const index = rand(entry.length);
	const value = entry[index];

	if (current.category == category && current.index == index) {
		console.log("same prompt as before");
		getPrompt();
		return;
	}

	console.log("Prompt Selected '" + category + "'");

	setCurrentPrompt(value.name, category, index);
	display_image.src = value.image;
}

const guess = () => {
	const i = game_input.value;
	game_input.value = "";

	if (resolveName(current.name, i)) {
		console.log("You're right!");
		score ++;
	} else {
		console.log("You're wrong!");
		score = 0;
	}

	display_score.innerHTML = score;
	getPrompt();
}

const l_keyboard = (key) => {
	if (key.code == "Enter" && game_input.value != "") {
		guess();
	}
}

document.addEventListener("keydown", l_keyboard);

getPrompt();


