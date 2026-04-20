
let links = []

const linkCreate = (name, url) => {
	return {
		name : name,
		url : url
	}
}

const linkPush = (link) => {
	links.push(link)
}

const linkGenerate = () => {
	for (let i = 0; i < links.length; i++) {
		let l = links[i];
		let anchor = document.createElement("a")
		anchor.innerHTML = l.name
		anchor.href = l.url
		LINKS.append(anchor)
	}
}

linkPush(linkCreate("tolin", "src/tolin.html"))
linkPush(linkCreate("DEATH_RANCH", "src/DEATH_RANCH.html"))
linkPush(linkCreate("Andy's Station", "src/andystation.html"))

linkGenerate()

