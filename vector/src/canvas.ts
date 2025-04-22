import { Mover } from "./mover";
import { Vector } from "./vector";
import { Vehicle } from "./Vehicle";
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

let mouseX = width / 2;
let mouseY = height / 2;

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});
const vehicles: Vehicle[] = [];
// 다양한 색상 배열 정의
const colors = [
  "#FF5252", // 빨강
  "#FF7043", // 주황
  "#FFCA28", // 노랑
  "#66BB6A", // 초록
  "#42A5F5", // 파랑
  "#7E57C2", // 보라
  "#EC407A", // 핑크
  "#26A69A", // 청록
  "#78909C", // 회청
  "#5D4037", // 갈색
];

for (let i = 0; i < 10; i++) {
  const v = new Vehicle(Math.random() * width, Math.random() * height);
  v.maxSpeed = 2 + Math.random() * 3; // 2~5 사이의 속도
  v.maxForce = 0.05 + Math.random() * 0.1; // 다양한 조향력
  // 색상 랜덤하게 할당
  v.color = colors[Math.floor(Math.random() * colors.length)];
  vehicles.push(v);
}

function draw() {
  ctx.fillStyle = "#242424";
  ctx.fillRect(0, 0, width, height);

  // mover.applyForce(gravity);
  // mover.update();
  // mover.checkEdges(width, height);
  // mover.display(ctx);

  // walker.step();
  // walker.display(ctx);

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  vehicles.forEach((vehicle) => {
    const target = new Vector(mouseX, mouseY);
    vehicle.seek(target);
    vehicle.update();
    vehicle.display(ctx);
  });
  requestAnimationFrame(draw);
}

draw();
