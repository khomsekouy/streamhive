<template>
  <section class="go-live">
    <h1>Go live</h1>
    <p>Set up your stream details. (We'll wire up a real streaming provider later.)</p>

    <form class="form" @submit.prevent>
      <label>
        <span>Title</span>
        <input v-model="title" placeholder="My awesome stream" />
      </label>

      <label>
        <span>Category</span>
        <input v-model="category" placeholder="Coding, Music, Gaming…" />
      </label>

      <button class="btn" type="submit">Start stream</button>
    </form>
  </section>
</template>

<script setup lang="ts">
const title = ref('')
const category = ref('')
</script>

<style scoped>
.go-live {
  max-width: 480px;
}

h1 {
  margin-bottom: 0.5rem;
}

p {
  color: #888;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

label span {
  font-size: 0.875rem;
  color: #b8b8b8;
}

input {
  padding: 0.6rem 0.75rem;
  background: #1a1d23;
  border: 1px solid #2a2d33;
  border-radius: 6px;
  color: #e6e6e6;
}

.btn {
  padding: 0.75rem 1rem;
  background: #6c5ce7;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
}

.btn:hover {
  filter: brightness(1.1);
}
</style>
