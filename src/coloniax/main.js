
const BACKGROUND = "#101010"
const ctx = game.getContext('2d')

const TILE_WIDTH = 32
const TILE_HEIGHT = 16
const TILE_HEIGHT_Y = 7
const WIDTH = 800
const HEIGHT = 600
const FPS = 60

let blockImageBlue	= new Image()
blockImageBlue.src	= "isometric_block_blue.png"

let blockImagePink	= new Image()
blockImagePink.src	= "isometric_block_pink.png"

let blockImageRose	= new Image()
blockImageRose.src	= "isometric_block_rose.png"

let tileImage	= new Image()
tileImage.src	= "isometric_tile.png"

let tileImageOutline = new Image()
tileImageOutline.src = "isometric_tile_outline.png"

const images = [
	blockImageBlue,
	blockImagePink,
	blockImageRose,
	tileImage,
	tileImageOutline,
]

let imagesLoaded = 0

for (const img of images) {
	img.onload = () => {
		imagesLoaded++
		
		if (imagesLoaded === images.length) {
			draw()
		}
	};
}

game.width = WIDTH
game.height = HEIGHT

const cx = game.width/2
const cy = game.height/2

let width = 5
let height = 13

ctx.font = "5px monospace"
ctx.textAlign = "center"
ctx.textBaseline = "middle"

let mouse = {x:0,y:0}
let displayNumbers = display_numbers.checked
let tileOpacityValue = cursor_opacity.value

game.addEventListener("mousemove", (e) => {
	const rect = game.getBoundingClientRect()
	const mx = e.clientX - rect.left
	const my = e.clientY - rect.top
	mouse.x = mx - cx
	mouse.y = my - cy
	draw()
})

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard successfully!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

const getCursorPos = () => {
		return {x:mx,y:my}
}

const clear = () => {
	ctx.fillStyle = BACKGROUND
	ctx.fillRect(0, 0, game.width, game.height)
}

clear()

const project = (x, y) => {
	let vect = {}
	vect.x = x * TILE_WIDTH
	vect.y = y * Math.floor(TILE_HEIGHT / 2)

	if (y % 2 != 0) {
		vect.x += TILE_WIDTH / 2
	}

	vect.x += cx
	vect.y += cy

	return vect;
}

const rect = (x, y, width, height, color) => {
	ctx.fillStyle = color
	ctx.fillRect(x-width/2, y-height/2, width, height)
}

const drawTile = (img, x, y) => {
	const pos = project(x, y)
	ctx.drawImage(img, pos.x - TILE_WIDTH / 2, pos.y - TILE_HEIGHT / 2)
}

const drawBoard = () => {
	const hh = Math.floor(height / 2)
	const ww = Math.floor(width / 2)

	for (let i = -hh; i < height/2; i++) {
		for (let j = -ww; j < width/2; j++) {
			if (j == ww && i % 2 != 0) continue;
			let img = blockImageRose;
			
			if (i % 2 == 0) img = blockImagePink;
			if (i % 2 == 0 && j % 2 != 0) {
				img = blockImageBlue;
			}
			
			drawTile(img, j, i);
			
			const pos = project(j, i);
			const xx = Math.floor(j);
			const yy = Math.floor(i);
			
			if (displayNumbers) {
				ctx.fillStyle = "white";
				ctx.globalAlpha = 0.5
				ctx.fillText(xx + "." + yy, pos.x, pos.y);
				ctx.globalAlpha = 1
			}
		}
	}
}

let selectedTiles = []
let mousetile = {x:0,y:0}

const displayResults = () => {
	let results = []
	for (let i = 0; i < selectedTiles.length; i++) {
		const xx = selectedTiles[i].x
		const yy = selectedTiles[i].y
		results.push([xx, yy])
	}
	result.innerHTML = JSON.stringify(results)
}

game.addEventListener("mousedown", (e) => {
	for (let i = 0; i < selectedTiles.length; i++) {
		const tile = selectedTiles[i]
		if (mousetile.x == tile.x && mousetile.y == tile.y) {
			selectedTiles.splice(i, 1)
			displayResults()
			return
		}
	}
	selectedTiles.push({
		x: mousetile.x,
		y: mousetile.y,
	})
	draw()
	displayResults()
})
displayResults()

const draw = () => {
	clear();

	ctx.save();
	ctx.translate(-cx*2, -cy*2)
	ctx.scale(3, 3)
	ctx.imageSmoothingEnabled = false;

	drawBoard()
	
	const th = (TILE_HEIGHT) * 1.5
	mousetile.y = Math.round(mouse.y / th)

	let xoffset = 0
	if (mousetile.y % 2 != 0) {
		xoffset = -TILE_WIDTH
	}

	mousetile.x = Math.round((mouse.x + xoffset) / TILE_WIDTH/3)

	ctx.globalAlpha = tileOpacityValue
	drawTile(tileImage, mousetile.x, mousetile.y)
	ctx.globalAlpha = 1

	for (let i = 0; i < selectedTiles.length; i++) {
		drawTile(tileImageOutline, selectedTiles[i].x, selectedTiles[i].y)
	}
	
	ctx.restore();
};

result.onclick = () => {
	copyTextToClipboard(result.innerHTML)
	popup("Copied results to Clipboard!")
}

flipx.onclick = () => {
	for (tile of selectedTiles) {
		if (tile.y % 2 != 0) {
			tile.x += 1
		}
		tile.x *= -1
	}
	draw()
	displayResults()
}

flipy.onclick = () => {
	for (tile of selectedTiles) {
		tile.y *= -1
	}
	draw()
	displayResults()
}

display_numbers.onclick = (e) => {
	displayNumbers = display_numbers.checked
	draw()
}

cursor_opacity.onchange = () => {
	mouse = {x:0,y:0}
	tileOpacityValue = cursor_opacity.value
	draw()
}

const popup = (str) => {
	let span = document.createElement("span")
	span.innerHTML = str
	span.style.opacity = 1
	span.style.top = 50
	popups.append(span)
}

setInterval(()=>{
	if (popups.childrenElementCount == 0) return
	for (child of popups.childNodes) {
		let t = parseInt(child.style.top)
		child.style.opacity -= 0.025
		child.style.top = (t+1 * 1.1)

		if (child.style.opacity <= 0) {
			child.remove()
		}
	}
},30)

ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;    // Older Firefox
ctx.webkitImageSmoothingEnabled = false;  // Older Safari / Chrome
ctx.msImageSmoothingEnabled = false;      // IE

