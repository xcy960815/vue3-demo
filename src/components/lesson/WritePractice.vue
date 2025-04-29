<template>
  <div class="write-practice">
    <h3>书写练习</h3>
    <div class="grid-container">
      <div 
        v-for="(cell, index) in gridCells" 
        :key="index"
        class="grid-cell"
        :class="{ 'active': selectedNumber === cell }"
        @click="selectNumber(cell)"
      >
        {{ cell }}
      </div>
    </div>
    <div class="writing-area">
      <div class="signature-pad">
        <vue-signature-pad
          ref="signaturePad"
          width="300px"
          height="300px"
          :options="writingOptions"
          @beginStroke="onBeginWriting"
          @endStroke="onEndWriting"
        />
      </div>
      <div class="writing-controls">
        <el-button type="primary" @click="clearWriting">清除</el-button>
        <el-button type="success" @click="checkWriting" :disabled="!selectedNumber">检查</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import { post } from '../../utils/request'

const signaturePad = ref<any>(null)
const gridCells = ref(Array(9).fill('').map((_, i) => i + 1))
const selectedNumber = ref<number | null>(null)
const writingOptions = ref({
  penColor: '#000000',
  backgroundColor: '#ffffff',
  minWidth: 1.5,
  maxWidth: 1.5,
  throttle: 16,
  minDistance: 5
})

const selectNumber = (number: number) => {
  selectedNumber.value = number
  clearWriting()
}

const clearWriting = () => {
  if (signaturePad.value) {
    signaturePad.value.clearSignature()
  }
}

const checkWriting = async () => {
  if (!signaturePad.value || !selectedNumber.value) {
    ElMessage.warning('请先选择数字并书写')
    return
  }

  const { isEmpty, data } = signaturePad.value.saveSignature()
  if (isEmpty) {
    ElMessage.warning('请先书写')
    return
  }

  try {
    interface WritingResponse {
      correct: boolean
    }
    
    const response = await post<WritingResponse>('/writing/evaluate', {
      expectedNumber: selectedNumber.value.toString(),
      imageData: data
    })
    console.log("response--response",response.correct);
    if (response.correct) {
      ElMessage.success('书写正确！')
    } else {
      ElMessage.error('书写有误，请重试')
    }
  } catch (error) {
    console.error('评估失败:', error)
    ElMessage.error('评估失败，请重试')
  }
}

const onBeginWriting = () => {
  console.log('开始书写')
}

const onEndWriting = () => {
  console.log('结束书写')
}
</script>

<style scoped>
.write-practice {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.grid-cell {
  width: 60px;
  height: 60px;
  border: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #606266;
  transition: all 0.3s;
  cursor: pointer;
}

.grid-cell.active {
  background-color: #ecf5ff;
  border-color: #409eff;
  color: #409eff;
}

.writing-area {
  width: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.signature-pad {
  width: 300px;
  height: 300px;
  background-color: white;
}

.writing-controls {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style> 