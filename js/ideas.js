
const g = "game";
const s = "song";
const e = "else";

const idea = (section, idea) => {
	let d = document.getElementById("idea_"+section);
	let p = document.createElement("li");
	p.innerHTML = idea;
	d.append(p);
}


idea(g, "procedural simulation game of colonization of tribes and villages to increase the size of your kingdom/country/area")





