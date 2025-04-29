<template>
  <div class="concept-practice">
    <h3>概念学习</h3>
    <video :src="videoUrl" controls></video>
    <div class="quiz-area">
      <el-button type="primary" @click="startQuiz">开始测验</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const props = defineProps<{
  number: number
}>()

const emit = defineEmits<{
  (e: 'complete', isCorrect: boolean): void
}>()

const videoUrl = ref('/videos/concept.mp4')

const startQuiz = () => {
  // 实现测验逻辑
  emit('complete', true)
}
</script>

<style lang="less" scoped>
.concept-practice {
  width: 100%;
  max-width: 800px;
  
  video {
    width: 100%;
    border-radius: @border-radius-base;
    margin-bottom: @spacing-large;
  }

  .quiz-area {
    text-align: center;
    margin-top: @spacing-large;
  }
}
</style> 