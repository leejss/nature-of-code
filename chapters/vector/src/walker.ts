import { Vector } from "./vector";

export class Walker {
  position: Vector;
  history: Vector[];

  constructor(x: number, y: number) {
    this.position = new Vector(x, y);
    this.history = []; // 이동 경로 저장
  }

  step() {
    // 현재 위치 저장
    this.history.push(this.position.copy());

    // 이동 경로 제한
    if (this.history.length > 500) {
      this.history.shift();
    }

    // 랜덤 방향 벡터 생성 (-1 ~ 1 범위)
    const step = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);

    // 위치 업데이트
    this.position.add(step);
  }

  display(ctx: CanvasRenderingContext2D) {
    // 이동 경로 그리기
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 255, 0.2)";
    ctx.lineWidth = 1;

    for (let i = 0; i < this.history.length; i++) {
      const pos = this.history[i];
      if (i === 0) {
        ctx.moveTo(pos.x, pos.y);
      } else {
        ctx.lineTo(pos.x, pos.y);
      }
    }

    ctx.stroke();

    // 현재 위치 그리기
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
