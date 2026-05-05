<template>
  <div class="floating-particles">
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`,
      }"
    >
      <!-- 圆形 -->
      <div
        v-if="particle.shape === 'circle'"
        class="shape circle"
      ></div>

      <!-- 方形 -->
      <div
        v-else-if="particle.shape === 'square'"
        class="shape square"
      ></div>

      <!-- 三角形 -->
      <div
        v-else-if="particle.shape === 'triangle'"
        class="shape triangle"
        :style="{
          borderLeftWidth: `${particle.size / 2}px`,
          borderRightWidth: `${particle.size / 2}px`,
          borderBottomWidth: `${particle.size}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 80 + 40,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 5,
  shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'triangle',
}))
</script>

<style scoped>
/* 粒子容器 */
.floating-particles {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* 粒子动画主体 */
.particle {
  position: absolute;
  animation: floatRotate 20s ease-in-out infinite;
}

/* 粒子统一样式 */
.shape {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
}

/* 圆形 */
.circle {
  border-radius: 50%;
  background: var(--circle-bg);
}

/* 方形 */
.square {
  border-radius: 16px;
  background: var(--square-bg);
}

/* 三角形 */
.triangle {
  width: 0;
  height: 0;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: var(--triangle-border);
  background: none;
}

/* 核心动画：上下浮动 + 左右摇摆 + 旋转 + 缩放 */
@keyframes floatRotate {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(15px, -30px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(-15px, -15px) rotate(180deg) scale(1);
  }
  75% {
    transform: translate(10px, -25px) rotate(270deg) scale(1.05);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}
</style>