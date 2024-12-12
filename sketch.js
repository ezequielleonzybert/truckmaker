const w = window.innerWidth;
const h = window.innerHeight;
let menu;
let tool;
let drawing = false;
let lastX, lastY;
let wheels = [];
let terrain;

function setup() {
  createCanvas(w, h);
  menu = new Menu(w, 50);
  terrain = new Terrain(10, 100, w, h * .7);
}

function draw() {
  background(220);
  terrain.render();
  menu.render();

  if (drawing) {
    if (tool == "wheel") {
      stroke('black');
      strokeWeight(1);
      circle(lastX, lastY, 2 * dist(lastX, lastY, mouseX, mouseY));
      line(lastX, lastY, mouseX, mouseY);
    }
  }

  for (const w of wheels) {
    w.update();
    w.render();
  }

}

function mousePressed() {
  if (mouseY > menu.h) {
    if (!drawing) {
      lastX = mouseX;
      lastY = mouseY;
      drawing = true;
    }
    for (let b of menu.buttons) {
      if (b.active == true) {
        tool = b.tool;
      }
    }
  }
}

function mouseDragged() {

}

function mouseReleased() {
  if (drawing) {
    if (tool == "wheel") {
      wheels.push(new Wheel(lastX, lastY, dist(lastX, lastY, mouseX, mouseY), atan2(mouseY - lastY, mouseX - lastX)));
    }
  }
  drawing = false;
}