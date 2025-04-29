<template>
  <div class="lesson-container">
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step title="听音" description="听数字发音" />
      <el-step title="跟读" description="跟读数字" />
      <el-step title="书写" description="书写数字" />
      <el-step title="概念" description="数字概念" />
      <el-step title="加法" description="5以内加法" />
    </el-steps>

    <div class="practice-area">
      <!-- 听音练习 -->
      <ListenPractice
        v-if="currentStep === 0"
        :number="currentNumber"
      />

      <!-- 跟读练习 -->
      <SpeakPractice
        v-if="currentStep === 1"
        :number="currentNumber"
        @complete="handleStepComplete"
      />

      <!-- 书写练习 -->
      <WritePractice
        v-if="currentStep === 2"
        :number="currentNumber"
        @complete="handleStepComplete"
      />

      <!-- 概念学习 -->
      <ConceptPractice
        v-if="currentStep === 3"
        :number="currentNumber"
        @complete="handleStepComplete"
      />

      <!-- 加法练习 -->
      <AdditionPractice
        v-if="currentStep === 4"
        :number="currentNumber"
        @complete="handleStepComplete"
      />
    </div>

    <div class="navigation-buttons">
      <el-button @click="prevStep" :disabled="currentStep === 0">上一步</el-button>
      <el-button type="primary" @click="nextStep" :disabled="currentStep === 4">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElSteps, ElStep, ElButton } from 'element-plus'
import ListenPractice from '@/components/lesson/ListenPractice.vue'
import SpeakPractice from '@/components/lesson/SpeakPractice.vue'
import WritePractice from '@/components/lesson/WritePractice.vue'
import ConceptPractice from '@/components/lesson/ConceptPractice.vue'
import AdditionPractice from '@/components/lesson/AdditionPractice.vue'

const currentStep = ref(0)
const currentNumber = ref(1)

const handleStepComplete = (isCorrect: boolean) => {
  if (isCorrect && currentStep.value < 4) {
    setTimeout(() => {
      currentStep.value++
    }, 1500)
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}
</script>

<style lang="less" scoped>
.lesson-container {
  padding: @spacing-larger;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .practice-area {
    // flex: 1;
    // margin: @spacing-extra-large 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    // min-height: 400px;
    overflow: auto;
  }

  .navigation-buttons {
    display: flex;
    justify-content: center;
    gap: @spacing-large;
    margin-top: @spacing-extra-large;
    padding-bottom: @spacing-large;
  }
}
</style> 