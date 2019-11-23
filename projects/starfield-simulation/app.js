// Get canvas element by ID
let canvas = document.getElementById("canvas");
// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Canvas context to 2D
let c = canvas.getContext("2d");

// Draw
function draw() {
  // Canvas background
  c.fillStyle = "#000000";
  // Draw a rectangle on canvas;
  c.fillRect(0, 0, canvas.width, canvas.height);
}

// Update
function update() {
  draw();
  window.requestAnimationFrame(update);
}

update();
