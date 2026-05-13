<script setup lang="ts">
const streams = [
  { id: 'abc123', title: 'Coding a Nuxt app from scratch', streamer: 'Ada', viewers: 142, category: 'Coding' },
  { id: 'def456', title: 'Late night chill stream', streamer: 'Ben', viewers: 87, category: 'Just Chatting' },
  { id: 'ghi789', title: 'Cooking with Kim — Khmer noodle special', streamer: 'Kim', viewers: 305, category: 'Cooking' },
  { id: 'jkl012', title: 'Speedrun attempt #42', streamer: 'Leo', viewers: 1203, category: 'Gaming' },
  { id: 'mno345', title: 'Lo-fi beats while I draw', streamer: 'Mia', viewers: 64, category: 'Art' },
  { id: 'pqr678', title: 'Q&A — ask me anything about web dev', streamer: 'Nico', viewers: 512, category: 'Coding' }
]
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between">
      <h1 class="text-2xl font-bold">Live now</h1>
      <span class="text-sm text-zinc-400">{{ streams.length }} streams</span>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StreamCard
        v-for="s in streams"
        :key="s.id"
        :id="s.id"
        :title="s.title"
        :streamer="s.streamer"
        :viewers="s.viewers"
        :category="s.category"
      />
    </div>
  </section>
</template>
