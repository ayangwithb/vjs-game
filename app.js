const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const palette = document.getElementsByClassName("jsColors");
const jsrange = document.getElementById("jsRange");
const jsmode = document.getElementById("jsMode");
const jssave = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  //console.log(x, y);
}

function onMouseUp(event) {
  //console.log(event);
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  ctx.lineWidth = jsrange.value;
}

function handlejsModeClick(event) {
  if (filling) {
    filling = false;
    jsmode.innerText = "Fill";
  } else {
    filling = true;
    jsmode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handCM(event) {
  event.preventDefault();
}

function handlejsSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handCM);
}

if (palette) {
  Array.from(palette).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
}

if (jsrange) {
  jsrange.addEventListener("input", handleRangeChange);
}

if (jsmode) {
  jsmode.addEventListener("click", handlejsModeClick);
}

if (jssave) {
  jssave.addEventListener("click", handlejsSaveClick);
}
