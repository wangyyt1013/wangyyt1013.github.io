const Y_AXIS = 1;
const STAR_STEP = 50;
const STAR_SIZE = 3;
const SUN_DIAM = 50;
var curMin = 0;
var curHeight, shade, i, j;

function setup() {
  createCanvas(800, 800);
}

function orbit(minute){
  return 60 + minute/60 * 700;
}

function draw() {
  if (minute() != curMin){
    curMin = minute();
    console.log(curMin);
  }

  // setting up global variables
  background(0);
  var c1 = color(132, 225, 255);
  var c2 = color(0, 0, 0)
  curHeight = (1 - hour()/24) * height;
  shade = color(255, 10 + hour() * 10, 0);

  // set background gradient
  setGradient(0, 0, width, curHeight, c1, c2, Y_AXIS);


  noStroke();
  fill(255);
  for (i = curHeight; i < height; i += STAR_STEP){
    for (j = 0; j < width; j += STAR_STEP){
      if ((i-curHeight)/50 % 2 == 0){
				if (Math.pow(i - height/2, 2) + Math.pow(j - width/2, 2) >
            Math.pow(orbit(minute())/2, 2)){
          circle(j, i, STAR_SIZE);
        }
			} else {
				if (Math.pow(i - height/2, 2) + Math.pow(j + STAR_STEP/2 - width/2, 2) >
            Math.pow(orbit(minute())/2, 2)){
          circle(j + STAR_STEP/2, i, STAR_SIZE);
        }
      }
    }
  }

  translate(width/2, height/2);

  // central circle
  fill(shade);
  ellipse(0, 0, SUN_DIAM, SUN_DIAM);

  // orbits and stars
  strokeWeight(1);
  for (i = 0; i < minute(); i++){
    noFill();
    rotate(PI*second()/60);

    stroke(shade);
    ellipse(0, 0, orbit(i), orbit(i));

    fill(255);
    stroke(0);
    circle(0, orbit(i)/2, STAR_SIZE);
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
