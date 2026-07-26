import { ref } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export const currentUser = ref(auth.currentUser)
export const isAuthenticated = ref(Boolean(auth.currentUser))
export const userRole = ref(null)
export const isAuthLoading = ref(true)

let resolveAuthReady

export const authReady = new Promise((resolve) => {
  resolveAuthReady = resolve
})

let hasLoadedInitialState = false

export const loadUserRole = async (user = auth.currentUser) => {
  if (!user) {
    userRole.value = null
    return null
  }

  try {
    const userDocument = await getDoc(
      doc(db, 'users', user.uid)
    )

    if (!userDocument.exists()) {
      console.warn('No Firestore role document found for this user.')
      userRole.value = null
      return null
    }

    const role = userDocument.data().role ?? null

    userRole.value = role

    console.log('Current user role:', role)

    return role
  } catch (error) {
    console.error('Failed to load user role:', error)

    userRole.value = null
    return null
  }
}

onAuthStateChanged(auth, async (user) => {
  isAuthLoading.value = true

  currentUser.value = user
  isAuthenticated.value = Boolean(user)

  console.log('Firebase authentication state changed:', user)
  console.log('Current user email:', user?.email ?? null)

  if (user) {
    await loadUserRole(user)
  } else {
    userRole.value = null
  }

  isAuthLoading.value = false

  if (!hasLoadedInitialState) {
    hasLoadedInitialState = true
    resolveAuthReady()
  }
})

export const logout = async () => {
  await signOut(auth)

  currentUser.value = null
  isAuthenticated.value = false
  userRole.value = null

  console.log('Firebase logout successful!')
  console.log('Current Firebase user after logout:', auth.currentUser)
  console.log('Current user role after logout:', userRole.value)
}