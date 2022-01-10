<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-11-19 11:59:58
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="color-picker">
    <input
      class="picker"
      value="rgba(255,19,19,1)"
      data-jscolor="{}"
      @change="changeValue"
    />
  </div>
</template>

<script lang="ts">
import { Options, Provide, Vue, Watch } from "vue-property-decorator";
import { DrawBoardState } from "../../services/state.services";
@Options({
  components: {},
})
export default class Home extends Vue {
  drawBoardState = DrawBoardState;
  mounted() {
    jscolor.presets.default = {
      width: 201,
      height: 81,
      position: "right",
      previewPosition: "left",
      backgroundColor: "#f3f3f3",
      borderColor: "#bbbbbb",
      controlBorderColor: "#bbbbbb",
      palette: [
        "#000000","#7d7d7d","#870014","#ec1c23","#ff7e26","#fef100","#22b14b","#00a1e7","#3f47cc","#a349a4",
        "#ffffff","#c3c3c3","#b87957","#feaec9","#ffc80d","#eee3af","#b5e61d","#99d9ea","#7092be","#c8bfe7",
      ],
      paletteCols: 10,
      hideOnPaletteClick: true,
    };
    jscolor.install();
  }
  unmounted() {}
  changeValue(e: InputEvent) {
    const colorPicker = <HTMLInputElement>e.target;

    this.drawBoardState.color = colorPicker.value;
    console.log(this.drawBoardState.color);
  }
}
</script>

<style lang="less" scoped>
.color-picker {
  .picker {
    border: none;
    border-radius: 3px;
    height: 30px;
    width: 205px;
    cursor: pointer;
  }
}
</style>
