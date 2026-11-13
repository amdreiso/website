
function attr(obj) {
	obj.type = true
	return obj
}

function elementAppend(e, ...elements) {
	for (element of elements) {
		// Checks if element is attr() function
		if (element.type ?? false) {
			const keys = Object.keys(element)
			for (key of keys) {
				if (key == "type") continue
				e[key] = element[key]
			}
			continue

		} else if (typeof(element) == "string") {
			e.innerHTML += element
			continue

		}
		e.append(element)
	}
}

function elementTemplate(name, ...elements) {
	let e = document.createElement(name)
	elementAppend(e, ...elements)
	return e
}

function div(...elements) {return elementTemplate("div", ...elements)}
function section(...elements) {return elementTemplate("section", ...elements)}

function h1(value, ...elements) {
	let e = elementTemplate("h1", ...elements)
	e.innerText = value
	return e
}

function p(value, ...elements) {
	let e = elementTemplate("p", ...elements)
	e.innerText = value
	return e
}

function a(value, href, ...elements) {
	let e = elementTemplate("a", ...elements)
	e.innerText = value
	e.href = href
	return e
}

function code(...elements) {
	return elementTemplate("code", ...elements)
}

function createPage(name, id, ...elements) {
	const s = section(
		h1(name),
		...elements,
		attr({className: "marker", id: id}),
	)
	page.append(s)
}

createPage(
	"Tolin", "tolin",

	p("Tolin is a scripting language for GameMaker."),
	p("Tolin was made upon the need to modify the project's code without having to recompile the entire thing."),

	"I created a tolin scripting language before for learning purposes, it was a stack based programming language, a video series by ",
	a("tsoding", "https://www.youtube.com/watch?v=8QP2fDBIxjM&list=PLpM-Dvs8t0VbMZA7wW9aR3EtBqe2kinu4"),
	" sparked my interest, where they created 'Porth'.",
)

createPage("Getting Started", "getting_started",
	p("To get started with tolin, here's an example on how to initialize it."),
	code(`
var ts = tolin_state();
tolin_add_code(ts, @'print("hello, world!")');
tolin_run(ts);
delete ts;
 `
	),
)

page.append(
	section(
		h1("Variables"),
		p("Variables can hold values of any type, even Objects, methods, etc"),
		p("Declaration is as simple as below"),
		code(`
x = 69;
Player.x += 200;
 `,
		),
		attr({className: "marker", id: "variables"})
	)
)

page.append(
	section(
		h1("Functions"),
		p("Every script asset is already exposed to tolin by default, built-in functions have to be passed manually."),
		code(`
// exposes show_debug_message function as print in tolin 
tolin_register(ts, "print", show_debug_message);
 `,
		),
		attr({className: "marker", id: "functions"})
	)
)

for (child of page.children) {
	if (child.classList.contains("marker")) {
		const yy = child.offsetTop
		let span = document.createElement("span")
		span.innerText = child.id
		span.onclick = () => {
			page.scrollTo({
				left: 0,
				top: yy,
				behavior: "smooth",
			})
		}
		navbar.append(span)
	}
}

