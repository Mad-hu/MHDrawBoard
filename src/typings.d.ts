/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-05 16:05:16
 * @LastEditTime: 2021-11-16 10:30:05
 * @LastEditors: Yandong Hu
 * @Description:
 */
declare var jscolor: any;
declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
