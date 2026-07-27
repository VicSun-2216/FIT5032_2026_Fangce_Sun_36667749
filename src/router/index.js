import { createRouter, createWebHistory } from 'vue-router'


import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { auth } from '../firebase'
import { authReady, loadUserRole } from '../auth'
import AdminView from '../views/AdminView.vue'
import AddBookView from '../views/AddBookView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/addbook',
      name: 'addbook',
      component: AddBookView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        requiresAuth: true,
        requiredRole: 'admin',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: FirebaseRegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/access-denied',
      name: 'accessDenied',
      component: AccessDeniedView,
    },
  ],
})

router.beforeEach(async (to) => {
  await authReady

  const user = auth.currentUser
  const loggedIn = Boolean(user)

  if (to.meta.requiresAuth && !loggedIn) {
    return {
      name: 'accessDenied',
    }
  }

  if (to.meta.requiredRole && loggedIn) {
    const role = await loadUserRole(user)

    if (role !== to.meta.requiredRole) {
      console.warn(`Access denied. Required role: ${to.meta.requiredRole}, current role: ${role}`)

      return {
        name: 'accessDenied',
      }
    }
  }

  if ((to.name === 'login' || to.name === 'register') && loggedIn) {
    const role = await loadUserRole(user)

    return role === 'admin' ? { name: 'admin' } : { name: 'about' }
  }

  return true
})
export default router
