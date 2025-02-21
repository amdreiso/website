
let games = [];

function add(img, name, description, url) {
	games.push({
		image: "src/img/"+img,
		name: name,
		description: description,
		url: url,
	});
}

// Game list
add("thumbnail1.png", "Space Sim", "Pillage planets, discover galaxies and upgrade your spaceship!", "");


// Render game links
function render() {
	const gameList = document.getElementById("gameList");

	for (let i = 0; i < games.length; i++) {
		var anchor = document.createElement("a");
		anchor.href = games[i].url;

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

