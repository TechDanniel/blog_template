<template>
  <div class="page-container">
    <FloatingParticles />

    <el-container class="layout-container">
      <!-- 顶部 Header -->
      <el-header class="layout-header">
        <Header/>
      </el-header>

      <!-- 中间主体区域 -->
      <el-container class="layout-body">
        <!-- 左侧边栏 -->
        <el-aside class="layout-aside-left">
          <Sidebar />
        </el-aside>

        <!-- 中间内容 -->
        <el-main class="layout-main">
          <div class="main-header">
            <div>
              <h2>我的知识库</h2>
              <p class="desc">共 {{ knowledgeBases.length }} 个知识库</p>
            </div>
            <div class="action-buttons">
              <el-button type="primary">
                <el-icon><Filter /></el-icon>
              </el-button>
              <el-button type="primary">
                <el-icon><Plus /></el-icon>
              </el-button>
            </div>
          </div>

          <div class="card-list">
            <Card
              v-for="kb in knowledgeBases"
              :key="kb.id"
              v-bind="kb"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  Plus, Filter
} from '@element-plus/icons-vue'
import Card from '@/components/Card.vue'
import FloatingParticles from '@/components/FloatingParticles.vue'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'


// 模拟数据
const knowledgeBases = [
    {
      id: 1,
      name: '前端开发指南',
      description: 'React、Vue、TypeScript 等前端技术栈学习资料',
      category: '技术',
      lastUpdated: '2小时前',
      icon: '🌟',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 2,
      name: '产品设计规范',
      description: 'UI/UX 设计原则、组件库和设计系统',
      category: '设计',
      lastUpdated: '5小时前',
      icon: '🎨',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 3,
      name: '项目管理手册',
      description: '敏捷开发、团队协作和项目管理最佳实践',
      category: '管理',
      lastUpdated: '1天前',
      icon: '📋',
      color: 'from-green-400 to-emerald-400'
    },
  ];

</script>

<style scoped>
/* 全局页面容器 */
.page-container {
  position: relative;
  min-height: 100vh;
  background: var(--page-background);
  transition: all 0.3s;
  overflow: hidden;
}

/* Element 布局容器 */
.layout-container {
  height: 100vh;
}

/* 顶部 Header */
.layout-header {
  position: relative;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(20px);
  background: var(--header-background);
  border-bottom: var(--header-border-bottom);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

/* 中间主体 */
.layout-body {
  z-index: 10;
  display: flex;
}

/* 左侧边栏 */
.layout-aside-left {
  width: 220px;
  background: transparent;
}

/* 主内容区 */
.layout-main {
  background: transparent;
  padding: 32px;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.desc {
  color: var(--desc);
  margin: 4px 0 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>