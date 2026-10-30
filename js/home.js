
let links = []

const linkCreate = (name, url, desc="") => {
	return {
		name : name,
		url : url,
		desc : desc
	}
}

const linkPush = (link) => {
	links.push(link)
}

let colorIndex = 0;

const linkGenerate = () => {
	for (let i = 0; i < links.length; i++) {
		let l = links[i];
		let anchor = document.createElement("a")
		anchor.innerHTML = l.name
		anchor.href = l.url
		anchor.title = l.desc
		const colors = ["red", "orange", "green", "blue", "magenta", "pink"]
		const c = colors[colorIndex];
		anchor.style = `background: var(--color-${c})`
		LINKS.append(anchor)
		colorIndex = (colorIndex + colors.length + 1) % colors.length;
	}
}

linkPush(linkCreate("verbo", "src/verbo/index.html", "vocabulary memorization app"))
linkPush(linkCreate("tolin", "src/tolin/tolin.html", "Stack based scripting language for Gamemaker"))
linkPush(linkCreate("coloniax", "src/coloniax/index.html", "Tools for coloniax"))
linkPush(linkCreate("weaponguessr", "src/weaponguessr/index.html", "guess weapons from various time periods"))

linkGenerate()

