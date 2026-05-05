<template>
  <div class="header-inner">
      <!-- 左侧 Logo + 标题 -->
      <div class="header-left">
        <div class="logo-box">
          <Globe class="logo-icon" />
        </div>
        <h1 class="page-title">知识库管理系统</h1>
      </div>

      <!-- 中间标语 -->
      <div class="header-center">
        <span class="slogan">好好学习，天天向上</span>
      </div>

      <!-- 右侧按钮区 -->
      <div class="header-right">
        <el-switch
          v-model="isDark"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />

        <el-avatar class="user-avatar">
          <template #default>
            <div class="avatar-fallback">用户</div>
          </template>
        </el-avatar>
      </div>
    </div>
</template>

<script setup lang="ts">
import {
   Moon, Sunny
} from '@element-plus/icons-vue'
import { useThemeStore } from '@/store/useTheme';
import { computed } from 'vue';

const themeStore = useThemeStore()
const isDark = computed({
  get:() => themeStore.isDark,
  set:() => themeStore.toggleTheme()
})
</script>

<style scoped>
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* 左侧 Logo */
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #3b82f6, #22d3ee);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 24px;
  height: 24px;
  color: #fff;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  background: var(--header-page-title-background);
  -webkit-background-clip: text;
  color: transparent;
  margin: 0;
}

/* 中间标语 */
.header-center {
  flex: 1;
  max-width: 400px;
  text-align: center;
  color: var(--header-center-color);
}

/* 右侧按钮 */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.avatar-fallback {
  background: linear-gradient(to bottom right, #3b82f6, #22d3ee);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>