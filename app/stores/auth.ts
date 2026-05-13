import { defineStore } from 'pinia'

export type Role = 'viewer' | 'creator' | 'admin'

export interface User {
  id: string
  username: string
  email: string
  role: Role
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isCreator: (state) => state.user?.role === 'creator' || state.user?.role === 'admin',
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email: string, _password: string) {
      // Mock — replace with real API call once backend exists.
      await new Promise((resolve) => setTimeout(resolve, 300))
      this.user = {
        id: 'u_demo',
        username: email.split('@')[0] || 'demo',
        email,
        role: 'viewer'
      }
      this.token = 'mock-token'
    },

    async register(username: string, email: string, _password: string) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      this.user = {
        id: 'u_demo',
        username,
        email,
        role: 'viewer'
      }
      this.token = 'mock-token'
    },

    logout() {
      this.user = null
      this.token = null
    }
  }
})
