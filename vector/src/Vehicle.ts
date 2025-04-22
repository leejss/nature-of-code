import { Vector } from "./vector";

export class Vehicle {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  maxSpeed: number;
  maxForce: number;
  r: number;
  color: string;

  constructor(x: number, y: number) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.r = 10; // 크기
    this.color = "#333";
  }

  seek(target: Vector) {
    const desired = new Vector(target.x, target.y).sub(this.position);
    const d = desired.mag();
    if (d < 100) {
      const m = (d / 100) * this.maxSpeed;
      desired.normalize().mul(m);
    } else {
      desired.normalize().mul(this.maxSpeed);
    }

    const steer = desired.sub(this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mul(0);
  }
  display(ctx: CanvasRenderingContext2D) {
    // 이동 방향에 따라 회전하는 삼각형 그리기
    const angle = this.velocity.heading();

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle);

    // 삼각형 그리기
    ctx.beginPath();
    ctx.moveTo(this.r * 2, 0);
    ctx.lineTo(-this.r, this.r);
    ctx.lineTo(-this.r, -this.r);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
