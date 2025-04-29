<template>
  <div class="listen-practice">
    <h3>听音练习</h3>
    <div class="number-display">
      <span class="number">{{ number }}</span>
      <el-button type="primary" circle @click="playAudio">
        <el-icon><VideoPlay /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElIcon } from 'element-plus'
import { VideoPlay } from '@element-plus/icons-vue'
import { playNumberAudio, stopSpeaking } from '../../api/audio'

const props = defineProps<{
  number: number
}>()

const isPlaying = ref(false)

// 防抖函数
const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

// 使用防抖包装播放函数
const debouncedPlay = debounce(async () => {
  if (isPlaying.value) {
    stopSpeaking()
    isPlaying.value = false
    return
  }
  
  try {
    isPlaying.value = true
    await playNumberAudio(props.number)
  } catch (error) {
    console.error(error)
  } finally {
    isPlaying.value = false
  }
}, 300)

const playAudio = () => {
  debouncedPlay()
}
</script>

<style lang="less" scoped>
.listen-practice {
  .number-display {
    display: flex;
    align-items: center;
    gap: @spacing-large;
    margin: @spacing-large 0;

    .number {
      font-size: 48px;
      font-weight: bold;
      color: @text-primary;
    }
  }
}
</style> 