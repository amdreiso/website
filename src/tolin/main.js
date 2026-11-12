
for (child of page.children) {
	if (child.classList.contains("marker")) {
		let span = document.createElement("span")
		span.innerText = child.id
		navbar.append(span)
	}
}

