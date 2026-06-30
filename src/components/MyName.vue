<script setup>
const name = 'Fangce Sun'
</script>

<template>
  <section class="name-card">
    <h2>My name is {{ name }}</h2>
    <p>Welcome to my FIT5032 Vue.js application.</p>
  </section>
</template>

<style scoped>
.name-card {
  margin-top: 20px;
  padding: 16px;
  border: 2px solid #42b883;
  border-radius: 8px;
}

h2 {
  color: #42b883;
}
</style>
