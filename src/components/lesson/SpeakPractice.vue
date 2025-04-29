<template>
  <div class="speak-practice">
    <h3>跟读练习</h3>
    <div class="number-display">
      <span class="number">{{ number }}</span>
      <el-button 
        type="primary" 
        circle 
        :class="{ 'recording': isRecording }"
        @click="isRecording ? stopRecording() : startRecording()"
      >
        <el-icon><Microphone /></el-icon>
      </el-button>
    </div>
    <div v-if="isRecording" class="recording-status">
      正在录音... {{ recordingTime.toFixed(1) }}s
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { ElButton, ElIcon, ElMessage } from 'element-plus'
import { Microphone } from '@element-plus/icons-vue'
import { saveSpeakingResult } from '../../api/progress'
import { useStore } from '../../store'
import { upload } from '../../utils/request'

interface CompareResult {
  isCorrect: boolean;
  text: string;
}

const props = defineProps<{
  number: number
}>()

const emit = defineEmits<{
  (e: 'complete', isCorrect: boolean): void
}>()

const store = useStore()
const isRecording = ref(false)
const recordingTime = ref(0)
const recordingTimer = ref<number | null>(null)
let mediaRecorder: MediaRecorder | null = null
let audioChunks: Blob[] = []

const startRecording = async () => {
  if (isRecording.value) {
    stopRecording()
    return
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      const audioUrl = URL.createObjectURL(audioBlob)
      
      let isCorrect = false
      let recognizedText = ''
      try {
        const formData = new FormData()
        formData.append('audio', audioBlob, 'record.wav')
        formData.append('number', String(props.number))
        const res = await upload<CompareResult>('/compare-audio', formData)
        isCorrect = res.isCorrect
        recognizedText = res.text
      } catch (e) {
        console.error('音频对比失败', e)
      }
      
      try {
        await saveSpeakingResult(store.userProgress.userId, props.number, isCorrect)
        
        // 播放录音供用户确认
        const audio = new Audio(audioUrl)
        await audio.play()
        
        ElMessage({
          type: isCorrect ? 'success' : 'warning',
          message: isCorrect ? '很好！发音正确！' : `再试一次吧！（识别为：${recognizedText}）`
        })
        
        emit('complete', isCorrect)
      } catch (error) {
        ElMessage.error('保存结果失败，请重试')
      } finally {
        // 清理资源
        URL.revokeObjectURL(audioUrl)
        stream.getTracks().forEach(track => track.stop())
      }
    }

    mediaRecorder.start()
    isRecording.value = true
    recordingTime.value = 0
    
    // 开始计时
    recordingTimer.value = window.setInterval(() => {
      recordingTime.value += 0.1
    }, 100)
    
  } catch (error) {
    console.error('录音失败:', error)
    ElMessage.error('无法访问麦克风，请检查权限设置')
  }
}

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
    isRecording.value = false
    
    // 停止计时
    if (recordingTimer.value) {
      clearInterval(recordingTimer.value)
      recordingTimer.value = null
    }
  }
}

onBeforeUnmount(() => {
  stopRecording()
  if (recordingTimer.value) {
    clearInterval(recordingTimer.value)
  }
})
</script>

<style lang="less" scoped>
.speak-practice {
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

    .el-button {
      &.recording {
        background-color: @danger-color;
        border-color: @danger-color;
        animation: pulse 1s infinite;
      }
    }
  }

  .recording-status {
    color: @danger-color;
    margin-top: @spacing-base;
    font-size: @font-size-base;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style> 