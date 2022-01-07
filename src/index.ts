/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2022-01-02 11:38:49
 * @LastEditTime: 2022-01-07 17:09:36
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import { DrowBoard } from "./draw-board/draw-board";
import { DrawGraphType } from "./draw-board/draw-graph";

let drawBoard: DrowBoard;


function drawCanvas(id: string) {
  drawBoard = new DrowBoard(id, {width: 800, height: 800});
}

function handleUI(){
  const mouseDraw = document.getElementById('mouseDraw');
  const freeDraw = document.getElementById('freeDraw');
  const drawCircle = document.getElementById('drawCircle');
  const drawRect = document.getElementById('drawRect');
  const drawTriangle = document.getElementById('drawTriangle');
  const drawLine = document.getElementById('drawLine');
  const drawText = document.getElementById('drawText');

  const clear = document.getElementById('clear');
  const undo = document.getElementById('undo');
  const redo = document.getElementById('redo');
  const deleteTargetGraph = document.getElementById('deleteTargetGraph');
  
  mouseDraw.addEventListener('click', mouseDrawAction);
  freeDraw.addEventListener('click', freeDrawAction);
  drawCircle.addEventListener('click', drawCircleAction);
  drawRect.addEventListener('click', drawRectAction);
  drawTriangle.addEventListener('click', drawTriangleAction);
  drawLine.addEventListener('click', drawLineAction);
  drawText.addEventListener('click', drawTextAction);
  
  clear.addEventListener('click', clearAction);
  undo.addEventListener('click', undoAction);
  redo.addEventListener('click', redoAction);

  deleteTargetGraph.addEventListener('click', deleteTargetGraphAction);
}

/**
 * 屏蔽画板功能
 *
 */
function mouseDrawAction() {
  drawBoard.setDrawingMode(false);
  drawBoard.setEnableDraw(false);
}
/**
 * 自由绘
 */
function freeDrawAction() {
  drawBoard.setFreeDraw(true);
}
/**
 * 绘制圆形
 */
function drawCircleAction() {
  drawBoard.setDrawingMode(false);
  drawBoard.setEnableDraw(true);
  drawBoard.setCurrentDrawGraphType(DrawGraphType.Circle);
}
/**
 * 绘制矩形
 */
function drawRectAction() {
  drawBoard.setDrawingMode(false);
  drawBoard.setEnableDraw(true);
  drawBoard.setCurrentDrawGraphType(DrawGraphType.Rect);
}
/**
 * 绘制三角形
 */
function drawTriangleAction() {
  drawBoard.setDrawingMode(false);
  drawBoard.setEnableDraw(true);
  drawBoard.setCurrentDrawGraphType(DrawGraphType.Triangle);
}
/**
 * 绘制直线
 */
function drawLineAction() {
  drawBoard.setDrawingMode(false);
  drawBoard.setEnableDraw(true);
  drawBoard.setCurrentDrawGraphType(DrawGraphType.Line);
}
function drawTextAction() {
  drawBoard.setDrawingMode(false);
  drawBoard.setEnableDraw(true);
  drawBoard.setCurrentDrawGraphType(DrawGraphType.Text);
}
/**
 * 清空画板
 */
 function clearAction() {
  drawBoard.clear();
}
function undoAction() {
  drawBoard.undo();
}
function redoAction() {
  drawBoard.redo();
}
function deleteTargetGraphAction() {
  drawBoard.setDeleteTargetGraphState();
}
drawCanvas('canv');
handleUI();