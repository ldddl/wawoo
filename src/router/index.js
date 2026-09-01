import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
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
          path: '/cart',
          name: 'cart',
          component: () => import('../views/FrontView/CartView.vue')
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('../views/FrontView/CheckoutView.vue')
        },
        {
          path: '/order-complete',
          name: 'order-complete',
          component: () => import('../views/FrontView/OrderCompleteView.vue')
        },
        {
          path: '/product/:id',
          redirect: '/products'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/DashboardView/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardView/AdminView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'admin-products' }
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/DashboardView/AdminProductsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'admin-coupons',
          component: () => import('../views/DashboardView/AdminCouponsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/DashboardView/AdminOrdersView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true
  const authStore = useAuthStore()
  return authStore.checkLogin().then((ok) => {
    if (ok) return true
    return { name: 'login', query: { redirect: to.fullPath } }
  })
})

export default router
