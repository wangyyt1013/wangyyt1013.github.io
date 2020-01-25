const Y_AXIS = 1;
var i, j;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  var c1 = color(132, 225, 255);
  var c2 = color(0, 0, 0)
  var curHeight = (1 - hour()/24) * height;

  setGradient(0, 0, width, curHeight, c1, c2, Y_AXIS);
  noStroke();
  fill(255);
  for (i = curHeight; i < height; i += 50){
    for (j = 0; j < width; j += 50){
      if (Math.pow(i - 400, 2) + Math.pow(j - 400, 2) > Math.pow((60 + minute()/60 * 700)/2, 2)){
        if ((i-curHeight)/50 % 2 == 0){
          circle(j, i, 5);
        } else {
          circle(j + 25, i, 5);
        }
      }
    }
  }

  translate(400, 400);

  var shade = 10 + hour() * 10;
  fill(shade, shade, 0);
  ellipse(0, 0, 50, 50);

  strokeWeight(1);
  for (i = 0; i < minute(); i++){
    let rad = 60 + i/60 * 700;
    noFill();
    rotate(PI*second()/60);

    stroke(shade, shade, 0);
    ellipse(0, 0, rad, rad);

    fill(255);
    stroke(0);
    circle(0, rad/2, 5);
  }

}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
