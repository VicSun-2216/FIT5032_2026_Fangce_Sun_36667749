<template>
  <div class="container mt-5 px-3">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-10">
        <h1 class="text-center mb-4">User Information Form</h1>

        <form
          class="card p-4 shadow-sm"
          novalidate
          @submit.prevent="submitForm"
        >
          <div class="row">
            <!-- Username -->
            <div class="col-12 col-md-6 mb-3">
              <label for="username" class="form-label">
                Username
              </label>

              <input
                id="username"
                v-model="formData.username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.username }"
                @blur="validateName(true)"
                @input="validateName(false)"
              />

              <div
                v-if="errors.username"
                class="invalid-feedback"
              >
                {{ errors.username }}
              </div>
            </div>

            <!-- Password -->
            <div class="col-12 col-md-6 mb-3">
              <label for="password" class="form-label">
                Password
              </label>

              <input
                id="password"
                v-model="formData.password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                @blur="validatePassword(true)"
                @input="validatePassword(false)"
              />

              <div
                v-if="errors.password"
                class="invalid-feedback"
              >
                {{ errors.password }}
              </div>

              <!-- Confirm Password -->
              <div class="mt-3">
                <label for="confirmPassword" class="form-label">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.confirmPassword }"
                  @blur="validateConfirmPassword(true)"
                  @input="validateConfirmPassword(false)"
                />

                <div
                  v-if="errors.confirmPassword"
                  class="invalid-feedback"
                >
                  {{ errors.confirmPassword }}
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Australian Resident -->
            <div class="col-12 col-md-6 mb-3">
              <div class="form-check mt-md-4">
                <input
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  type="checkbox"
                  class="form-check-input"
                />

                <label
                  for="isAustralian"
                  class="form-check-label"
                >
                  Australian Resident?
                </label>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-12 col-md-6 mb-3">
              <label for="gender" class="form-label">
                Gender
              </label>

              <select
                id="gender"
                v-model="formData.gender"
                class="form-select"
                :class="{ 'is-invalid': errors.gender }"
                @change="validateGender"
              >
                <option disabled value="">
                  Select gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>

              <div
                v-if="errors.gender"
                class="invalid-feedback"
              >
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">
              Reason for joining
            </label>

            <textarea
              id="reason"
              v-model="formData.reason"
              class="form-control"
              rows="4"
              maxlength="200"
              :class="{ 'is-invalid': errors.reason }"
              @blur="validateReason(true)"
              @input="validateReason(false)"
            ></textarea>

            <div
              v-if="errors.reason"
              class="invalid-feedback"
            >
              {{ errors.reason }}
            </div>

            <div class="form-text text-end">
              {{ formData.reason.length }}/200
            </div>
          </div>

          <!-- Buttons -->
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary me-2"
            >
              Submit
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="clearForm"
            >
              Clear
            </button>
          </div>
        </form>

        <!-- PrimeVue DataTable -->
        <div
          v-if="submittedCards.length > 0"
          class="mt-5"
        >
          <h2 class="text-center mb-3">
            Submitted User Information
          </h2>

          <div class="table-container">
            <DataTable
              :value="submittedCards"
              striped-rows
              show-gridlines
              paginator
              :rows="5"
              :rows-per-page-options="[5, 10, 20]"
              table-style="min-width: 55rem"
            >
              <Column
                field="username"
                header="Username"
                sortable
              />

              <Column
                field="password"
                header="Password"
              />

              <Column
                header="Australian Resident"
                sortable
              >
                <template #body="{ data }">
                  {{ data.isAustralian ? 'Yes' : 'No' }}
                </template>
              </Column>

              <Column
                field="gender"
                header="Gender"
                sortable
              />

              <Column
                field="reason"
                header="Reason"
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const createEmptyForm = () => ({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

const createEmptyErrors = () => ({
  username: null,
  password: null,
  confirmPassword: null,
  gender: null,
  reason: null
})

const formData = ref(createEmptyForm())
const errors = ref(createEmptyErrors())
const submittedCards = ref([])

/**
 * Validate username.
 * Username must contain at least three characters.
 */
const validateName = (showError = true) => {
  const username = formData.value.username.trim()

  if (username.length < 3) {
    errors.value.username = showError
      ? 'Name must be at least 3 characters'
      : null

    return false
  }

  errors.value.username = null
  return true
}

/**
 * Validate confirm password.
 * It must match the original password.
 */
const validateConfirmPassword = (showError = true) => {
  const confirmPassword = formData.value.confirmPassword
  const password = formData.value.password

  if (!confirmPassword) {
    errors.value.confirmPassword = showError
      ? 'Please confirm your password'
      : null

    return false
  }

  if (confirmPassword !== password) {
    errors.value.confirmPassword = showError
      ? 'Passwords do not match'
      : null

    return false
  }

  errors.value.confirmPassword = null
  return true
}

/**
 * Validate password strength.
 * It requires:
 * - at least eight characters
 * - one uppercase letter
 * - one lowercase letter
 * - one number
 * - one special character
 */
const validatePassword = (showError = true) => {
  const password = formData.value.password

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialCharacter =
    /[!@#$%^&*(),.?":{}|<>]/.test(password)

  let message = null

  if (password.length < 8) {
    message = 'Password must be at least 8 characters long'
  } else if (!hasUpperCase) {
    message =
      'Password must contain at least one uppercase letter'
  } else if (!hasLowerCase) {
    message =
      'Password must contain at least one lowercase letter'
  } else if (!hasNumber) {
    message =
      'Password must contain at least one number'
  } else if (!hasSpecialCharacter) {
    message =
      'Password must contain at least one special character'
  }

  errors.value.password =
    showError && message ? message : null

  /*
   * When the original password changes,
   * check the confirmation password again.
   */
  if (formData.value.confirmPassword) {
    validateConfirmPassword(showError)
  }

  return message === null
}

/**
 * Validate gender selection.
 */
const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender = 'Please select a gender'
    return false
  }

  errors.value.gender = null
  return true
}

/**
 * Validate the reason.
 * It must contain between 10 and 200 characters.
 */
const validateReason = (showError = true) => {
  const reason = formData.value.reason.trim()

  let message = null

  if (reason.length < 10) {
    message = 'Reason must be at least 10 characters'
  } else if (reason.length > 200) {
    message = 'Reason must not exceed 200 characters'
  }

  errors.value.reason =
    showError && message ? message : null

  return message === null
}

/**
 * Validate all form fields and submit valid data.
 */
const submitForm = () => {
  const isNameValid = validateName(true)
  const isPasswordValid = validatePassword(true)
  const isConfirmPasswordValid =
    validateConfirmPassword(true)
  const isGenderValid = validateGender()
  const isReasonValid = validateReason(true)

  const isFormValid =
    isNameValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isGenderValid &&
    isReasonValid

  if (!isFormValid) {
    return
  }

  submittedCards.value.push({
    username: formData.value.username.trim(),
    password: formData.value.password,
    isAustralian: formData.value.isAustralian,
    gender: formData.value.gender,
    reason: formData.value.reason.trim()
  })

  clearForm()
}

/**
 * Clear the form and all validation messages.
 */
const clearForm = () => {
  formData.value = createEmptyForm()
  errors.value = createEmptyErrors()
}
</script>

<style scoped>
h1 {
  font-weight: 700;
}

h2 {
  font-weight: 600;
}

.card {
  border-radius: 12px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>