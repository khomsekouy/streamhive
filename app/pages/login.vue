<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email and password are required.'
    return
  }
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/browse')
  } catch (e) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-sm py-8">
    <h1 class="text-2xl font-bold">Log in</h1>
    <p class="mt-1 text-sm text-zinc-400">Welcome back to StreamHive.</p>

    <form class="mt-6 space-y-4" @submit.prevent="submit">
      <div>
        <label class="label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="input"
          placeholder="you@example.com"
          autocomplete="email"
        />
      </div>

      <div>
        <label class="label" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="input"
          autocomplete="current-password"
        />
      </div>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <button class="btn btn-primary w-full" type="submit" :disabled="loading">
        {{ loading ? 'Logging in…' : 'Log in' }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-zinc-400">
      No account?
      <NuxtLink to="/register" class="text-emerald-400 hover:underline">Sign up</NuxtLink>
    </p>
  </section>
</template>
