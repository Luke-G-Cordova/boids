import Boid from '../Boid';
import Vector from '../Vector';

const canvas = document.querySelector('#myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const amount = 500;
const flock: Boid[] = [];
for (let i = 0; i < amount; i++) {
  flock.push(
    new Boid({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    })
  );
  flock[i].applyForce(Vector.createRandom(-1, 1));
}

if (ctx != null) {
  setInterval(() => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < amount; i++) {
      let avgPos = new Vector(0, 0);
      let avgDir = new Vector(0, 0);
      let count = 0;
      for (let j = 0; j < amount; j++) {
        if (i != j && flock[i].position.distance(flock[j].position) <= 200) {
          avgPos.add(flock[j].position);
          avgDir.add(flock[j].velocity);
          count++;
        }
      }
      if (count > 0) {
        avgPos.div(count);
        avgDir.div(count);
        flock[i].applyForce(avgPos.sub(flock[i].position).mult(0.001));
        flock[i].applyForce(avgDir.mult(0.1));
      }

      flock[i].move();
      drawCircle(flock[i]);
      walls(flock[i]);
    }
  }, 1);
}

function drawCircle(boid: Boid) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(boid.position.x, boid.position.y, 5, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}
function walls(boid: Boid) {
  if (boid.position.x > canvas.width) {
    boid.position.x = 0;
  } else if (boid.position.x < 0) {
    boid.position.x = canvas.width;
  }
  if (boid.position.y > canvas.height) {
    boid.position.y = 0;
  } else if (boid.position.y < 0) {
    boid.position.y = canvas.height;
  }
}
