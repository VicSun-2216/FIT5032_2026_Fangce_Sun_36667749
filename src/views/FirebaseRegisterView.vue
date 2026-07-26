<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const handleRegister = async () => {
  errorMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must contain at least 6 characters.'
    return
  }

  try {
    isSubmitting.value = true

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value,
    )
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userCredential.user.email,
      role: 'user',
    })

    console.log('Assigned role: user')

    console.log('Firebase registered user:', userCredential.user)

    window.alert('Firebase registration successful!')

    await router.push('/login')
  } catch (error) {
    console.error('Firebase registration error:', error)

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage.value = 'This email address is already registered.'
        break

      case 'auth/invalid-email':
        errorMessage.value = 'Please enter a valid email address.'
        break

      case 'auth/weak-password':
        errorMessage.value = 'The password is too weak.'
        break

      default:
        errorMessage.value = error.message
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
          <h1 class="text-center mb-4">Create an Account</h1>

          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="registerEmail" class="form-label"> Email </label>

              <input
                id="registerEmail"
                v-model="email"
                type="email"
                class="form-control"
                autocomplete="email"
                required
              />
            </div>

            <div class="mb-3">
              <label for="registerPassword" class="form-label"> Password </label>

              <input
                id="registerPassword"
                v-model="password"
                type="password"
                class="form-control"
                autocomplete="new-password"
                minlength="6"
                required
              />

              <div class="form-text">Password must contain at least 6 characters.</div>
            </div>

            <div class="mb-3">
              <label for="confirmPassword" class="form-label"> Confirm Password </label>

              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="form-control"
                autocomplete="new-password"
                minlength="6"
                required
              />
            </div>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <button type="submit" class="btn btn-success w-100" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creating account...' : 'Register' }}
            </button>
          </form>

          <p class="text-center mt-3 mb-0">
            Already have an account?
            <RouterLink to="/login">Sign in</RouterLink>
          </p>
        </section>
      </div>
    </div>
  </main>
</template>
