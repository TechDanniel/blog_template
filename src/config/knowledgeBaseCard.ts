const docsBase = import.meta.env.DEV ? 'http://localhost:5174/docs' : '/docs'
export const knowledgeBases = [
    {
      id: 1,
      name: '前端开发指南',
      description: 'React、Vue、TypeScript 等前端技术栈学习资料',
      category: '技术',
      lastUpdated: '2小时前',
      icon: '🌟',
      color: 'from-blue-400 to-cyan-400',
      docLink: `${docsBase}/kb/frontend/`
    },
    {
      id: 2,
      name: '产品设计规范',
      description: 'UI/UX 设计原则、组件库和设计系统',
      category: '设计',
      lastUpdated: '5小时前',
      icon: '🎨',
      color: 'from-purple-400 to-pink-400',
      docLink: `${docsBase}/kb/design/`
    },
    {
      id: 3,
      name: '项目管理手册',
      description: '敏捷开发、团队协作和项目管理最佳实践',
      category: '管理',
      lastUpdated: '1天前',
      icon: '📋',
      color: 'from-green-400 to-emerald-400',
      docLink: `${docsBase}/kb/pm/`
    },
  ];