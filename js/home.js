
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

const linkGenerate = () => {
	for (let i = 0; i < links.length; i++) {
		let l = links[i];
		let anchor = document.createElement("a")
		anchor.innerHTML = l.name
		anchor.href = l.url
		anchor.title = l.desc
		LINKS.append(anchor)
	}
}

linkPush(linkCreate("ideas", "src/ideas.html", "ideas i have for anything"))
linkPush(linkCreate("verbo", "src/verbo/index.html", "vocabulary memorization app"))
linkPush(linkCreate("tolin", "src/tolin/tolin.html", "Stack based scripting language for Gamemaker"))
linkPush(linkCreate("coloniax", "src/coloniax/index.html", "Tools for coloniax"))
linkPush(linkCreate("Célula_Tools", "src/celula/tools.html", "Tools for célula mechanics"))
linkPush(linkCreate("Célula_LevelCreator", "src/celula/level.html", "Tools for célula mechanics"))
linkPush(linkCreate("Andy's Station", "src/andy/andystation.html", "my personal website"))
linkPush(linkCreate("weaponguessr", "src/weaponguessr/index.html", "guess weapons from various time periods"))
linkPush(linkCreate("minecraft_map", "src/minecraft_map/index.html", "minecraft country planning"))

linkGenerate()

