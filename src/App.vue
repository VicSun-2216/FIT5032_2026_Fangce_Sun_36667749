<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { isAuthenticated, logout } from './auth'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-vh-100 bg-light">
    <header class="bg-white border-bottom shadow-sm">
      <nav
        class="container py-3 d-flex flex-wrap
               justify-content-between align-items-center gap-3"
      >
        <RouterLink
          to="/"
          class="navbar-brand fw-bold text-decoration-none"
        >
          W5 Library App
        </RouterLink>

        <div class="d-flex align-items-center gap-2">
          <RouterLink
            to="/"
            class="btn btn-outline-primary"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/about"
            class="btn btn-outline-primary"
          >
            About
          </RouterLink>

          <RouterLink
            v-if="!isAuthenticated"
            to="/login"
            class="btn btn-outline-success"
          >
            Login
          </RouterLink>

          <button
            v-else
            type="button"
            class="btn btn-outline-danger"
            @click="handleLogout"
          >
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