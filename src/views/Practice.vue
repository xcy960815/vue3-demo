<template>
  <div class="practice-container">
    <h2 class="practice-title">练习模式</h2>
    <div class="practice-types">
      <div 
        v-for="type in practiceTypes" 
        :key="type.id"
        class="practice-card"
        @click="startPractice(type.id)"
      >
        <el-icon class="practice-icon" :size="32">
          <component :is="type.icon" />
        </el-icon>
        <h3 class="practice-name">{{ type.name }}</h3>
        <p class="practice-desc">{{ type.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Microphone, Edit, Calculator } from '@element-plus/icons-vue'

const router = useRouter()

const practiceTypes = ref([
  {
    id: 'speaking',
    name: '口语练习',
    description: '练习数字的发音和听力',
    icon: Microphone
  },
  {
    id: 'writing',
    name: '书写练习',
    description: '练习数字的书写',
    icon: Edit
  },
  {
    id: 'calculation',
    name: '计算练习',
    description: '练习简单的加法运算',
    icon: Calculator
  }
])

const startPractice = (type: string) => {
  router.push(`/practice/${type}`)
}
</script>

<style lang="less" scoped>
.practice-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: @spacing-larger;

  .practice-title {
    color: @text-primary;
    font-size: @font-size-extra-large;
    text-align: center;
    margin-bottom: @spacing-extra-large;
  }

  .practice-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: @spacing-larger;

    .practice-card {
      background-color: #fff;
      border-radius: @border-radius-base;
      padding: @spacing-larger;
      text-align: center;
      cursor: pointer;
      transition: @transition-all;
      box-shadow: @box-shadow-base;

      &:hover {
        transform: translateY(-4px);
        box-shadow: @box-shadow-light;
      }

      .practice-icon {
        color: @primary-color;
        margin-bottom: @spacing-large;
      }

      .practice-name {
        color: @text-primary;
        font-size: @font-size-large;
        margin-bottom: @spacing-base;
      }

      .practice-desc {
        color: @text-secondary;
        font-size: @font-size-base;
        line-height: 1.5;
      }
    }
  }
}
</style> 