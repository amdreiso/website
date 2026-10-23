
const canvas = new fabric.Canvas("canvas");

const Resize = () => {
	canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
    });
}

Resize();
window.onresize = () => {
	Resize();
}

// Paste
window.addEventListener("paste", async (e) => {
    for (const item of e.clipboardData.items) {
        if (!item.type.startsWith("image/")) continue;

        const blob = item.getAsFile();

        const url = URL.createObjectURL(blob);

        fabric.FabricImage.fromURL(url).then((img) => {
			img.set({
				left: canvas.width/2,
				top: canvas.height/2,
			})
            canvas.add(img);
            URL.revokeObjectURL(url);
        });
    }
});

window.addEventListener("keydown", async (e) => {
    // Ctrl+S
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        SaveProject();
    }

    // Ctrl+Z
    if (e.ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        Undo();
    }

    // Ctrl+Y
    if (e.ctrlKey && e.key.toLowerCase() === "y") {
        e.preventDefault();
		Redo();
    }

	if (e.key === "Delete") {
		const activeObjects = canvas.getActiveObjects();

		if (activeObjects.length === 0) return;

		activeObjects.forEach(obj => canvas.remove(obj));

		canvas.discardActiveObject();
		canvas.requestRenderAll();
	}

	// Copy
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
        const active = canvas.getActiveObject();
        if (!active) return;

        clipboard = await active.clone();
        e.preventDefault();
    }

    // Paste
    if (e.ctrlKey && e.key.toLowerCase() === "v") {
        if (!clipboard) return;

        const copy = await clipboard.clone();

        copy.set({
            left: copy.left + 20,
            top: copy.top + 20
        });

        canvas.add(copy);
        canvas.setActiveObject(copy);
        canvas.requestRenderAll();

        // So you can press Ctrl+V repeatedly
        clipboard = await copy.clone();

        e.preventDefault();
    }
});


const history = [];
let historyIndex = -1;

function saveHistory() {
    history.splice(historyIndex + 1);
    history.push(JSON.stringify(canvas));
    historyIndex++;
};
saveHistory();

canvas.on("object:added", saveHistory);
canvas.on("object:modified", saveHistory);
canvas.on("object:removed", saveHistory);

canvas.on("mouse:down", (opt) => {
    if (opt.e.button === 2) { // right click
        const obj = opt.target;

        if (!obj) return;
		menu.style.display = "flex";

        showContextMenu(
            opt.e.clientX,
            opt.e.clientY,
            obj
        );
    }
});

canvas.upperCanvasEl.addEventListener("contextmenu", e => {
    e.preventDefault();
});

function showContextMenu(x, y, obj) {
    const menu = document.getElementById("menu");

    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.style.display = "flex";

    menu.onclick = (e) => {
        if (e.target.dataset.action === "delete") {
            canvas.remove(obj);
        }

        if (e.target.dataset.action === "lock") {
            obj.set({
                lockMovementX: true,
                lockMovementY: true
            });
        }

        if (e.target.dataset.action === "unlock") {
            obj.set({
                lockMovementX: false,
                lockMovementY: false
            });
        }

        canvas.requestRenderAll();
        menu.style.display = "none";
    };
}

async function Redo() {
    if (historyIndex >= history.length-1) return;

    historyIndex++;

    await canvas.loadFromJSON(history[historyIndex]);
    canvas.requestRenderAll();
}

async function Undo() {
    if (historyIndex <= 0) return;

    historyIndex--;

    await canvas.loadFromJSON(history[historyIndex]);
    canvas.requestRenderAll();
}

function SaveProject() {
    const json = canvas.toJSON();
    localStorage.setItem("project", JSON.stringify(json));
}


const text = new fabric.Text("Hello!", {
    left: 300,
    top: 200,
	fill: "white",
});

canvas.add(text);
