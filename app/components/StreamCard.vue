<script setup lang="ts">
interface Props {
  id: string
  title: string
  streamer: string
  viewers: number
  thumbnailUrl?: string
  category?: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/stream/${id}`"
    class="card overflow-hidden transition hover:-translate-y-0.5 hover:border-emerald-500"
  >
    <div class="relative aspect-video bg-white/5">
      <img
        v-if="thumbnailUrl"
        :src="thumbnailUrl"
        :alt="title"
        class="h-full w-full object-cover"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center text-zinc-600"
      >
        <span class="text-sm">No thumbnail</span>
      </div>

      <span
        class="absolute left-2 top-2 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white"
      >
        Live
      </span>

      <span
        class="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white"
      >
        {{ viewers.toLocaleString() }} viewers
      </span>
    </div>

    <div class="p-3">
      <div class="line-clamp-2 font-semibold text-zinc-100">{{ title }}</div>
      <div class="mt-1 text-sm text-zinc-400">
        {{ streamer }}
        <span v-if="category"> &middot; {{ category }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
