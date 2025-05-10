import { CanvasManager } from "@noc/common";
import { Mover } from "./mover";
import { Vector } from "./vector";
import { Vehicle } from "./Vehicle";
import { Walker } from "./walker";

// 공통 모듈 사용하여 캔버스 매니저 인스턴스 생성
const canvasManager = new CanvasManager("canvas");
const { ctx, canvas, width, height } = canvasManager;

// 마우스 위치 추적 설정
const mousePos = canvasManager.setupMouseTracking();

const mover = new Mover(width / 2, height / 2);
const gravity = new Vector(0, 0.1);
const walker = new Walker(width / 2, height / 2);

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

const vehicles: Vehicle[] = [];
for (let i = 0; i < 10; i++) {
  const v = new Vehicle(Math.random() * width, Math.random() * height);
  v.maxSpeed = 2 + Math.random() * 3; // 2~5 사이의 속도
  v.maxForce = 0.05 + Math.random() * 0.1; // 다양한 조향력
  // 색상 랜덤하게 할당
  v.color = colors[Math.floor(Math.random() * colors.length)];
  vehicles.push(v);
}

function draw() {
  // 캔버스 초기화
  canvasManager.clear("#242424");

  // mover.applyForce(gravity);
  // mover.update();
  // mover.checkEdges(width, height);
  // mover.display(ctx);

  // walker.step();
  // walker.display(ctx);

  // 마우스 포인터 표시
  ctx.beginPath();
  ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();

  // Vehicle 업데이트 및 표시
  vehicles.forEach((vehicle) => {
    const target = new Vector(mousePos.x, mousePos.y);
    vehicle.seek(target);
    vehicle.update();
    vehicle.display(ctx);
  });

  requestAnimationFrame(draw);
}

draw();
