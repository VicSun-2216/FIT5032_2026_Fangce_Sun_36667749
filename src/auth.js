import { ref } from 'vue'

export const isAuthenticated = ref(
  localStorage.getItem('isAuthenticated') === 'true'
)

export function login(username, password) {
  const validUsername = 'admin'
  const validPassword = 'password123'

  if (username === validUsername && password === validPassword) {
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    return true
  }

  return false
}

export function logout() {
  isAuthenticated.value = false
  localStorage.removeItem('isAuthenticated')
}
