const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d")!;
const dpr = window.devicePixelRatio;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;
ctx.scale(dpr, dpr);
export { canvas, ctx };
