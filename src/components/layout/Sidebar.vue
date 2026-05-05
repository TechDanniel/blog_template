<template>
  <div class="sidebar-panel">
    <div class="sidebar-inner">
      <el-input
        v-model="keyword"
        class="sidebar-search"
        placeholder="搜索知识库..."
        clearable
      >
        <template #prefix>
          <Search class="prefix-icon" />
        </template>
      </el-input>

      <el-menu
        :default-active="active"
        class="sidebar-menu"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <el-menu-item index="all">
          <el-icon><Collection /></el-icon>
          <span>全部知识库</span>
        </el-menu-item>
        <el-menu-item index="recent">
          <el-icon><Clock /></el-icon>
          <span>最近更新</span>
        </el-menu-item>
        <el-menu-item index="tags">
          <el-icon><PriceTag /></el-icon>
          <span>标签</span>
        </el-menu-item>
        <el-menu-item index="explore" disabled>
          <el-icon><Compass /></el-icon>
          <span>探索</span>
        </el-menu-item>
      </el-menu>

      <el-button class="create-btn" type="primary" round>
        <Plus class="btn-icon" />
        新建
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Search,
  Plus,
  Clock,
  PriceTag,
  Collection,
  Compass,
} from '@element-plus/icons-vue'

const keyword = ref('')
const active = ref('all')
const isCollapse = ref(false)

const handleSelect = (key: string) => {
  active.value = key
}
</script>

<style scoped>
.sidebar-panel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-right: var(--sidebar-border);
  backdrop-filter: blur(12px);
  background-color: var(--sidebar-panel-background);
}

.sidebar-panel::before {
  content: '';
  position: absolute;
  inset: -2px;
  pointer-events: none;
  opacity: 0.95;
  background:
    radial-gradient(240px 220px at 30% 18%, rgba(59, 130, 246, 0.22) 0%, transparent 70%),
    radial-gradient(240px 220px at 78% 24%, rgba(34, 211, 238, 0.18) 0%, transparent 70%),
    radial-gradient(1px 1px at 18% 22%, rgba(255, 255, 255, 0.55) 50%, transparent 51%),
    radial-gradient(1px 1px at 34% 38%, rgba(255, 255, 255, 0.35) 50%, transparent 51%),
    radial-gradient(1px 1px at 52% 18%, rgba(255, 255, 255, 0.28) 50%, transparent 51%),
    radial-gradient(1px 1px at 70% 44%, rgba(255, 255, 255, 0.32) 50%, transparent 51%),
    radial-gradient(1px 1px at 86% 26%, rgba(255, 255, 255, 0.26) 50%, transparent 51%);
}

.sidebar-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 12px;
}

.sidebar-search :deep(.el-input__wrapper) {
  border-radius: 14px;
  background: var(--sidebar-el-input__wrapper-background);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  border: var(--sidebar-el-input__wrapper-border);
  transition: box-shadow 0.25s ease, background 0.25s ease;
}

.sidebar-menu {
  flex: 1;
  border-right: none;
  background: transparent;
  padding: 6px 0;
}

.sidebar-menu :deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
  border-radius: 14px;
  margin: 6px 2px;
  padding: 0 12px;
  color: var(--sidebar-menu-item-color);
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.sidebar-menu :deep(.el-menu-item:not(.is-disabled):hover) {
  background: var(--sidebar-menu-item-hover-background);
  box-shadow: var(--sidebar-menu-item-hover-box-shadow);
  transform: translateY(-1px);
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(
    to bottom right,
    rgba(59, 130, 246, 0.22),
    rgba(34, 211, 238, 0.18)
  );
  color: var(--sidebar-menu-item-active-color);
  font-weight: 650;
}

.create-btn {
  height: 44px;
  border: none;
  background: linear-gradient(to bottom right, #3b82f6, #22d3ee);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.28);
}

.create-btn:hover {
  filter: brightness(1.03);
  box-shadow: 0 16px 34px rgba(59, 130, 246, 0.34);
}

.btn-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}
</style>