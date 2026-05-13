<template>
  <section class="hero">
    <h1>Welcome to StreamHive</h1>
    <p>A place to watch and broadcast live streams.</p>
    <div class="cta">
      <NuxtLink to="/browse" class="btn primary">Browse streams</NuxtLink>
      <NuxtLink to="/go-live" class="btn">Start streaming</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

p {
  color: #b8b8b8;
  margin-bottom: 2rem;
}

.cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  color: #fff;
  border: 1px solid #333;
}

.btn.primary {
  background: #6c5ce7;
  border-color: #6c5ce7;
}

.btn:hover {
  filter: brightness(1.1);
}
</style>
