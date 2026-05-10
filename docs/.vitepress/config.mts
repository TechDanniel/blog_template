import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '知识库',
  description: '知识库文档站（VitePress）',

  // 生产环境建议挂在 /docs/ 下；本地 `vitepress dev` 访问仍是 http://localhost:5174/
  base: '/docs/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: {
      '/kb/frontend/': [
        { text: '前端开发指南', items: [
          { text: '概览', link: '/kb/frontend/' },
          { text: 'Vue & TypeScript', link: '/kb/frontend/vue-ts' },
        ] },
      ],
      '/kb/design/': [
        { text: '产品设计规范', items: [
          { text: '概览', link: '/kb/design/' },
        ] },
      ],
      '/kb/pm/': [
        { text: '项目管理手册', items: [
          { text: '概览', link: '/kb/pm/' },
        ] },
      ],
    },

    socialLinks: [],
  },
})
