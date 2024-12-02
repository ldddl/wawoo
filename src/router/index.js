import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/productsView.vue')
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: () => import('../views/couponsView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/productView.vue')
    }
  ]
})

export default router
