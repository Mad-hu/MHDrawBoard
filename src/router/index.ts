/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 11:21:31
 * @LastEditTime: 2021-11-10 11:17:10
 * @LastEditors: Yandong Hu
 * @Description:
 */
// import store from "../store";
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes: [
    { path: "/", redirect: "/Home" },
    {
      path: "/Home",
      name: "Home",
      component: () => import("@/pages/Home/Home.vue"),
    }
  ],
});

// router.beforeEach((to) => {
//   if (to.meta.needLogin && !store.getters["user/isLogin"]) {
//     return "/login";
//   }
//   return true;
// });

export default router;
