import { defineStore } from 'pinia'
import type { Role } from './auth'

export type UserStatus = 'active' | 'suspended'

export interface ManagedUser {
  id: string
  username: string
  email: string
  role: Role
  status: UserStatus
  joinedAt: string
  lastActiveAt: string
  avatarUrl?: string
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [
      {
        id: 'u_001',
        username: 'aditi',
        email: 'admin@streamhive.com',
        role: 'admin',
        status: 'active',
        joinedAt: '2024-01-12',
        lastActiveAt: '2026-05-13',
      },
      {
        id: 'u_002',
        username: 'mod_sam',
        email: 'moderator@streamhive.com',
        role: 'admin',
        status: 'active',
        joinedAt: '2024-03-04',
        lastActiveAt: '2026-05-12',
      },
      {
        id: 'u_003',
        username: 'goal_machine',
        email: 'creator1@streamhive.com',
        role: 'creator',
        status: 'active',
        joinedAt: '2024-06-18',
        lastActiveAt: '2026-05-13',
      },
      {
        id: 'u_004',
        username: 'tactico',
        email: 'creator2@streamhive.com',
        role: 'creator',
        status: 'active',
        joinedAt: '2024-09-02',
        lastActiveAt: '2026-05-11',
      },
      {
        id: 'u_005',
        username: 'pitchside',
        email: 'creator3@streamhive.com',
        role: 'creator',
        status: 'suspended',
        joinedAt: '2025-01-22',
        lastActiveAt: '2026-04-29',
      },
      {
        id: 'u_006',
        username: 'kop_fan',
        email: 'viewer1@example.com',
        role: 'viewer',
        status: 'active',
        joinedAt: '2025-02-08',
        lastActiveAt: '2026-05-13',
      },
      {
        id: 'u_007',
        username: 'cule_forever',
        email: 'viewer2@example.com',
        role: 'viewer',
        status: 'active',
        joinedAt: '2025-04-15',
        lastActiveAt: '2026-05-13',
      },
      {
        id: 'u_008',
        username: 'gunner_ace',
        email: 'viewer3@example.com',
        role: 'viewer',
        status: 'active',
        joinedAt: '2025-07-30',
        lastActiveAt: '2026-05-10',
      },
      {
        id: 'u_009',
        username: 'rossoneri',
        email: 'viewer4@example.com',
        role: 'viewer',
        status: 'suspended',
        joinedAt: '2025-08-11',
        lastActiveAt: '2026-03-02',
      },
      {
        id: 'u_010',
        username: 'bvb_yellow',
        email: 'viewer5@example.com',
        role: 'viewer',
        status: 'active',
        joinedAt: '2025-11-04',
        lastActiveAt: '2026-05-09',
      },
    ] as ManagedUser[],
  }),

  getters: {
    total: (state) => state.users.length,
    admins: (state) => state.users.filter((u) => u.role === 'admin'),
    creators: (state) => state.users.filter((u) => u.role === 'creator'),
    viewers: (state) => state.users.filter((u) => u.role === 'viewer'),
    suspended: (state) => state.users.filter((u) => u.status === 'suspended'),
    byEmail: (state) => (email: string) => {
      return state.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    },
  },

  actions: {
    setRole(userId: string, role: Role) {
      const user = this.users.find((u) => u.id === userId)
      if (user) user.role = role
    },

    setStatus(userId: string, status: UserStatus) {
      const user = this.users.find((u) => u.id === userId)
      if (user) user.status = status
    },

    removeUser(userId: string) {
      this.users = this.users.filter((u) => u.id !== userId)
    },
  },
})
