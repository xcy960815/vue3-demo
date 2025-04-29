<template>
  <div class="lesson-container">
    <div class="lesson-content">
      <el-steps :active="currentStep" finish-status="success" align-center>
        <el-step title="听音与跟读" description="听数字发音并跟读" />
        <el-step title="书写" description="书写数字" />
        <el-step title="概念" description="数字概念" />
        <el-step title="加法" description="5以内加法" />
      </el-steps>

      <div class="practice-area">
        <!-- 听音与跟读练习 -->
        <ListenAndSpeakPractice
          v-if="currentStep === 0"
          :number="currentNumber"
          @complete="handleStepComplete"
        />

        <!-- 书写练习 -->
        <WritePractice
          v-if="currentStep === 1"
          :number="currentNumber"
          @complete="handleStepComplete"
        />

        <!-- 概念学习 -->
        <ConceptPractice
          v-if="currentStep === 2"
          :number="currentNumber"
          @complete="handleStepComplete"
        />

        <!-- 加法练习 -->
        <AdditionPractice
          v-if="currentStep === 3"
          :number="currentNumber"
          @complete="handleStepComplete"
        />
      </div>

      <div class="navigation-buttons">
        <el-button @click="prevStep" :disabled="currentStep === 0">上一步</el-button>
        <el-button type="primary" @click="nextStep" :disabled="currentStep === 3">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElSteps, ElStep, ElButton } from 'element-plus'
import ListenAndSpeakPractice from '@/components/lesson/ListenAndSpeakPractice.vue'
import WritePractice from '@/components/lesson/WritePractice.vue'
import ConceptPractice from '@/components/lesson/ConceptPractice.vue'
import AdditionPractice from '@/components/lesson/AdditionPractice.vue'

const currentStep = ref(0)
const currentNumber = ref(1)

const handleStepComplete = (isCorrect: boolean) => {
  if (isCorrect && currentStep.value < 3) {
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
  if (currentStep.value < 3) {
    currentStep.value++
  }
}
</script>

<style lang="less" scoped>
.lesson-container {
  padding: @spacing-larger;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: @background-color;

  .lesson-content {
    width: 800px;
    max-width: 100%;
    background-color: @background-white;
    border-radius: @border-radius-large;
    box-shadow: @box-shadow-light;
    padding: @spacing-extra-large;
    display: flex;
    flex-direction: column;
    gap: @spacing-extra-large;
  }

  .practice-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    min-height: 400px;
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