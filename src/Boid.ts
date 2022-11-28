import { default as Vector } from './Vector';

export default class Boid implements BasicBoid {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  constructor(options: BoidOptions) {
    this.position = new Vector(options.x, options.y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
  }
  applyForce = (vec: Vector) => {
    this.acceleration.add(vec);
  };
  move = () => {
    this.velocity.add(this.acceleration).maxLimit(5);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };
}
