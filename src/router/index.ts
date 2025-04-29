import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/lesson/:id',
      name: 'Lesson',
      component: () => import('../views/Lesson.vue')
    },
    {
      path: '/practice/:type',
      name: 'Practice',
      component: () => import('../views/Practice.vue')
    }
  ]
})

export default router 