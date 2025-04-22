import { Mover } from "./mover";
import { Vector } from "./vector";
import { Walker } from "./walker";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const dpr = window.devicePixelRatio || 1;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;
const width = window.innerWidth;
const height = window.innerHeight;

// CSS로 설정된 크기 유지하기 위해 스타일 조정
// canvas.style.width = `${window.innerWidth}px`;
// canvas.style.height = `${window.innerHeight}px`;

const mover = new Mover(width / 2, height / 2);
const gravity = new Vector(0, 0.1);
const walker = new Walker(width / 2, height / 2);

function draw() {
  ctx.fillStyle = "#242424";
  ctx.fillRect(0, 0, width, height);

  mover.applyForce(gravity);
  mover.update();
  mover.checkEdges(width, height);
  mover.display(ctx);

  walker.step();
  walker.display(ctx);

  requestAnimationFrame(draw);
}

draw();
