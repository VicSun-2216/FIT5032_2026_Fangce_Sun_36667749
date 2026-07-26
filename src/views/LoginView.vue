<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { loadUserRole } from '../auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''

  try {
    isSubmitting.value = true

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value,
    )

    console.log('Firebase Login Successful!')
    console.log('Current Firebase user:', userCredential.user)
    console.log('Current user email:', userCredential.user.email)
    console.log('auth.currentUser:', auth.currentUser)

    const role = await loadUserRole(userCredential.user)

    console.log('Authenticated user role:', role)

    window.alert(
      `Firebase login successful! Role: ${role ?? 'not assigned'}`,
    )

    if (role === 'admin') {
      await router.push('/admin')
    } else {
      await router.push('/about')
    }
  } catch (error) {
    console.error('Firebase login error:', error)

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage.value = 'Please enter a valid email address.'
        break

      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage.value = 'Incorrect email or password.'
        break

      case 'auth/too-many-requests':
        errorMessage.value =
          'Too many failed attempts. Please try again later.'
        break

      default:
        errorMessage.value = 'Login failed. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <section class="card p-4 shadow-sm">
          <h1 class="text-center mb-4">Sign In</h1>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="loginEmail" class="form-label">
                Email
              </label>

              <input
                id="loginEmail"
                v-model="email"
                type="email"
                class="form-control"
                autocomplete="email"
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
                autocomplete="current-password"
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

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <p class="text-center mt-3 mb-0">
            Do not have an account?
            <RouterLink to="/register">
              Register
            </RouterLink>
          </p>
        </section>
      </div>
    </div>
  </main>
</template>