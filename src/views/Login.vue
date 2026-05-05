<template>
  <div class="login-page">
    <!-- 浮动粒子 -->
    <FloatingParticles />

    <!-- 背景遮罩 -->
    <div
      v-if="showForm"
      class="login-overlay"
      @click="showForm = false"
    />

    <!-- 暗黑切换 -->
    <div class="dark-switch">
      <el-switch
        v-model="isDark"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
      />
    </div>

    <!-- 顶部标题 -->
    <div
      class="login-header"
      v-motion
      :initial="{ y: -50, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }"
    >
      <h1 class="title-gradient">知识库管理系统</h1>
      <p class="sub-title">让知识管理更简单、更高效</p>
    </div>

    <!-- 主体内容 -->
    <div class="login-container">
      <!-- 卡通人物 -->
      <div
        class="character-wrapper"
        v-motion
        @mouseenter="showForm = true"
        :initial="{ scale: 0.8, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.3 } }"
      >
        <CharacterAvatar :is-hovered="showForm" />
      </div>

      <!-- 登录表单 -->
      <div
        v-if="showForm"
        class="login-card"
        v-motion
        :initial="{ x: -100, opacity: 0, scale: 0.9 }"
        :enter="{ x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } }"
        :leave="{ x: -100, opacity: 0, scale: 0.9, transition: { duration: 0.25 } }"
        @mouseenter="showForm = true"
      >
        <div class="login-card-inner">
          <h2>欢迎来到您的知识库</h2>
          <p class="tip">登录以开始高效知识管理</p>

          <LoginForm
            @login="handleLogin"
          />
        </div>
      </div>
    </div>

    <!-- 底部提示 -->
    <div
      v-if="!showForm"
      class="bottom-hint"
      v-motion
      :initial="{ y: 50, opacity: 0 }"
      :enter="{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.6 } }"
    >
      <p
        class="hint-text"
        v-motion
        :initial="{ opacity: 0.5 }"
        :enter="{ opacity: [0.5, 1, 0.5], transition: { duration: 2, repeat: Infinity } }"
      >
        <span>👋</span>
        将鼠标悬停在角色上以登录
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
   Moon, Sunny
} from '@element-plus/icons-vue'
import FloatingParticles from '@/components/FloatingParticles.vue'
import CharacterAvatar from '@/components/CharacterAvatar.vue'
import { useThemeStore } from '@/store/useTheme'
import LoginForm from '@/components/LoginForm.vue'

const emit = defineEmits(['login'])

const themeStore = useThemeStore()
const isDark = computed({
  get:() => {
    return themeStore.isDark
  },
  set:() => {
    themeStore.toggleTheme()
  }
})

const showForm = ref(false)

const handleLogin = () => {
  emit('login')
}
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  background: var(--login-bg);
  transition: all 0.5s;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 遮罩 */
.login-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.dark-switch{
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
}

.icon {
  width: 20px;
  height: 20px;
  color: #f59e0b;
}

/* 头部 */
.login-header {
  position: absolute;
  top: 64px;
  left: 50%;
  transform: translateX(-50%) !important;
  z-index: 20;
  text-align: center;
}
.title-gradient {
  font-size: 28px;
  background: linear-gradient(to right, #4F94FF, #22d3ee, #10b981);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientMove 8s linear infinite;
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.sub-title {
  margin-top: 8px;
  color: var(--login-text-foreground);
}

/* 主体 */
.login-container {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 48px;
}
.character-wrapper {
  cursor: pointer;
}

/* 登录卡片 */
.login-card {
  background: var(--login-card-bg);
  border: 1px solid var(--login-card-border);
  border-radius: 16px;
  padding: 32px;
  width: 380px;
  z-index: 30;
}
.login-card-inner {
  position: relative;
}
.login-card h2 {
  margin-bottom: 8px;
  color: var(--login-text-primary);
}
.tip {
  color: var(--login-text-foreground);
  margin-bottom: 24px;
}

/* 底部提示 */
.bottom-hint {
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%) !important;
  z-index: 20;
}
.hint-text {
  font-size: 14px;
  color: var(--login-text-foreground);
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>