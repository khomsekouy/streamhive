<script setup lang="ts">
const route = useRoute()
const streamId = route.params.id as string

interface ChatMessage {
  id: number
  user: string
  text: string
}

const messages = ref<ChatMessage[]>([
  { id: 1, user: 'Ada', text: 'hello everyone!' },
  { id: 2, user: 'Ben', text: 'hi from Phnom Penh' },
  { id: 3, user: 'Kim', text: 'first time on this stream, looks great' }
])
const draft = ref('')

function send() {
  const text = draft.value.trim()
  if (!text) return
  messages.value.push({ id: Date.now(), user: 'You', text })
  draft.value = ''
}
</script>

<template>
  <section class="grid gap-4 lg:grid-cols-[1fr_320px]">
    <div>
      <div class="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-stadium-elevated text-zinc-500">
        <div class="text-center">
          <div class="text-lg font-semibold text-zinc-300">Video player placeholder</div>
          <div class="mt-1 text-sm">stream id: {{ streamId }}</div>
        </div>
      </div>

      <div class="mt-4">
        <h1 class="text-xl font-bold">Stream title goes here</h1>
        <div class="mt-1 text-sm text-zinc-400">
          Streamer name &middot; 142 viewers &middot; Coding
        </div>
      </div>
    </div>

    <aside class="card flex h-[600px] flex-col lg:h-auto">
      <div class="border-b border-white/10 px-4 py-3 font-semibold">Live chat</div>

      <div class="flex-1 space-y-2 overflow-y-auto px-4 py-3 text-sm">
        <p v-for="m in messages" :key="m.id">
          <span class="font-semibold text-emerald-400">{{ m.user }}:</span>
          <span class="ml-1 text-zinc-200">{{ m.text }}</span>
        </p>
      </div>

      <form class="flex gap-2 border-t border-white/10 p-3" @submit.prevent="send">
        <input v-model="draft" class="input" placeholder="Send a message" />
        <button type="submit" class="btn btn-primary px-3">Send</button>
      </form>
    </aside>
  </section>
</template>
