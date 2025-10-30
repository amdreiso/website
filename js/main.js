


// LINKS
class Link {
	constructor(name, src) {
		this.name = name;
		this.src = src;
	}
}

let links = [];

createLink = function(name, src) {
	links.push(new Link(name, src));
}

createLink("music", "./music.html");
createLink("games", "");
createLink("videos", "https://youtube.com/@amdrei");
createLink("pictures", "");
createLink("military_conscription", "./other/happiness.html");
createLink("travels", "");
createLink("terrariums", "");
createLink("onlyfans", "");
createLink("exclusive bussy", "");
createLink("flags", "");
createLink("minecraft", "");

const linkdiv = document.getElementById("links");

linkUpdate = function() {
	for (var i = 0; i < links.length; i++) {
		var a = document.createElement("a");
		a.innerHTML = links[i].name;
		a.href = links[i].src;
		linkdiv.append(a);
	}
}

linkUpdate();




// Glitter or something

instances = [];



