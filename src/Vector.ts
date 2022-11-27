export class Vector implements BasicVector {
  private magnitude: number;
  constructor(public x: number, public y: number) {
    this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getMag = () => {
    this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    return this.magnitude;
  };

  calcMag = () => {
    this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    return this;
  };

  static add = (vec1: Vector, vec2: Vector) => {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
  };
  static sub = (vec1: Vector, vec2: Vector) => {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  };

  add = (vec: Vector | BasicVector) => {
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
    return this;
  };

  sub = (vec: Vector | BasicVector) => {
    this.x = this.x - vec.x;
    this.y = this.y - vec.y;
    return this;
  };

  mult = (scalar: number) => {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    return this;
  };

  div = (scalar: number) => {
    this.x = this.x / scalar;
    this.y = this.y / scalar;
    return this;
  };

  maxLimit = (scalar: number) => {
    const magSquared = this.x * this.x + this.y * this.y;
    if (magSquared > scalar * scalar) {
      this.x = (this.x / Math.sqrt(magSquared)) * scalar;
      this.y = (this.y / Math.sqrt(magSquared)) * scalar;
    }
    return this;
  };

  normalize = () => {
    this.calcMag();
    if (this.magnitude !== 0) {
      this.x = this.x * (1 / this.magnitude);
      this.y = this.y * (1 / this.magnitude);
    }
    return this;
  };

  clone = () => {
    return new Vector(this.x, this.y);
  };

  getAngle = () => {
    return Math.atan2(-this.y, this.x);
  };
}
