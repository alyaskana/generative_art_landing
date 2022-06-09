let input;
let img;
let myCanvas;
let particles;
let n, s, maxR;


const ss = (f) => {
  f.setup = function () {
    let myArt = f.createCanvas(600, 600);
    // f.createCanvas(600, 600);
    // myCanvas.parent("art_sketch");
    f.background("#FFFFFF");
    f.smooth();

    n = 1000;
    s = 20;
    maxR = f.height / 2 - f.height / 10;

    particles = [];
    input = f.createFileInput(handleFile);
    input.parent('art_sketch')
    input.position(100, 100);
    input.id('art_input')

    document.getElementById('save_sketch').addEventListener('click', () => {
      f.saveCanvas(myArt, 'generative_art', 'jpg');
    })
  }

  f.draw = function () {
    f.translate(f.width / 2, f.height / 2);
    f.noStroke();
    if (!!img) {
      f.select('#label').addClass('hidden')
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
  // =======
  function newRandomVec() {
    vec = p5.Vector;
  }
  // ======
  function initParticles() {
    for (let i = 0; i < n; i++) {
      particles.push(new Particle(maxR, s));

      var p = particles[i];
      var x = f.int(f.map(p.pos.x, -maxR, maxR, 0, img.width));
      var y = f.int(f.map(p.pos.y, -maxR, maxR, 0, img.height));
      p.c = img.get(x, y);
    }
  }


  function handleFile(file) {
    if (file.type === 'image') {
      img = f.loadImage(file.data);
    } else {
      img = null;
    }
  }

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
      this.pos.mult(f.random(2, maxR));

      this.vel = f.createVector();
    }

    show() {
      f.fill(this.c);
      f.ellipse(this.pos.x, this.pos.y, this.s, this.s);
      this.life -= 1;
    }

    move() {
      var angle = f.noise(this.pos.x / 400, this.pos.y / 400) * f.TAU;

      this.vel.set(f.cos(angle), f.sin(angle));
      this.vel.mult(0.3);
      this.pos.add(this.vel);
    }


    isDead() {
      var d = f.dist(this.pos.x, this.pos.y, 0, 0);

      if (d > this.maxR || this.life < 1) return true;
      else return false;
    }
  }
}
let myp5 = new p5(ss, 'art_sketch');