<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-19 11:59:58
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="container">
    <div class="title">
      <div class="head">MHDrawBoard</div>
      <div class="control">
        <div class="btn" @click="mouseDrawAction">鼠标</div>
        <div class="btn" @click="freeDrawAction">自由绘</div>
        <div class="btn" @click="drawCircleAction">圆形</div>
        <div class="btn" @click="drawRectAction">矩形</div>
        <div class="btn" @click="drawTriangleAction">三角形</div>
        <div class="btn" @click="drawLineAction">直线</div>
        <div class="btn" @click="drawTextAction">文字</div>
        <div class="btn" @click="clearAction">清空</div>
        <div class="btn" @click="undoAction">撤销</div>
        <div class="btn" @click="redoAction">重做</div>
        <div class="btn" @click="deleteTargetGraphAction">删除指定图形</div>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <div class="left-cont">
          <color-picker></color-picker>
        </div>
      </div>
      <div class="right">
        <div class="canv-box">
          <canvas id="canv"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Provide, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
import { DrowBoard } from "../../../MHDrawBoard/src/draw-board/draw-board";
import { DrawGraphType } from "../../../MHDrawBoard/src/draw-board/draw-graph";
import { DrawBoardState } from "../../services/state.services";
@Options({
  components: {},
})
export default class Home extends Vue {
  drawBoard!: DrowBoard;
  drawBoardState = DrawBoardState;
  @Watch('drawBoardState.color')
  boardColorChange(newV: string, oldV: string) {
    this.drawBoard.setColor(newV);
  }
  mounted() {
    this.drawCanvas("canv");
  }
  unmounted() {}

  drawCanvas(id: string) {
    const canvasObj = <HTMLCanvasElement>document.getElementById(id);
    this.drawBoard = new DrowBoard(id, { width: 800, height: 800 });
    window.addEventListener("resize", () => {
      const width = canvasObj!.parentElement!.parentElement!.offsetWidth;
      const height = canvasObj!.parentElement!.parentElement!.offsetHeight;
      this.drawBoard.setBounds({ width, height });
    });
  }

  /**
   * 屏蔽画板功能
   *
   */
  mouseDrawAction() {
    this.drawBoard.setDrawingMode(false);
    this.drawBoard.setEnableDraw(false);
  }
  /**
   * 自由绘
   */
  freeDrawAction() {
    this.drawBoard.setFreeDraw(true);
  }
  /**
   * 绘制圆形
   */
  drawCircleAction() {
    this.drawBoard.setDrawingMode(false);
    this.drawBoard.setEnableDraw(true);
    this.drawBoard.setCurrentDrawGraphType(DrawGraphType.Circle);
  }
  /**
   * 绘制矩形
   */
  drawRectAction() {
    this.drawBoard.setDrawingMode(false);
    this.drawBoard.setEnableDraw(true);
    this.drawBoard.setCurrentDrawGraphType(DrawGraphType.Rect);
  }
  /**
   * 绘制三角形
   */
  drawTriangleAction() {
    this.drawBoard.setDrawingMode(false);
    this.drawBoard.setEnableDraw(true);
    this.drawBoard.setCurrentDrawGraphType(DrawGraphType.Triangle);
  }
  /**
   * 绘制直线
   */
  drawLineAction() {
    this.drawBoard.setDrawingMode(false);
    this.drawBoard.setEnableDraw(true);
    this.drawBoard.setCurrentDrawGraphType(DrawGraphType.Line);
  }
  drawTextAction() {
    this.drawBoard.setDrawingMode(false);
    this.drawBoard.setEnableDraw(true);
    this.drawBoard.setCurrentDrawGraphType(DrawGraphType.Text);
  }
  /**
   * 清空画板
   */
  clearAction() {
    this.drawBoard.clear();
  }
  undoAction() {
    this.drawBoard.undo();
  }
  redoAction() {
    this.drawBoard.redo();
  }
  deleteTargetGraphAction() {
    this.drawBoard.setDeleteTargetGraphState();
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #343a40;
}
.canv-box {
  background-color: #fff;
  flex-grow: 1;
}

.title {
  display: flex;
  height: 50px;
  align-items: center;
  .head {
    width: 300px;
    margin: 0 10px;
    color: #fff;
    display: flex;
  }
  .control {
    display: flex;
    .btn {
      height: 30px;
      padding: 0px 10px;
      background-color: #409eff;
      margin: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      cursor: pointer;
      color: #fff;
      font-size: 13px;
    }
  }
}
.main {
  display: flex;
  flex-grow: 1;
  .left {
    width: 300px;
    margin: 0 10px;
    .left-cont {
      width: 100%;
      height: 100%;
      background-color: #1b1e21;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
</style>
