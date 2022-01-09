<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-11-17 14:06:12
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  created() {
    
  },
});
</script>

<style>
#app {
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
