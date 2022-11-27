import { default as Vector } from './Vector';

export default class Boid {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  constructor(options: BoidOptions) {
    this.position = new Vector(options.x, options.y);
    this.velocity = Vector.createRandom(-1, 1);
    this.acceleration = new Vector(0, 0);
  }
  applyForce = (vec: Vector) => {
    this.acceleration.add(vec);
  };
  move = () => {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };
}
