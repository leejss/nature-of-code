// modeling a vector

export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize() {
    const mag = this.mag();
    if (mag > 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  public add(other: Vector) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  public sub(other: Vector) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  public mult(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  
  // 벡터 복제 메서드 추가
  public copy() {
    return new Vector(this.x, this.y);
  }
}
