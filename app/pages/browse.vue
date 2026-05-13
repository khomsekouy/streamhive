<script setup lang="ts">
const streams = [
  { id: 'abc123', title: 'Coding a Nuxt app', streamer: 'Ada', viewers: 142 },
  { id: 'def456', title: 'Late night chill stream', streamer: 'Ben', viewers: 87 },
  { id: 'ghi789', title: 'Cooking with Kim', streamer: 'Kim', viewers: 305 }
]
</script>

<template>
  <section>
    <h1>Live now</h1>
    <div class="grid">
      <NuxtLink
        v-for="s in streams"
        :key="s.id"
        :to="`/stream/${s.id}`"
        class="card"
      >
        <div class="thumb">LIVE</div>
        <div class="info">
          <div class="title">{{ s.title }}</div>
          <div class="meta">{{ s.streamer }} &middot; {{ s.viewers }} viewers</div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  margin-bottom: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.card {
  background: #1a1d23;
  border: 1px solid #2a2d33;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s;
}

.card:hover {
  transform: translateY(-2px);
  border-color: #6c5ce7;
}

.thumb {
  background: #2a2d33;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #e74c3c;
  letter-spacing: 0.1em;
}

.info {
  padding: 0.75rem 1rem;
}

.title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.meta {
  font-size: 0.875rem;
  color: #888;
}
</style>
