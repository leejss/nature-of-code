export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  toString() {
    return `Vector(${this.x}, ${this.y})`;
  }

  add(v: Vector) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mul(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }
  div(s: number) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  normalize() {
    const mag = this.mag();
    if (mag !== 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  // 두 벡터사이의 내적
  static dot(v1: Vector, v2: Vector) {
    // 값과 부호를 통해서 두 벡터의 방향에 대한 정보를 얻을 수 있다.
    // 값이 양수이면 두 벡터의 방향이 같다는 것을 의미한다.
    // 값이 음수이면 두 벡터의 방향이 반대라는 것을 의미한다.
    // 값이 0이면 두 벡터가 수직이라는 것을 의미한다.
    return v1.x * v2.x + v1.y * v2.y;
  }

  static angleBetween(v1: Vector, v2: Vector) {
    const dot = Vector.dot(v1, v2); // 두 벡터의 내적
    const cosAngle = dot / (v1.mag() * v2.mag()); // 두 벡터의 내적을 두 벡터의 크기의 곱으로 나눈 값
    const clamped = Math.max(-1, Math.min(1, cosAngle)); // 값을 -1과 1 사이로 제한
    return Math.acos(clamped); // 각도를 반환
  }

  static toDegrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  static toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  static dist(v1: Vector, v2: Vector) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  heading() {
    return Math.atan2(this.y, this.x);
  }

  limit(max: number) {
    if (this.mag() > max) {
      this.normalize().mul(max);
    }
    return this;
  }
}
