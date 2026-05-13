<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const title = ref('')
const category = ref('')

function startStream() {
  if (!auth.isLoggedIn) return
  // Will wire up to backend later.
  alert(`(stub) Would start stream: ${title.value} [${category.value}]`)
}
</script>

<template>
  <section class="mx-auto max-w-lg">
    <h1 class="text-2xl font-bold">Go live</h1>
    <p class="mt-1 text-zinc-400">
      Set up your stream details. (We'll wire up a real streaming provider later.)
    </p>

    <div
      v-if="!auth.isLoggedIn"
      class="mt-6 rounded-lg border border-amber-700/40 bg-amber-900/20 p-4 text-sm text-amber-200"
    >
      You need to <NuxtLink to="/login" class="underline">log in</NuxtLink> before going live.
    </div>

    <form class="mt-6 space-y-4" @submit.prevent="startStream">
      <div>
        <label class="label" for="title">Title</label>
        <input id="title" v-model="title" class="input" placeholder="My awesome stream" />
      </div>

      <div>
        <label class="label" for="category">Category</label>
        <input
          id="category"
          v-model="category"
          class="input"
          placeholder="Coding, Music, Gaming…"
        />
      </div>

      <button class="btn btn-primary" type="submit" :disabled="!auth.isLoggedIn">
        Start stream
      </button>
    </form>
  </section>
</template>
