<template>
  <div class="score-animation" v-if="visible">
    <div class="score-content">
      <span class="score">100</span>
      <span class="text">分</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'animationEnd'): void
}>()

onMounted(() => {
  if (props.visible) {
    setTimeout(() => {
      emit('animationEnd')
    }, 2000) // 动画持续2秒
  }
})
</script>

<style lang="less" scoped>
.score-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  animation: fadeInOut 2s ease-in-out;

  .score-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.95);
    padding: @spacing-larger;
    border-radius: @border-radius-large;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
    border: 2px solid #ff4d4f;

    .score {
      font-size: 96px;
      font-weight: bold;
      color: #ff4d4f;
      animation: scaleUp 0.5s ease-out;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .text {
      font-size: 48px;
      color: #ff4d4f;
      margin-left: @spacing-base;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style> 