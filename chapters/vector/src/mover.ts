import { Vector } from "./vector";

export class Mover {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  topSpeed: number;

  constructor(x: number, y: number) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.topSpeed = 5;
  }

  update() {
    this.velocity.add(this.acceleration);

    const speed = this.velocity.mag();
    if (speed > this.topSpeed) {
      const ratio = this.topSpeed / speed;
      this.velocity.mul(ratio);
    }

    this.position.add(this.velocity);
    this.acceleration.mul(0);
  }

  applyForce(force: Vector) {
    // F = ma
    // 외부 힘이 물체의 가속도를 변화시킨다.
    // 변화한 가속도는 속도에 영향을 준다.
    this.acceleration.add(force);
  }

  checkEdges(width: number, height: number) {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }

    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }

  display(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
  }
}
