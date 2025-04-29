<template>
  <div class="home-container">
    <h2 class="welcome-text">欢迎来到数字学习乐园！</h2>
    <div class="lessons-grid">
      <div 
        v-for="lesson in lessons" 
        :key="lesson.id" 
        class="lesson-card"
        @click="startLesson(lesson.id)"
      >
        <div class="lesson-content">
          <span class="lesson-number">{{ lesson.number }}</span>
          <h3 class="lesson-title">{{ lesson.title }}</h3>
          <el-tag 
            :type="lesson.completed ? 'success' : 'info'"
            size="small"
          >
            {{ lesson.completed ? '已完成' : '未完成' }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const lessons = ref([
  { id: 1, number: '1', title: '认识数字1', completed: false },
  { id: 2, number: '2', title: '认识数字2', completed: false },
  { id: 3, number: '3', title: '认识数字3', completed: false },
  { id: 4, number: '4', title: '认识数字4', completed: false },
  { id: 5, number: '5', title: '认识数字5', completed: false }
])

const startLesson = (id: number) => {
  router.push(`/lesson/${id}`)
}
</script>

<style lang="less" scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: @spacing-larger;

  .welcome-text {
    color: @text-primary;
    font-size: @font-size-extra-large;
    text-align: center;
    // margin-bottom: @spacing-extra-large;
  }

  .lessons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: @spacing-larger;

    .lesson-card {
      background-color: #fff;
      border-radius: @border-radius-base;
      box-shadow: @box-shadow-base;
      cursor: pointer;
      transition: @transition-all;
      overflow: hidden;

      &:hover {
        transform: translateY(-5px);
        transition: @transition-all;
      }

      .lesson-content {
        padding: @spacing-larger;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: @spacing-base;

        .lesson-number {
          font-size: 36px;
          font-weight: bold;
          color: @primary-color;
        }

        .lesson-title {
          color: @text-primary;
          font-size: @font-size-medium;
          margin: @spacing-base 0;
        }
      }
    }
  }
}
</style> 