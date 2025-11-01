


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
createLink("onlyfans", "https://www.youtube.com/watch?v=rb8z2BMrd60");
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
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const GRAVITY = 0.1666; 


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


instances = [];
confetti = [
	"./src/img/confetti1.png",
	"./src/img/confetti2.png",
	"./src/img/confetti3.png",
	"./src/img/confetti4.png",
	"./src/img/starglitter.gif",
];

class Instance {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vsp = 0;
		this.hsp = 0;
		this.scale = 1 + Math.random() * 2;

		this.image = new Image();
		const index = Math.floor(Math.random() * confetti.length);
		this.image.src = confetti[index];
	}

	update() {
		this.x += this.hsp;
		this.y += this.vsp;

		this.vsp += GRAVITY;
	}

	draw(g) {
		const size = 25;
		g.drawImage(this.image, this.x, this.y, size * this.scale, size * this.scale);
	}
}

class Randvec2 {
	constructor(x, y, range) {
		this.x = x + Math.round(Math.random() * range) - range / 2;
		this.y = y + Math.round(Math.random() * range) - range / 2;
	}
}

const spawnRange = 70;
const instanceSpeedMultiplier = 2;

let mousepos = {};

window.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
	mousepos.x = x;
	mousepos.y = y;

});

spawnConfetti = (num, x = mousepos.x, y = mousepos.y) => {
	for (let i = 0; i < num; i++) {
		const pos = new Randvec2(x, y, spawnRange);

		let instance = new Instance(pos.x, pos.y)
		instance.vsp -= Math.random() * 3 * instanceSpeedMultiplier;
		instance.hsp += (Math.random() * 3 - 1.5) * instanceSpeedMultiplier;
		instances.push(instance);
	}
}

setInterval(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < instances.length; i++) {
		let inst = instances[i];
		inst.update();
		inst.draw(ctx);
	}
}, 15);



// Music
const musicSource = document.getElementById("music-source");

musicList = [
	"./src/music/Nostalgia.mp3",
	"./src/music/afterlife.mp3",
	"./src/music/coordinates.mp3",
	"./src/music/coziness.mp3",
	"./src/music/down.mp3",
	"./src/music/duck.mp3",
	"./src/music/him calm 2.mp3",
	"./src/music/lobby.mp3",
	"./src/music/sentimental.mp3",
	"./src/music/outro.mp3",
	"./src/music/boss1.mp3",
];

let index = Math.floor(Math.random() * musicList.length);
musicSource.src = musicList[index];

document.getElementById("music-random").onclick = () => {
	let index = Math.floor(Math.random() * musicList.length);
	musicSource.src = musicList[index];
}














