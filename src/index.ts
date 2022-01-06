// import { fabric } from "fabric";
// import { DrawGraphType, DrowGraph } from "./draw-board/draw-graph";

// let canvasDrawBoard: fabric.Canvas;
// let selectGroupState = false;
// var mouseFrom = {x: 0, y:0},
//     mouseTo = {x: 0, y:0};
// let drawRectState = false;
// const drawArr = [];
// let currentDraw:fabric.Rect | fabric.Circle | fabric.Triangle = null;


//     //坐标转换
// function transformMouse(mouseX: number, mouseY: number) {
// return { x: mouseX , y: mouseY  };
// }

// function drawCanvas(id: string) {
//   canvasDrawBoard = new fabric.Canvas(id, {
//     width: 800,
//     height: 800
//   });
//   const drawGraph = new DrowGraph();
//   let rectangle = drawGraph.createRectangle();
//   const circle = drawGraph.createCircle();
//   const triangle = drawGraph.createTriangle();
//   triangle.fill = '#ff9933';

//   canvasDrawBoard.add(rectangle, circle, triangle);
//   canvasDrawBoard.on('mouse:down', (options) => {
//     console.log('mouse:down',options.e.clientX, options.e.clientY, options.e.target);
//     var xy = transformMouse(options.e.offsetX, options.e.offsetY);
//     mouseFrom.x = xy.x;
//     mouseFrom.y = xy.y;
//     drawRectState = true;
//   });
//   canvasDrawBoard.on('mouse:up', (options) => {
//     console.log('mouse:up', options.e.clientX, options.e.clientY);
//     var xy = transformMouse(options.e.offsetX, options.e.offsetY);
//     mouseTo.x = xy.x;
//     mouseTo.y = xy.y;
//     drawRectState = false;
//   });
//   canvasDrawBoard.on('mouse:move', (options) => {
//     if(!drawRectState) {
//       return;
//     }
//     console.log('mouse:move',options.e.clientX, options.e.clientY, options.e.target);
//     const target = <HTMLCanvasElement>options.e.target;
//     if(['crosshair','n-resize','w-resize','s-resize','e-resize','se-resize','ne-resize', 'sw-resize','nw-resize','move'].includes(target.style.cursor)) {
//       return;
//     }
//     var xy = transformMouse(options.e.offsetX, options.e.offsetY);

//     mouseTo.x = xy.x;
//     mouseTo.y = xy.y;

//     var left = mouseFrom.x,
//     top = mouseFrom.y;
//     const bounds = {left: left, top: top, width: mouseTo.x - left, height: mouseTo.y - top};
//     canvasDrawBoard.remove(circle);
//     circle.set(bounds);
//     canvasDrawBoard.add(circle);
//   });
  

//   // canvasDrawBoard.isDrawingMode = true;
// }

// function handleUI(){
//   const rerenderDraw = document.getElementById('rerenderDraw');
//   const drawCircle = document.getElementById('drawCircle');
//   const drawRect = document.getElementById('drawRect');
//   const drawTriangle = document.getElementById('drawTriangle');
//   const selectGroup = document.getElementById('selectGroup');
//   rerenderDraw.addEventListener('click', handlerRerenderDraw);
//   selectGroup.addEventListener('click', changeBounds);
// }
// function handlerRerenderDraw() {
//   console.log('renderAll');
//   canvasDrawBoard.renderAll();
// }
// // 是否支持组选择
// function handleSelectGroup() {
//   console.log('handleSelectGroup:', !selectGroupState);
//   canvasDrawBoard.selection = !selectGroupState;
//   selectGroupState = !selectGroupState;
// }

// function changeBounds() {
//   canvasDrawBoard.setWidth(500);
// }
// drawCanvas('canv');
// handleUI();
import { DrowBoard } from "./draw-board/draw-board";
import { DrawGraphType } from "./draw-board/draw-graph";

let drawBoard: DrowBoard;


function drawCanvas(id: string) {
  drawBoard = new DrowBoard(id, {width: 800, height: 800});
  drawBoard.setDrawingMode(true);
}

function handleUI(){
  const rerenderDraw = document.getElementById('rerenderDraw');
  const drawCircle = document.getElementById('drawCircle');
  const drawRect = document.getElementById('drawRect');
  const drawTriangle = document.getElementById('drawTriangle');
  const selectGroup = document.getElementById('selectGroup');
  drawCircle.addEventListener('click', setDrawCircle);
  // selectGroup.addEventListener('click', changeBounds);
}

// function 
function setDrawCircle() {
  drawBoard.setDrawingMode(false);
  drawBoard.setCurrentDrawGraphType(DrawGraphType.Circle);
}


drawCanvas('canv');
handleUI();