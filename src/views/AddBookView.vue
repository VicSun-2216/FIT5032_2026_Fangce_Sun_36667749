<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <!-- Add Book 表单 -->
        <div class="card shadow-sm p-4">
          <h1 class="text-center mb-4">Add Book</h1>

          <form @submit.prevent="addBook">
            <div class="mb-3">
              <label for="isbn" class="form-label">
                ISBN
              </label>

              <input
                id="isbn"
                v-model.number="isbn"
                type="number"
                class="form-control"
                placeholder="Enter ISBN"
                required
              />
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">
                Book Name
              </label>

              <input
                id="name"
                v-model.trim="name"
                type="text"
                class="form-control"
                placeholder="Enter book name"
                required
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Adding...' : 'Add Book' }}
            </button>
          </form>

          <div
            v-if="message"
            class="alert mt-3 mb-0"
            :class="isSuccess ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>

        <!-- Firestore 查询结果 -->
        <BookList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')
const message = ref('')
const isSuccess = ref(false)
const isSubmitting = ref(false)

const addBook = async () => {
  message.value = ''

  if (!isbn.value || !name.value) {
    isSuccess.value = false
    message.value = 'Please complete all fields.'
    return
  }

  try {
    isSubmitting.value = true

    const docRef = await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value
    })

    isSuccess.value = true
    message.value =
      `Book added successfully. Document ID: ${docRef.id}`

    isbn.value = null
    name.value = ''
  } catch (error) {
    console.error('Error adding book:', error)

    isSuccess.value = false
    message.value = `Failed to add book: ${error.message}`
  } finally {
    isSubmitting.value = false
  }
}
</script>