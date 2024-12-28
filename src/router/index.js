import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/FrontView/HomeView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/FrontView/AboutView.vue')
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/FrontView/ProductsView.vue')
        },
        {
          path: '/coupons',
          name: 'coupons',
          component: () => import('../views/FrontView/CouponsView.vue')
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('../views/FrontView/ProductView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: '登入',
      component: () => import('../views/DashboardView/LoginView.vue')
    }
  ]
})

export default router
