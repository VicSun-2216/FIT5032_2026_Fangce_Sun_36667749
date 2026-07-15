import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'

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
      component: AboutView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/access-denied',
      name: 'accessDenied',
      component: AccessDeniedView
    }
  ]
})

router.beforeEach((to) => {
  const loggedIn =
    localStorage.getItem('isAuthenticated') === 'true'

  if (to.meta.requiresAuth && !loggedIn) {
    return {
      name: 'accessDenied'
    }
  }

  if (to.name === 'login' && loggedIn) {
    return {
      name: 'about'
    }
  }

  return true
})

export default router