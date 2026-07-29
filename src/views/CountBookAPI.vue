<script setup>
import { onMounted, ref } from 'vue'

import authorsData from '../assets/json/authors.json'

const loading = ref(false)
const errorMessage = ref('')
const apiResponse = ref(null)

const getApiData = async () => {
  loading.value = true
  errorMessage.value = ''
  apiResponse.value = null

  try {
    const authors = authorsData

    const totalBooks = authors.reduce((total, author) => {
      return total + author.famousWorks.length
    }, 0)

    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authors.length,
        totalBooks,
        authors: authors.map((author) => ({
          name: author.name,
          bookCount: author.famousWorks.length,
        })),
      },
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Failed to generate API response:', error)

    errorMessage.value = 'Unable to load author and book data.'
  } finally {
    loading.value = false
  }
}

onMounted(getApiData)
</script>

<template>
  <main class="container py-5">
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h1 class="mb-1">Count Book API</h1>
            <p class="text-secondary mb-0">
              JSON response containing author and book statistics.
            </p>
          </div>

          <button
            type="button"
            class="btn btn-primary"
            :disabled="loading"
            @click="getApiData"
          >
            {{ loading ? 'Loading...' : 'Refresh API' }}
          </button>
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <pre
          v-if="apiResponse"
          class="api-response bg-dark text-light rounded p-4 mb-0"
        >{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>
  </main>
</template>

<style scoped>
.api-response {
  min-height: 300px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>