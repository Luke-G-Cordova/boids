interface BasicVector {
  x: number;
  y: number;
}
interface BasicBoid {
  position: BasicVector;
  velocity: BasicVector;
  acceleration: BasicVector;
}
interface BoidOptions {
  x: number;
  y: number;
}
