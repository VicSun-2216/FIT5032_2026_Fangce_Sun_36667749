<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { currentUser, isAuthenticated, userRole, logout } from './auth'

const router = useRouter()

const handleLogout = async () => {
  try {
    await logout()

    window.alert('Firebase logout successful!')

    await router.push('/login')
  } catch (error) {
    console.error('Firebase logout error:', error)
    window.alert('Logout failed. Please try again.')
  }
}
</script>

<template>
  <div class="min-vh-100 bg-light">
    <header class="bg-white border-bottom shadow-sm">
      <nav class="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
        <RouterLink to="/" class="navbar-brand fw-bold text-decoration-none">
          W5 Library App
        </RouterLink>

        <div class="d-flex flex-wrap align-items-center gap-2">
          <span v-if="isAuthenticated" class="small text-secondary me-2">
            {{ currentUser?.email }}
          </span>
          <span
            v-if="isAuthenticated && userRole"
            class="badge"
            :class="userRole === 'admin' ? 'bg-danger' : 'bg-secondary'"
          >
            {{ userRole }}
          </span>
          <RouterLink to="/" class="btn btn-outline-primary"> Home </RouterLink>

          <RouterLink to="/about" class="btn btn-outline-primary"> About </RouterLink>
          <RouterLink
            v-if="isAuthenticated && userRole === 'admin'"
            to="/admin"
            class="btn btn-outline-danger"
          >
            Admin
          </RouterLink>

          <RouterLink v-if="!isAuthenticated" to="/register" class="btn btn-outline-success">
            Register
          </RouterLink>

          <RouterLink v-if="!isAuthenticated" to="/login" class="btn btn-outline-success">
            Login
          </RouterLink>

          <button v-else type="button" class="btn btn-outline-danger" @click="handleLogout">
            Logout
          </button>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.router-link-exact-active.btn {
  color: white;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
