let input;
let img;
let myCanvas;
let particles;
let n, s, maxR;


function setup() {
  let myCanvas = createCanvas(600, 600);
  myCanvas.parent("art_sketch");
  background("#FFFFFF");
  smooth();

  n = 1000;
  s = 20;
  maxR = height / 2 - height / 10;

  particles = [];
  input = createFileInput(handleFile);
  input.parent('art_sketch')
  input.position(100, 100);
  input.id('art_input')
}

function draw() {
  translate(width / 2, height / 2);
  noStroke();
  if (!!img) {
    select('#label').addClass('hidden')
    if (s > 1) {
      if (particles.length != 0) {
        for (let i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.show();
          p.move();

          if (p.isDead()) particles.splice(i, 1);
        }
      } else {
        s -= 2;
        initParticles();
      }
    }
  }
}

function initParticles() {
  for (let i = 0; i < n; i++) {
    particles.push(new Particle(maxR, s));

    var p = particles[i];
    var x = int(map(p.pos.x, -maxR, maxR, 0, img.width));
    var y = int(map(p.pos.y, -maxR, maxR, 0, img.height));
    p.c = img.get(x, y);
  }
}


function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data);
  } else {
    img = null;
  }
}

document.getElementById('save_sketch').addEventListener('click', () => {
  saveCanvas(myCanvas, 'generative_art', 'jpg');
})

class Particle {

  constructor(maxR_, s_) {
    this.s = s_;
    this.c = "";
    this.maxR = maxR_;

    this.life = 100;

    this.init();
  }

  init() {
    this.pos = p5.Vector.random2D();
    this.pos.normalize();
    this.pos.mult(random(2, maxR));

    this.vel = createVector();
  }

  show() {
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.s, this.s);
    this.life -= 1;
  }

  move() {
    var angle = noise(this.pos.x / 400, this.pos.y / 400) * TAU;

    this.vel.set(cos(angle), sin(angle));
    this.vel.mult(0.3);
    this.pos.add(this.vel);
  }


  isDead() {
    var d = dist(this.pos.x, this.pos.y, 0, 0);

    if (d > this.maxR || this.life < 1) return true;
    else return false;
  }
}