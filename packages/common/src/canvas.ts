export class CanvasManager {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;

  /**
   * CanvasManager 생성자
   * @param canvasId 캔버스 요소의the ID (선택적). 제공되지 않으면 새 캔버스 생성
   */
  constructor(canvasId?: string) {
    // 캔버스 요소를 ID로 찾거나 없으면 새로 생성
    if (canvasId) {
      const existingCanvas = document.getElementById(
        canvasId,
      ) as HTMLCanvasElement | null;
      if (existingCanvas) {
        this.canvas = existingCanvas;
      } else {
        this.canvas = document.createElement("canvas");
        this.canvas.id = canvasId;
        document.body.appendChild(this.canvas);
      }
    } else {
      this.canvas = document.createElement("canvas");
      document.body.appendChild(this.canvas);
    }

    // 컨텍스트 가져오기
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("캔버스 컨텍스트를 가져올 수 없습니다.");
    }
    this.ctx = context;

    // 디스플레이 속성 설정
    this.dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // 초기 크기 설정
    this.resize();

    // 윈도우 크기 변경 이벤트 리스너
    window.addEventListener("resize", () => this.resize());
  }

  /**
   * 캔버스 크기를 브라우저 윈도우에 맞게 조정
   */
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // 레티나 디스플레이 지원을 위한 크기 설정
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    // 컨텍스트 스케일 조정
    this.ctx.scale(this.dpr, this.dpr);
  }

  /**
   * 캔버스를 지정된 색상으로 지움
   * @param color 배경색 (기본값: "#242424")
   */
  clear(color = "#242424") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * 마우스 위치 추적 설정
   * @returns 마우스 위치를 담은 객체 {x, y}
   */
  setupMouseTracking() {
    const mousePos = { x: this.width / 2, y: this.height / 2 };

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;
    });

    return mousePos;
  }
}
