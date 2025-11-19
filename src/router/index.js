import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path: '/',
       component: () => import('@/layouts/LoginLayout.vue'),
       meta: { requiresAuth: false },
       children: [
          {
            path: '',
            name: 'login',
            component: () => import('@/pages/LoginPage.vue'),
          },
          {
            path: 'register',
            name: 'register',
            component: () => import('@/pages/RegisterPage.vue'),
          },

       ]
    },
    {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true },
      children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/pages/CategoryPage.vue'),
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/pages/ProductPage.vue'),
      },

    ]
  }],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('v-token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next({ name: 'login' })
  } else if (!requiresAuth && token && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
