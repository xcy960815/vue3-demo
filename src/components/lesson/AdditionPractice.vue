<template>
  <div class="addition-practice">
    <h3>加法练习</h3>
    <div class="addition-problem">
      <span>{{ num1 }} + {{ num2 }} = ?</span>
      <div class="options">
        <el-button 
          v-for="option in options" 
          :key="option"
          @click="checkAnswer(option)"
        >
          {{ option }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'

const num1 = ref(1)
const num2 = ref(1)
const options = ref([1, 2, 3, 4, 5])

const checkAnswer = (answer: number) => {
  const correctAnswer = num1.value + num2.value
  const isCorrect = answer === correctAnswer
  
  ElMessage({
    type: isCorrect ? 'success' : 'warning',
    message: isCorrect ? '回答正确！' : '再试一次吧！'
  })
  
 
}
</script>

<style lang="less" scoped>
.addition-practice {
  .addition-problem {
    text-align: center;
    font-size: @font-size-extra-large;
    color: @text-primary;
    margin: @spacing-large 0;

    .options {
      display: flex;
      gap: @spacing-large;
      margin-top: @spacing-large;
      justify-content: center;
    }
  }
}
</style> 