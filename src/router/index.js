import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path: '/',
       component: () => import('@/layouts/LoginLayout.vue'),
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

export default router
