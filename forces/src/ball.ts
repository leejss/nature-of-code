import { Vector } from "./vector";

export class Ball {
  private readonly position: Vector;
  private readonly velocity: Vector;
  private readonly acceleration: Vector;
  private readonly mass: number;

  constructor(x: number, y: number, mass: number) {
    this.position = new Vector(x, y); // position
    this.velocity = new Vector(0, 0); // velocity
    this.acceleration = new Vector(0, 0); // acceleration
    this.mass = mass;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force: Vector) {
    // F = m * a -> a = F / m
    const f = force.copy(); // 원본 벡터를 변경하지 않기 위해 복사
    f.mult(1 / this.mass); // 질량으로 나누어 가속도 계산
    this.acceleration.add(f);
  }

  checkEdge(width: number, height: number) {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    }

    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }

    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    }

    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }

  display(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.mass, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }
}
