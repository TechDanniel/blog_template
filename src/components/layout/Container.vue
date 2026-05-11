<script setup lang="ts">
import FloatingParticles from '@/components/FloatingParticles.vue'

</script>

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
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

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
}

:deep(.el-main) {
  padding: 0;
}
</style>