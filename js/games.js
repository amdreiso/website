
let games = [];

class PageContents {
	constructor (description, image, download) {
		this.description = description;
		this.image = "src/img/"+image;
		this.download = download;
	}
}

function add(img, name, description, pageContents={}) {
	games.push({
		image: "src/img/"+img,
		name: name,
		description: description,
		pageContents: pageContents,
	});
}

// Game list
add(
	"thumbnail1.png", 
	"Space Sim", 
	"Pillage planets, discover galaxies and upgrade your spaceship!", 

	new PageContents(
		"Space Sim is a game where you can explore the galaxy, pillage planets and upgrade your spaceship.", 
		"",
		""
	)
);


// Render game links
const gameDisplayTitle = document.getElementById("gameDisplayTitle");
const gameDisplayDescription = document.getElementById("gameDisplayDescription");

function render() {
	const gameList = document.getElementById("gameList");

	for (let i = 0; i < games.length; i++) {
		var anchor = document.createElement("a");
		anchor.href = "#gameDisplay";
		anchor.onclick = function() {
			gameDisplayTitle.innerHTML = games[i].name;
			gameDisplayDescription.innerHTML = games[i].pageContents.description;
		};

		var container = document.createElement("div");
		container.className = "gameContainer";

		var image = document.createElement("img");
		image.className = "gameImage";
		image.src = games[i].image;

		var title = document.createElement("p");
		title.className = "gameTitle";
		title.innerHTML = games[i].name;

		var desc = document.createElement("p");
		desc.className = "gameDescription";
		desc.innerHTML = games[i].description;

		container.append(image, title, desc);
		anchor.append(container);

		gameList.append(anchor);
	}
}

render();

