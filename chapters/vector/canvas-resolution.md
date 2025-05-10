# Canvas 해상도 최적화 가이드

## 1. Canvas 해상도 문제

웹에서 Canvas를 사용할 때 기본 해상도는 종종 흐릿한 그래픽으로 이어집니다. 특히 고해상도 디스플레이(예: Retina 디스플레이)에서 이 문제가 두드러집니다. 이는 Canvas의 픽셀과 디스플레이의 물리적 픽셀 사이의 불일치 때문입니다.

## 2. 디바이스 픽셀 비율(DPR)의 이해

디바이스 픽셀 비율(Device Pixel Ratio, DPR)은 CSS 픽셀과 물리적 픽셀 간의 비율입니다:

- **CSS 픽셀**: 웹 레이아웃에서 사용되는 논리적 단위
- **물리적 픽셀**: 화면에 실제로 표시되는 디스플레이의 픽셀

예를 들어:

- 표준 디스플레이: DPR = 1 (1 CSS 픽셀 = 1 물리적 픽셀)
- Retina 디스플레이: DPR = 2 (1 CSS 픽셀 = 4 물리적 픽셀, 2x2)
- 일부 고해상도 모바일: DPR = 3 또는 그 이상

## 3. Canvas 해상도 최적화 방법

Canvas 해상도를 최적화하는 기본 접근 방식은 다음과 같습니다:

```javascript
// 1. Canvas 요소 가져오기
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 2. 디바이스 픽셀 비율 확인
const dpr = window.devicePixelRatio || 1;

// 3. 현재 Canvas 크기 백업 (CSS 크기)
const styleWidth = canvas.clientWidth || window.innerWidth;
const styleHeight = canvas.clientHeight || window.innerHeight;

// 4. Canvas 속성 크기를 DPR에 맞게 조정
canvas.width = styleWidth * dpr;
canvas.height = styleHeight * dpr;

// 5. CSS 크기 유지 (중요!)
canvas.style.width = `${styleWidth}px`;
canvas.style.height = `${styleHeight}px`;

// 6. 컨텍스트 스케일 조정
ctx.scale(dpr, dpr);
```

## 4. 핵심 개념 설명

### 왜 이 방법이 효과가 있는가?

1. **물리적 해상도 증가**: canvas.width와 canvas.height가 DPR에 따라 증가함으로써, 더 많은 물리적 픽셀을 사용할 수 있습니다.
2. **스타일 크기 유지**: canvas.style.width와 canvas.style.height를 원래 크기로 유지함으로써 Canvas가 레이아웃에서 차지하는 공간은 변하지 않습니다.
3. **컨텍스트 스케일링**: ctx.scale(dpr, dpr)로 그리기 작업을 DPR에 맞게 스케일링하여, CSS 픽셀 기준으로 작업할 수 있게 합니다.

### 주의사항

1. **성능 고려**: 높은 DPR은 더 많은 픽셀을 처리해야 함을 의미합니다. 복잡한 애니메이션이나 그래픽에서는 성능 문제가 발생할 수 있습니다.
2. **좌표 계산**: 모든 좌표 계산은 CSS 픽셀로 이루어지므로, 마우스 이벤트 등에서는 별도의 변환이 필요하지 않습니다.

## 5. 반응형 처리

화면 크기 변경에 대응하려면 resize 이벤트 핸들러를 추가하는 것이 좋습니다:

```javascript
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const styleWidth = window.innerWidth;
  const styleHeight = window.innerHeight;
  
  canvas.width = styleWidth * dpr;
  canvas.height = styleHeight * dpr;
  
  canvas.style.width = `${styleWidth}px`;
  canvas.style.height = `${styleHeight}px`;
  
  ctx.scale(dpr, dpr);
}

window.addEventListener('resize', resizeCanvas);
```

## 6. 실제 사용 예제

```typescript
// canvas.ts
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const dpr = window.devicePixelRatio || 1;

// Canvas 크기 설정
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);

// CSS 스타일 유지
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

// 실제 작업에 사용할 크기 변수 (CSS 픽셀 기준)
const width = window.innerWidth;
const height = window.innerHeight;

function draw() {
  // 여기서 그리기 작업을 수행
  // width와 height는 CSS 픽셀 기준입니다
}
```

이 방법을 통해 어떤 디스플레이에서든 선명하고 깨끗한 Canvas 그래픽을 구현할 수 있습니다.
