/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-10-29 10:09:35
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import 'normalize.css/normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './global.config.scss';
const app = createApp(App);

// 注入路由
app.use(router).use(ElementPlus);

// 挂载实例
app.mount("#app");
