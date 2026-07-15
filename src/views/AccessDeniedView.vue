<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7">
        <section class="card p-4 text-center shadow-sm">
          <h1 class="text-danger mb-3">Access Denied</h1>

          <p>
            You must log in before accessing the members-only About page.
          </p>

          <RouterLink to="/login" class="btn btn-primary">
            Go to Login
          </RouterLink>
        </section>
      </div>
    </div>
  </main>
</template>