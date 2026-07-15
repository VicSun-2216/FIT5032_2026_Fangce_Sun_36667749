<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''

  const success = login(username.value, password.value)

  if (success) {
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password.'
  }
}
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <section class="card p-4 shadow-sm">
          <h1 class="text-center mb-4">Member Login</h1>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="loginUsername" class="form-label">
                Username
              </label>

              <input
                id="loginUsername"
                v-model="username"
                type="text"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="loginPassword" class="form-label">
                Password
              </label>

              <input
                id="loginPassword"
                v-model="password"
                type="password"
                class="form-control"
                required
              />
            </div>

            <div
              v-if="errorMessage"
              class="alert alert-danger"
              role="alert"
            >
              {{ errorMessage }}
            </div>

            <button type="submit" class="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div class="alert alert-info mt-4 mb-0">
            <strong>Test account</strong><br />
            Username: admin<br />
            Password: password123
          </div>
        </section>
      </div>
    </div>
  </main>
</template>