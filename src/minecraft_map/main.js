
const g = canvas.getContext("2d");
let mousex = 0;
let mousey = 0;

const BACKGROUND = "#181818";
const FOREGROUND = "#eee";

async function blobToImage(blob) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };

        img.onerror = reject;

        img.src = url;
    });
}

const drawCircle = (g, x, y, radius) => {
	g.beginPath();
	g.arc(x, y, radius, 0, Math.PI * 2);
	g.fill();
}

class Instance {
	constructor(image) {
		this.image = image;
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
		this.top = 0;
		this.bottom = 0;
		this.left = 0;
		this.right = 0;
		this.selected = false;
	}

	static async create(blob) {
        const image = await blobToImage(blob);
		let width = image.width;
		let height = image.height;
		let x = canvas.width / 2 - image.width / 2;
		let y = canvas.height / 2 - image.height / 2;

		let inst = new Instance(image);
		inst.width = width; 
		inst.height = height; 
		inst.x = x;
		inst.y = y;

        return inst;
    }

    async setImage(blob) {
        this.image = await blobToImage(blob);
    }

	inBoundary(x, y) {
		return (x > this.left && x < this.right && y > this.top && y < this.bottom);
	}

	draw(g) {
		if (!this.image) return;
		this.left 		= this.x;
		this.right 		= this.x + this.width;
		this.top 		= this.y;
		this.bottom 	= this.y + this.height;

		g.drawImage(this.image, this.x, this.y);

		if (this.selected) {
			g.strokeStyle = "aqua";
			g.lineWidth = 2;
			g.strokeRect(this.x, this.y, this.width, this.height);

			g.fillStyle = "aqua";
			drawCircle(g, this.x, this.y, 10);
			drawCircle(g, this.right, this.y, 10);
			drawCircle(g, this.x, this.bottom, 10);
			drawCircle(g, this.right, this.bottom, 10);
		}
	}
}

let instances = [];

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mousex = (e.clientX - rect.left) * scaleX;
    mousey = (e.clientY - rect.top) * scaleY;
});

let selecting = false;
let selectedInstance = -1;
let instanceDrag = false;

const SelectInstance = () => {
	selecting = true;
}

const DragInstance = () => {
	if (!instanceDrag || selectedInstance == -1) return;
	selectedInstance.x = mousex - selectedInstance.width / 2;
	selectedInstance.y = mousey - selectedInstance.height / 2;
}

canvas.addEventListener("mouseup", (e) => {
	console.log("mouse up at ", mousex, mousey);
	instanceDrag = false;
});

canvas.addEventListener("mousedown", (e) => {
	SelectInstance();
	if (selectedInstance !== -1 && selectedInstance.inBoundary(mousex, mousey)) {
		let x = selectedInstance.x;
		let y = selectedInstance.y;

		instanceDrag = {
			x: x,
			y: y,
		};
	} 
});

// Copy paste
window.addEventListener("paste", async () => {
	const items = await navigator.clipboard.read();

	for (const item of items) {
		const type = item.types.find(t => t.startsWith("image/"));
		if (!type) continue;

		const blob = await item.getType(type);
		const instance = await Instance.create(blob);
		instances.push(instance);
	}
});


// Main loop
const Clear = () => {
	g.fillStyle = BACKGROUND;
	g.fillRect(0, 0, canvas.width, canvas.height);
}
setInterval(() => {
	Clear();
	DragInstance();

	let found = false;
	for (instance of instances) {
		if (selecting) {
			if (instance.inBoundary(mousex, mousey)) {
				instance.selected = true;
				selectedInstance = instance;
				found = true;
			} else {
				instance.selected = false;
			}

			selecting = false;

			if (!found) {
				selectedInstance = -1;
			}
		}
		instance.draw(g);
	}
}, 15);


const Resize = () => {
	canvas.width 	= window.innerWidth;
	canvas.height 	= window.innerHeight;
}

Resize();
window.onresize = () => {
	Resize();
}


