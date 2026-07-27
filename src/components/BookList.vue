<template>
  <div class="card shadow-sm p-4 mt-4">
    <h2 class="text-center mb-3">
      Firestore Query Results
    </h2>

    <p class="text-center text-muted">
      ISBN &gt; 1000, ordered by ISBN ascending, limited to 2 books
    </p>

    <button
      type="button"
      class="btn btn-outline-primary mb-3"
      :disabled="loading"
      @click="loadBooks"
    >
      {{ loading ? 'Loading...' : 'Run Query' }}
    </button>

    <div
      v-if="actionMessage"
      class="alert alert-success"
    >
      {{ actionMessage }}
    </div>

    <div
      v-if="errorMessage"
      class="alert alert-danger"
    >
      {{ errorMessage }}
    </div>

    <ul
      v-if="books.length > 0"
      class="list-group"
    >
      <li
        v-for="book in books"
        :key="book.id"
        class="list-group-item"
      >
        <!-- Edit mode -->
        <div v-if="editingId === book.id">
          <div class="mb-2">
            <label
              :for="`edit-name-${book.id}`"
              class="form-label"
            >
              Book Name
            </label>

            <input
              :id="`edit-name-${book.id}`"
              v-model.trim="editName"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label
              :for="`edit-isbn-${book.id}`"
              class="form-label"
            >
              ISBN
            </label>

            <input
              :id="`edit-isbn-${book.id}`"
              v-model.number="editIsbn"
              type="number"
              class="form-control"
              required
            />
          </div>

          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-success"
              :disabled="processingId === book.id"
              @click="saveBook(book.id)"
            >
              {{
                processingId === book.id
                  ? 'Saving...'
                  : 'Save'
              }}
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              :disabled="processingId === book.id"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Display mode -->
        <div
          v-else
          class="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{{ book.name }}</strong>

            <span class="badge bg-primary ms-2">
              ISBN: {{ book.isbn }}
            </span>
          </div>

          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-warning"
              @click="startEdit(book)"
            >
              Edit
            </button>

            <button
              type="button"
              class="btn btn-sm btn-danger"
              :disabled="processingId === book.id"
              @click="deleteBook(book)"
            >
              {{
                processingId === book.id
                  ? 'Deleting...'
                  : 'Delete'
              }}
            </button>
          </div>
        </div>
      </li>
    </ul>

    <p
      v-else-if="!loading"
      class="text-center text-muted mb-0"
    >
      No matching books found.
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { db } from '../firebase'

const books = ref([])
const loading = ref(false)
const errorMessage = ref('')
const actionMessage = ref('')

const editingId = ref('')
const editName = ref('')
const editIsbn = ref(null)
const processingId = ref('')

const loadBooks = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(2)
    )

    const querySnapshot = await getDocs(booksQuery)

    books.value = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }))
  } catch (error) {
    console.error('Error retrieving books:', error)

    errorMessage.value =
      `Failed to retrieve books: ${error.message}`
  } finally {
    loading.value = false
  }
}

const startEdit = (book) => {
  actionMessage.value = ''
  errorMessage.value = ''

  editingId.value = book.id
  editName.value = book.name
  editIsbn.value = Number(book.isbn)
}

const cancelEdit = () => {
  editingId.value = ''
  editName.value = ''
  editIsbn.value = null
}

const saveBook = async (bookId) => {
  actionMessage.value = ''
  errorMessage.value = ''

  if (!editName.value || !editIsbn.value) {
    errorMessage.value = 'Please complete all fields.'
    return
  }

  try {
    processingId.value = bookId

    const bookReference = doc(db, 'books', bookId)

    await updateDoc(bookReference, {
      name: editName.value,
      isbn: Number(editIsbn.value)
    })

    actionMessage.value = 'Book updated successfully.'

    cancelEdit()
    await loadBooks()
  } catch (error) {
    console.error('Error updating book:', error)

    errorMessage.value =
      `Failed to update book: ${error.message}`
  } finally {
    processingId.value = ''
  }
}

const deleteBook = async (book) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${book.name}"?`
  )

  if (!confirmed) {
    return
  }

  actionMessage.value = ''
  errorMessage.value = ''

  try {
    processingId.value = book.id

    const bookReference = doc(db, 'books', book.id)

    await deleteDoc(bookReference)

    actionMessage.value = 'Book deleted successfully.'

    if (editingId.value === book.id) {
      cancelEdit()
    }

    await loadBooks()
  } catch (error) {
    console.error('Error deleting book:', error)

    errorMessage.value =
      `Failed to delete book: ${error.message}`
  } finally {
    processingId.value = ''
  }
}

onMounted(loadBooks)
</script>