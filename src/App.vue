<template>
  <div class="app-container">
    <el-container>
      <el-header class="app-header">
        <div class="header-content">
          <h1 class="app-title">数字学习乐园</h1>
          <div class="user-info">
            <span class="coins">金币: {{ store.userProgress.coins }}</span>
            <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useStore } from './store'
import { ElContainer, ElHeader, ElMain, ElAvatar } from 'element-plus'

const store = useStore()
</script>

<style lang="less" scoped>
.app-container {
  height: 100vh;
  background-color: @background-color;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .app-header {
    background-color: @background-white;
    box-shadow: @box-shadow-light;
    padding: 0;
    flex-shrink: 0;
    
    .header-content {
      height: @header-height;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 @spacing-larger;
      
      .app-title {
        color: @text-primary;
        font-size: @font-size-extra-large;
        margin: 0;
      }
      
      .user-info {
        display: flex;
        align-items: center;
        gap: @spacing-large;
        
        .coins {
          color: @text-regular;
          font-size: @font-size-medium;
        }
      }
    }
  }

  :deep(.el-container) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-main) {
    padding: 0;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
