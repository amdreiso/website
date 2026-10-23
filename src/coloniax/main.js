
const BACKGROUND = "#050505"
const ctx = game.getContext('2d')
ctx.imageSmoothingEnabled = false;

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

game.width = WIDTH
game.height = HEIGHT

let zoom = 1
let x = 0
let y = 0

const getCursorPos = () => {
	const rect = game.getBoundingClientRect();
	const mx = game.clientX - rect.left;
	const my = game.clientY - rect.top;
	return {x:mx,y:my}
}

game.addEventListener("wheel", (e) => {
	e.preventDefault()

	const m = getCursorPos()

	const oldZoom = zoom
	const newZoom = Math.max(1, Math.min(8,
		zoom + (e.deltaY < 0 ? 0.1 : -0.1)
	))

	x = m.x - (m.x - x) * (newZoom / oldZoom)
	y = m.y - (m.y - y) * (newZoom / oldZoom)

	zoom = newZoom

}, { passive: false });

//game.addEventListener("wheel", (e) => {
//	e.preventDefault();
//	const rect = game.getBoundingClientRect();
//	const mx = e.clientX - rect.left;
//	const my = e.clientY - rect.top;
//
//	const oldZoom = zoom;
//	const factor = e.deltaY < 0 ? 1 : 1 / 1.1;
//	const newZoom = Math.max(0.1, Math.min(10, oldZoom * factor));
//
//	x = mx - (mx - x) * (newZoom / oldZoom);
//	y = my - (my - y) * (newZoom / oldZoom);
//
//	zoom = newZoom;
//}, { passive: false });

const clear = () => {
	ctx.fillStyle = BACKGROUND
	ctx.fillRect(0, 0, game.width, game.height)
}

clear()

const project = (x, y) => {
	let vect = {}
	vect.x = x * TILE_WIDTH / 2
	vect.y = y * Math.floor(TILE_HEIGHT / 2)

	if (y % 2 != 0) {
		vect.x += TILE_WIDTH / 2
	}

	return vect;
}

const rect = (x, y, width, height, color) => {
	ctx.fillStyle = color
	ctx.fillRect(x-width/2, y-height/2, width, height)
}

const drawTile = (img, x, y) => {
	const pos = project(x, y)
	pos.x += game.width/2
	pos.y += game.height/2

	ctx.drawImage(img, pos.x, pos.y)
}

const update = () => {
	clear()
	
	ctx.save();
	ctx.translate(x, y);
	ctx.scale(zoom, zoom);

	drawTile(blockImageRose, 0, 0)
	drawTile(blockImageBlue, 0, 1)
	setTimeout(update, 1000/FPS)

	ctx.restore()
}

setTimeout(update, 1000/FPS)

