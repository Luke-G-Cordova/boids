import Boid from '../src/boidModule.js';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let boid = new Boid({
    x: 100, y: 100
});
boid.moveInDirection(300);
boid.drawOnCanvas(ctx);