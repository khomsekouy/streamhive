<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const searchQuery = ref('')

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-white/10 bg-stadium-elevated/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold text-white">
          <span class="grid h-8 w-8 place-items-center rounded-md bg-emerald-500/15 text-emerald-400">
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.31L18.5 8 12 11.69 5.5 8 12 4.31ZM5 9.74l6 3.41v7.1l-6-3.33V9.74Zm14 7.18-6 3.33v-7.1l6-3.41v7.18Z" />
            </svg>
          </span>
          <span>Stream<span class="text-emerald-400">Hive</span></span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 text-sm font-medium md:flex">
          <NuxtLink
            to="/"
            class="relative rounded-md px-3 py-2 text-zinc-300 transition hover:text-white"
            exact-active-class="!text-emerald-400 [&>span]:!block"
          >
            Live
            <span class="pointer-events-none absolute inset-x-3 -bottom-0.5 hidden h-0.5 rounded-full bg-emerald-400" />
          </NuxtLink>
          <NuxtLink
            to="/matches"
            class="relative rounded-md px-3 py-2 text-zinc-300 transition hover:text-white"
            active-class="!text-emerald-400 [&>span]:!block"
          >
            Matches
            <span class="pointer-events-none absolute inset-x-3 -bottom-0.5 hidden h-0.5 rounded-full bg-emerald-400" />
          </NuxtLink>
          <NuxtLink
            to="/teams"
            class="relative rounded-md px-3 py-2 text-zinc-300 transition hover:text-white"
            active-class="!text-emerald-400 [&>span]:!block"
          >
            Teams
            <span class="pointer-events-none absolute inset-x-3 -bottom-0.5 hidden h-0.5 rounded-full bg-emerald-400" />
          </NuxtLink>
          <NuxtLink
            to="/leagues"
            class="relative rounded-md px-3 py-2 text-zinc-300 transition hover:text-white"
            active-class="!text-emerald-400 [&>span]:!block"
          >
            Leagues
            <span class="pointer-events-none absolute inset-x-3 -bottom-0.5 hidden h-0.5 rounded-full bg-emerald-400" />
          </NuxtLink>
        </nav>

        <div class="relative ml-auto hidden flex-1 max-w-md lg:block">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search teams, leagues or matches..."
            class="w-full rounded-full border border-white/10 bg-stadium-card py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div class="ml-auto flex items-center gap-3 lg:ml-0">
          <button
            type="button"
            aria-label="Notifications"
            class="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-white/20 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke-linejoin="round" />
              <path d="M10 19a2 2 0 0 0 4 0" stroke-linecap="round" />
            </svg>
          </button>

          <template v-if="auth.isLoggedIn">
            <span class="hidden text-sm text-zinc-400 sm:inline">Hi, {{ auth.user?.username }}</span>
            <button class="btn btn-ghost px-3 py-1.5 text-sm" @click="handleLogout">Log out</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn btn-ghost px-4 py-1.5 text-sm">Sign in</NuxtLink>
            <NuxtLink to="/register" class="btn btn-primary px-4 py-1.5 text-sm">Sign up</NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      <slot />
    </main>

    <footer class="border-t border-white/10 py-4 text-center text-sm text-zinc-500">
      &copy; {{ new Date().getFullYear() }} StreamHive
    </footer>
  </div>
</template>
