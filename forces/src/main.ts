import { Ball } from "./ball";
import { canvas, ctx } from "./canvas";
import { Vector } from "./vector";

const body = document.body;
body.appendChild(canvas);

// 공 생성 (x, y, 질량)
const ball = new Ball(window.innerWidth / 2, window.innerHeight / 2, 20);

// 중력 벡터 생성
const gravity = new Vector(0, 0.2);

// 바람 벡터 (가끔 적용할 수 있음)
// const wind = new Vector(0.1, 0);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 공에 중력 적용
  ball.applyForce(gravity);

  // 가끔 바람 적용 (랜덤하게)
  // if (Math.random() < 0.05) {
  //   ball.applyForce(wind);
  // }

  // 마찰력 적용
  const friction = ball.velocity.copy();
  friction.normalize();
  friction.mult(-1);
  friction.mult(0.1);
  ball.applyForce(friction);

  // 공 업데이트 및 화면 경계 체크
  ball.update();
  ball.checkEdge(window.innerWidth, window.innerHeight);

  // 공 표시
  ball.display(ctx);

  requestAnimationFrame(draw);
}

draw();
