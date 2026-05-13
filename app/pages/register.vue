<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  if (!username.value || !email.value || !password.value) {
    error.value = 'All fields are required.'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }
  loading.value = true
  try {
    await auth.register(username.value, email.value, password.value)
    router.push('/browse')
  } catch (e) {
    error.value = 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-sm py-8">
    <h1 class="text-2xl font-bold">Create your account</h1>
    <p class="mt-1 text-sm text-zinc-400">Join StreamHive in seconds.</p>

    <form class="mt-6 space-y-4" @submit.prevent="submit">
      <div>
        <label class="label" for="username">Username</label>
        <input
          id="username"
          v-model="username"
          class="input"
          placeholder="yourhandle"
          autocomplete="username"
        />
      </div>

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
          autocomplete="new-password"
        />
      </div>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <button class="btn btn-primary w-full" type="submit" :disabled="loading">
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <p class="mt-6 text-center text-sm text-zinc-400">
      Already have an account?
      <NuxtLink to="/login" class="text-emerald-400 hover:underline">Log in</NuxtLink>
    </p>
  </section>
</template>
