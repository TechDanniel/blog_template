<template>
  <div class="flex gap-1.5">
    <div
      v-for="index in 3"
      :key="index"
      class="dot w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"
      :style="{ animationDelay: `${(index - 1) * 0.15}s` }"
    />
  </div>
</template>

<style scoped>
.dot {
  animation: typingAnimation 0.8s ease-in-out infinite;
}

@keyframes typingAnimation {
  0% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
}
</style>