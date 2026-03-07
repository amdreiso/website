
let DOCS = {};

// PAGES
const PAGES = {};
const pageRegister = (name, category, fn) => {
	PAGES[name] = {
		category : category,
		fn : fn,
	}
}

pageRegister("Basics", "general", async (doc) => {
	await doc.push(
		docCreateText("Basic code snippet of TOLIN, with most of its functionalities"),
		await docCreateCode("../src/tolin/basics.tolin"),
		docCreateText("Basics"),
	);
})

pageRegister("include", "general", async (doc) => {
	await doc.push(
		docCreateText("the keyword 'include' copies the code from the specified file and inserts it in the same line"),
		docCreateBr(),
		docCreateText("Important: the filename does NOT need the .tolin extension at the end, just the name"),
		docCreateBr(),
		docCreateBr(),
		docCreateBr(),
		docCreateText("The code below, is setting a function called HELLO"),
		await docCreateCode("../src/tolin/include_example_0.tolin"),
		docCreateText("Then, we include that file, making the function accessible in the current file"),
		await docCreateCode("../src/tolin/include_example_1.tolin"),
		docCreateText("include"),
	);
})

docSelect = async () => {
	const hash = window.location.hash;
	let newHash = "";
	newHash = hash.replace("#", "")
	newHash = newHash.split("_");
	const name = newHash[0];
	const category = newHash[1];

	const doc = DOCS[category]?.find(d => d.name === name);
	if (!doc) return;

	if (doc.content.length === 0 && PAGES[name]) {
		await PAGES[name].fn(doc);
	}

	CONTENT.innerHTML = "";
	docCreateBlock(name, category);
}

window.addEventListener("hashchange", docSelect);

updateNavbar = () => {
	const NAV = document.getElementById("NAV");
	while (NAV.firstChild) {
		NAV.removeChild(NAV.firstChild);
	}

	// create every category in navbar
	for (const category in DOCS) {
		var content = document.createElement("div");
		content.className = "content";

		var title = document.createElement("p")
		title.className = "title";
		title.innerHTML = category;

		content.append(title);

		for (const link of DOCS[category]) {
			var a = document.createElement("a");
			a.innerHTML = link.name;
			a.href = "#" + link.name + "_" + category;
			a.onclick = docSelect
			content.append(a);
		}
		NAV.append(content);
	}
}

docCreateText = (text) => {
	return {
		type : "text",
		text : text,
	}
}

docCreateBr = () => {
	return {
		type : "br",
	}
}

docCreateCode = async (url) => {
	try {
		const response = await fetch(url);
		let code = await response.text();

		const keywords = ['func', 'end', 'set', 'while', 'if', 'include'];
		const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

		code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

		let highlighted = code
			.replace(/(\/\/.*)/g, '<green>$1</green>')
			.replace(keywordRegex, '<yellow>$1</yellow>');
		
		return {
			type: "code",
			text: highlighted,
		};
	} catch (err) {
		console.error("Error highlighting .tolin file:", err);
	}
}

docCreate = (name, category="uncategorized") => {
	if (DOCS[category]) {
		const existing = DOCS[category].find(d => d.name === name);
		if (existing) return existing;
	}

	let result = {
		name : name,
		category : category,
		content : [],
	}

	result.push = async (...values) => {
		const resolvedValues = await Promise.all(values);
		for (const value of resolvedValues) {
			result.content.push(value);
		}
		return this
	}

	if (!DOCS[category]) {
		DOCS[category] = [];
	}

	DOCS[category].push(result);
	return result
}

docCreateBlock = async (name, category) => {
	const doc = DOCS[category].find(d => d.name === name);
	if (!doc) return;

	const d_docs = document.createElement("div");
	d_docs.className = "docs";

	for (const block of doc.content) {
		if (block.type === "text") {
			const p = document.createElement("p");
			p.className = "description";
			p.textContent = block.text;
			d_docs.append(p);
		}

		else if (block.type === "code") {
			const pre = document.createElement("pre");
			const code = document.createElement("code");

			code.innerHTML = block.text;

			pre.append(code);
			d_docs.append(pre);
		}

		else if (block.type === "br") {
			const br = document.createElement("br");
			d_docs.append(br);
		}
	}

	CONTENT.append(d_docs);
};

const init = () => {
	for (const pageName in PAGES) {
		console.log(PAGES[pageName])
		docCreate(pageName, PAGES[pageName].category);
	}

	updateNavbar();

	if (window.location.hash) {
		docSelect();
	}
};

init();

updateNavbar()

