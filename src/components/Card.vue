<template>
  <div
    class="card"
    :style="getAnimationStyle()"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 渐变头部 -->
    <div class="card-header" :class="colorClass">
      <div class="header-radial"></div>
      <div class="header-icon">{{ icon }}</div>
    </div>

    <!-- 内容区域 -->
    <div class="card-body">
      <h3 class="card-title">{{ name }}</h3>
      <p class="card-desc">{{ description }}</p>

      <div class="card-meta">
        <div class="meta-item">
          <Tag class="meta-icon" />
          <span>{{ category }}</span>
        </div>
        <div class="meta-item">
          <Clock class="meta-icon" />
          <span>{{ lastUpdated }}</span>
        </div>
      </div>
    </div>

    <!-- 悬停内发光 -->
    <div class="hover-glow" :class="colorClass"></div>

    <!-- 外发光边框 -->
    <div class="outer-glow"></div>

    <!-- 浮动动画层 -->
    <div class="float-animation"></div>
  </div>
</template>

<script setup>
import { computed,ref } from 'vue'
import { Tag, Clock } from 'lucide-vue-next'

const props = defineProps({
  index: { type: Number, default: 0 },
  color: { type: String, default: 'purple-blue' },
  icon: String,
  name: String,
  description: String,
  category: String,
  lastUpdated: String,
})

const isHovered = ref(false)

// 动画样式：入场 + 延迟
const getAnimationStyle = () => {
  return {
    animationDelay: `${props.index * 0.1}s`,
  }
}

// 渐变颜色类
const colorClass = computed(() => `gradient-${props.color}`)
</script>

<style>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(20px);
  box-shadow: var(--card-shadow);
  transition: all 0.5s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  animation: cardEnter 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-hover-shadow);
}

.card-title {
  color: var(--card-title-color);
}

.card:hover .card-title {
  color: var(--card-hover-title-color);
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--card-meta-border);
}

.card:hover .outer-glow {
  opacity: 1;
  background: var(--card-hover-glow);
}

/* 入场动画 */
@keyframes cardEnter {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 头部 */
.card-header {
  height: 128px;
  position: relative;
  overflow: hidden;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.card:hover .card-header {
  opacity: 1;
}

/* 径向光效 */
.header-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 120%, rgba(255,255,255,0.3), transparent);
}

/* 图标 */
.header-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  opacity: 0.5;
  transition: all 0.5s;
}

.card:hover .header-icon {
  opacity: 0.7;
  transform: translate(-50%, -50%) scale(1.1);
}

/* 内容 */
.card-body {
  padding: 24px;
}

.card-title {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  transition: color 0.3s;
}

.card-desc {
  color: #64748b;
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 48px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 14px;
}

.meta-icon {
  width: 14px;
  height: 14px;
}

/* 悬停内发光 */
.hover-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.hover-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.1;
  filter: blur(24px);
}

.card:hover .hover-glow {
  opacity: 1;
}

/* 外发光 */
.outer-glow {
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background: linear-gradient(to bottom right, rgba(96, 165, 250, 0), rgba(34, 211, 238, 0), rgba(16, 185, 129, 0));
  opacity: 0;
  filter: blur(16px);
  z-index: -10;
  transition: all 0.5s;
}

/* 浮动动画 */
.float-animation {
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
}

/* 渐变颜色配置 */
.gradient-purple-blue::before {
  background: linear-gradient(to bottom right, #a855f7, #3b82f6);
}
.gradient-pink-rose::before {
  background: linear-gradient(to bottom right, #ec4899, #f43f5e);
}
.gradient-blue-cyan::before {
  background: linear-gradient(to bottom right, #3b82f6, #06b6d4);
}
.gradient-green-emerald::before {
  background: linear-gradient(to bottom right, #10b981, #059669);
}
</style>