
let DOCS = {};

// PAGES
const PAGES = {};
const pageRegister = (name, category, fn) => {
	PAGES[name] = {
		category : category,
		fn : fn,
	}
}

pageRegister("overview", "general", async (doc) => {
	await doc.push(
		docCreateText("Basic code snippet of TOLIN, with most of its functionalities"),
		await docCreateCodeFile("../src/tolin/basics.tolin"),
	);
})

pageRegister("include", "general", async (doc) => {
	await doc.push(
		docCreateText("the keyword 'include' copies the code from the specified file and inserts it in the same line"),
		await docCreateCodeFile("../src/tolin/include_example_0.tolin"),
		docCreateText("We can then, include the file above, to access the HELLO function"),
		await docCreateCodeFile("../src/tolin/include_example_1.tolin"),
	);
})

pageRegister("power", "math", async (doc) =>{
	await doc.push(
		docCreateText("power function"),
		docCreateCode("x n power()"),
		docCreateText("returns: Number"),
	);
});

pageRegister("abs", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the absolute value of a number."),
    docCreateCode("x abs()"),
    docCreateText("returns: Number")
  );
});

pageRegister("sign", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the sign of a number: -1 for negative, 0 for zero, 1 for positive."),
    docCreateCode("x sign()"),
    docCreateText("returns: Number")
  );
});

pageRegister("sqrt", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the square root of a number."),
    docCreateCode("x sqrt()"),
    docCreateText("returns: Number")
  );
});

pageRegister("sqr", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the square of a number."),
    docCreateCode("x sqr()"),
    docCreateText("returns: Number")
  );
});

pageRegister("exp", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns e raised to the given power."),
    docCreateCode("x exp()"),
    docCreateText("returns: Number")
  );
});

pageRegister("ln", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the natural logarithm of a number."),
    docCreateCode("x ln()"),
    docCreateText("returns: Number")
  );
});

pageRegister("log10", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the base-10 logarithm of a number."),
    docCreateCode("x log10()"),
    docCreateText("returns: Number")
  );
});

pageRegister("sin", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the sine of an angle in radians."),
    docCreateCode("angle sin()"),
    docCreateText("returns: Number")
  );
});

pageRegister("cos", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the cosine of an angle in radians."),
    docCreateCode("angle cos()"),
    docCreateText("returns: Number")
  );
});

pageRegister("tan", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the tangent of an angle in radians."),
    docCreateCode("angle tan()"),
    docCreateText("returns: Number")
  );
});

pageRegister("arcsin", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the arcsine of a value."),
    docCreateCode("x arcsin()"),
    docCreateText("returns: Number")
  );
});

pageRegister("arccos", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the arccosine of a value."),
    docCreateCode("x arccos()"),
    docCreateText("returns: Number")
  );
});

pageRegister("arctan", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the arctangent of a value."),
    docCreateCode("x arctan()"),
    docCreateText("returns: Number")
  );
});

pageRegister("arctan2", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the arctangent of y/x using the signs of both arguments."),
    docCreateCode("y x arctan2()"),
    docCreateText("returns: Number")
  );
});

pageRegister("degtorad", "math", async (doc) =>{
  await doc.push(
    docCreateText("Converts degrees to radians."),
    docCreateCode("degrees degtorad()"),
    docCreateText("returns: Number")
  );
});

pageRegister("radtodeg", "math", async (doc) =>{
  await doc.push(
    docCreateText("Converts radians to degrees."),
    docCreateCode("radians radtodeg()"),
    docCreateText("returns: Number")
  );
});

pageRegister("power", "math", async (doc) =>{
  await doc.push(
    docCreateText("Raises a number to a power."),
    docCreateCode("x n power()"),
    docCreateText("returns: Number")
  );
});

pageRegister("min", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the smaller of two numbers."),
    docCreateCode("a b min()"),
    docCreateText("returns: Number")
  );
});

pageRegister("max", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the larger of two numbers."),
    docCreateCode("a b max()"),
    docCreateText("returns: Number")
  );
});

pageRegister("clamp", "math", async (doc) =>{
  await doc.push(
    docCreateText("Clamps a value between a minimum and maximum."),
    docCreateCode("value min max clamp()"),
    docCreateText("returns: Number")
  );
});

pageRegister("lerp", "math", async (doc) =>{
  await doc.push(
    docCreateText("Linearly interpolates between two values."),
    docCreateCode("a b t lerp()"),
    docCreateText("returns: Number")
  );
});

pageRegister("floor", "math", async (doc) =>{
  await doc.push(
    docCreateText("Rounds a number down to the nearest integer."),
    docCreateCode("x floor()"),
    docCreateText("returns: Number")
  );
});

pageRegister("ceil", "math", async (doc) =>{
  await doc.push(
    docCreateText("Rounds a number up to the nearest integer."),
    docCreateCode("x ceil()"),
    docCreateText("returns: Number")
  );
});

pageRegister("round", "math", async (doc) =>{
  await doc.push(
    docCreateText("Rounds a number to the nearest integer."),
    docCreateCode("x round()"),
    docCreateText("returns: Number")
  );
});

pageRegister("frac", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns the fractional part of a number."),
    docCreateCode("x frac()"),
    docCreateText("returns: Number")
  );
});

pageRegister("random", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns a random real number between 0 and the given value."),
    docCreateCode("x random()"),
    docCreateText("returns: Number")
  );
});

pageRegister("random_range", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns a random real number between two values."),
    docCreateCode("min max random_range()"),
    docCreateText("returns: Number")
  );
});

pageRegister("irandom", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns a random integer between 0 and the given value."),
    docCreateCode("x irandom()"),
    docCreateText("returns: Number")
  );
});

pageRegister("irandom_range", "math", async (doc) =>{
  await doc.push(
    docCreateText("Returns a random integer between two values."),
    docCreateCode("min max irandom_range()"),
    docCreateText("returns: Number")
  );
});

pageRegister("randomise", "math", async (doc) =>{
  await doc.push(
    docCreateText("Initializes the random number generator with a new seed."),
    docCreateCode("randomise()"),
    docCreateText("returns: undefined")
  );
});


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

const highlightString = (code) => {
	const keywords = ['func', 'end', 'set', 'while', 'if', 'include'];
	const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

	code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

	let highlighted = code
		.replace(/(\/\/.*)/g, '<green>$1</green>')
		.replace(keywordRegex, '<yellow>$1</yellow>');

	return highlighted
}

const docCreateCodeFile = async (url) => {
	try {
		const response = await fetch(url);
		let code = await response.text();

		let highlighted = highlightString(code);

		return {
			type: "code",
			text: highlighted,
		};
	} catch (err) {
		console.error("Error highlighting .tolin file:", err);
	}
}

const docCreateCode = (code) => {
	let highlighted = highlightString(code);

	return {
		type: "code",
		text: highlighted,
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

