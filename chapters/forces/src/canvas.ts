import { CanvasManager } from '@noc/common';

// 공통 모듈을 사용하여 캔버스 매니저 인스턴스 생성
const canvasManager = new CanvasManager();
const { canvas, ctx, width, height } = canvasManager;

// 외부에서 사용할 수 있도록 내보내기
export { canvas, ctx, width, height, canvasManager };

