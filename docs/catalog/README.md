### 目录

```bash
|-- build目录下
  |--build.js // 打包生产配置
  |--loaders.js // loader安装后配置
  |--optimization.js // 优化配置
  |--plugin.js // plugin安装后配置
  |--start.js // 本地开发配置
  |--utils.js // 工具，e.g. 处理路径的函数
  |--webpack.config.js // webpack公共配置

|-- docs 文档目录
  |-- .vuepress 文档

|--src目录
  |-- lib
    |--index.ts // 轮子入口
    |--math.ts
    |--xxx.ts // 其他

|-- deploy.sh用于发布工具文档上github // deploy.sh "feat:增加文档功能" "feat:增加文档功能"
|-- package.json //"docThemeConfig": {} //配置vuepress文档主题
|-- zen.config.js // 自定义配置
```