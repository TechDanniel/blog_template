<template>
  <div
    class="character-container"
    v-motion
    :initial="{ x: 0, rotate: 0, scale: 1 }"
    :enter="isHovered ? hoverEnter : idleEnter"
  >
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient :id="`${idPrefix}-bg`" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="var(--character-bg-from)" />
          <stop offset="100%" stop-color="var(--character-bg-to)" />
        </radialGradient>

        <linearGradient :id="`${idPrefix}-skin`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--character-skin-from)" />
          <stop offset="100%" stop-color="var(--character-skin-to)" />
        </linearGradient>

        <linearGradient :id="`${idPrefix}-hair`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--character-hair-from)" />
          <stop offset="100%" stop-color="var(--character-hair-to)" />
        </linearGradient>

        <linearGradient :id="`${idPrefix}-body`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--character-body-from)" />
          <stop offset="100%" stop-color="var(--character-body-to)" />
        </linearGradient>
      </defs>

      <!-- 背景圆 -->
      <circle
        v-motion
        cx="140"
        cy="140"
        r="120"
        :fill="`url(#${idPrefix}-bg)`"
        :enter="{ scale: isHovered ? 1.05 : 1, transition: { duration: 0.25 } }"
      />

      <!-- 身体 -->
      <ellipse cx="140" cy="190" rx="50" ry="60" :fill="`url(#${idPrefix}-body)`" />

      <!-- 头 -->
      <circle cx="140" cy="120" r="45" :fill="`url(#${idPrefix}-skin)`" />

      <!-- 头发 -->
      <path
        d="M95 110 Q95 75 140 75 Q185 75 185 110 Q185 95 140 85 Q95 95 95 110 Z"
        :fill="`url(#${idPrefix}-hair)`"
      />

      <!-- 左眼 -->
      <ellipse
        v-motion
        cx="125"
        cy="115"
        rx="4"
        :ry="isHovered ? 8 : 6"
        fill="#2D3748"
        :enter="{ scaleY: isHovered ? 1.3 : 1, transition: { duration: 0.2 } }"
      />

      <!-- 右眼 -->
      <ellipse
        v-motion
        cx="155"
        cy="115"
        rx="4"
        :ry="isHovered ? 8 : 6"
        fill="#2D3748"
        :enter="{ scaleY: isHovered ? 1.3 : 1, transition: { duration: 0.2 } }"
      />

      <!-- 嘴巴 -->
      <path
        v-motion
        :d="isHovered ? 'M120 130 Q140 145 160 130' : 'M120 130 Q140 140 160 130'"
        stroke="#2D3748"
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
        :enter="{}"
      />

      <!-- 腮红左 -->
      <ellipse cx="110" cy="125" rx="8" ry="6" fill="var(--character-blush)" opacity="0.4" />
      <!-- 腮红右 -->
      <ellipse cx="170" cy="125" rx="8" ry="6" fill="var(--character-blush)" opacity="0.4" />

      <!-- 挥手手臂 -->
      <g
        v-motion
        :enter="isHovered ? waveEnter : waveIdle"
        style="transform-origin: 80px 170px"
      >
        <ellipse cx="95" cy="180" rx="12" ry="30" :fill="`url(#${idPrefix}-body)`" transform="rotate(-30 95 180)" />
        <circle cx="80" cy="165" r="10" :fill="`url(#${idPrefix}-skin)`" />
      </g>

      <!-- 右手臂 -->
      <ellipse cx="185" cy="180" rx="12" ry="30" :fill="`url(#${idPrefix}-body)`" transform="rotate(30 185 180)" />

      <!-- 悬浮闪光 -->
      <template v-if="isHovered">
        <circle
          v-motion
          cx="60"
          cy="100"
          r="4"
          fill="#4F94FF"
          :initial="{ scale: 0, opacity: 0 }"
          :enter="{ scale: [0, 1, 0], opacity: [0, 1, 0], transition: { duration: 0.8, repeat: Infinity } }"
        />
        <circle
          v-motion
          cx="220"
          cy="140"
          r="3"
          fill="#A8E6CF"
          :initial="{ scale: 0, opacity: 0 }"
          :enter="{ scale: [0, 1, 0], opacity: [0, 1, 0], transition: { duration: 0.8, delay: 0.2, repeat: Infinity } }"
        />
        <circle
          v-motion
          cx="90"
          cy="200"
          r="3"
          fill="#FFD93D"
          :initial="{ scale: 0, opacity: 0 }"
          :enter="{ scale: [0, 1, 0], opacity: [0, 1, 0], transition: { duration: 0.8, delay: 0.4, repeat: Infinity } }"
        />
      </template>
    </svg>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

defineProps({
  isHovered: {
    type: Boolean,
    default: false
  }
})

const idPrefix = `character-${getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)}`

// 动画配置（Motion v3 使用 enter/leave/hovered 等 Variant）
const hoverEnter = {
  x: -60,
  rotate: -5,
  scale: 1,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
}

const idleEnter = {
  x: 0,
  rotate: 0,
  scale: [1, 1.02, 1],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
}

const waveFrames = {
  rotate: [0, 15, -15, 15, 0],
  x: [0, 5, -5, 5, 0],
}

const waveEnter = {
  ...waveFrames,
  transition: { duration: 0.6 },
}

const waveIdle = {
  rotate: 0,
  x: 0,
  transition: { duration: 0.2 },
}
</script>

<style scoped>
.character-container {
  position: relative;
}

svg {
  filter: drop-shadow(var(--character-shadow));
}
</style>