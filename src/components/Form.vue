<template>
  <div class="container mt-5 px-3">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="text-center mb-4">User Information Form</h1>

        <form @submit.prevent="submitForm" class="card p-4 shadow-sm">
          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                id="username"
                class="form-control"
                v-model="formData.username"
              />
            </div>

            <div class="col-12 col-md-6 mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="formData.password"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <div class="form-check mt-4">
                <input
                  type="checkbox"
                  id="isAustralian"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                />
                <label for="isAustralian" class="form-check-label">
                  Australian Resident?
                </label>
              </div>
            </div>

            <div class="col-12 col-md-6 mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
              >
                <option disabled value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="4"
              v-model="formData.reason"
            ></textarea>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">
              Submit
            </button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>

        <div
            v-if="submittedCards.length"
            class="mt-4 d-flex flex-wrap justify-content-center"
        >
          <div
            v-for="(card, index) in submittedCards"
            :key="index"
            class="card m-2 submitted-card"
          >
            <div class="card-header">
              User Information
            </div>

            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Username: {{ card.username }}
              </li>
              <li class="list-group-item">
                Password: {{ card.password }}
              </li>
              <li class="list-group-item">
                Australian Resident:
                {{ card.isAustralian ? 'Yes' : 'No' }}
              </li>
              <li class="list-group-item">
                Gender: {{ card.gender }}
              </li>
              <li class="list-group-item">
                Reason: {{ card.reason }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: ''
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value
  })
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: ''
  }
}
</script>

<style scoped>
h1 {
  font-weight: 700;
}

.card {
  border-radius: 12px;
}

.card-header {
  background-color: #275FDA;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.submitted-card {
  width: 100%;
  max-width: 500px;
}

.list-group-item {
  padding: 10px;
}

@media (max-width: 768px) {
  .submitted-card {
    width: 100%;
  }
}
</style>