/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2022-01-02 12:36:40
 * @LastEditTime: 2022-01-06 18:20:11
 * @LastEditors: Yandong Hu
 * @Description: 
 */
const pkg = require('../../package.json')

module.exports = {
  base: '/MHDrawBoard/',
  title: pkg.name,
  description: pkg.description,
  themeConfig: {
    nav: [
      { text: '文档', link: '/' },
      { text: '背景', link: '/bg/'},
      { text: '特性', link: '/character/'},
      { text: '使用', link: '/use/'},
      { text: '目录', link: '/catalog/'},
      { text: '日志', link: '/log/'},
    ],
    sidebar: {
      '/': [
        { title: '背景', children: ['/bg/']},
        { title: '特性', children: ['/character/']},
        { title: '使用', children: [ '/use/']},
        { title: '目录', children: [ '/catalog/']},
        { title: '日志', children: [ '/log/']},
      ],
    },
    // 你的GitHub仓库，请正确填写
    repo: pkg.repository.url,
    // 自定义仓库链接文字。
    lastUpdated: 'Last Updated',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'dev',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    ...pkg.docThemeConfig
  }
}