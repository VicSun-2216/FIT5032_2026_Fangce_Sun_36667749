<script setup>
import { onMounted, ref } from 'vue'

import authorsData from '../assets/json/authors.json'

const loading = ref(false)
const errorMessage = ref('')
const apiResponse = ref(null)

const getAllBooks = () => {
  loading.value = true
  errorMessage.value = ''
  apiResponse.value = null

  try {
    const books = authorsData.flatMap((author) =>
      author.famousWorks.map((book) => ({
        authorId: author.id,
        authorName: author.name,
        title: book.title,
        year: book.year,
      })),
    )

    apiResponse.value = {
      success: true,
      data: {
        totalBooks: books.length,
        books,
      },
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Failed to load book data:', error)
    errorMessage.value = 'Unable to load book data.'
  } finally {
    loading.value = false
  }
}

onMounted(getAllBooks)
</script>

<template>
  <main class="container py-5">
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <div
          class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4"
        >
          <div>
            <h1 class="mb-1">Get All Book API</h1>

            <p class="text-secondary mb-0">
              JSON response containing all books and their authors.
            </p>
          </div>

          <button
            type="button"
            class="btn btn-primary"
            :disabled="loading"
            @click="getAllBooks"
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