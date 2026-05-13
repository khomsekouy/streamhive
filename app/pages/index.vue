<script setup lang="ts">
interface LiveMatch {
  id: string
  homeTeam: string
  homeColor: string
  homeShort: string
  awayTeam: string
  awayColor: string
  awayShort: string
  homeScore: number
  awayScore: number
  minute: string
  league: string
  featured?: boolean
}

interface UpcomingMatch {
  id: string
  time: string
  homeTeam: string
  homeColor: string
  homeShort: string
  awayTeam: string
  awayColor: string
  awayShort: string
  league: string
}

interface Scorer {
  rank: number
  name: string
  goals: number
  initials: string
  color: string
}

const liveMatches: LiveMatch[] = [
  { id: '1', homeTeam: 'Barcelona', homeColor: 'bg-red-700', homeShort: 'FCB', awayTeam: 'Real Madrid', awayColor: 'bg-zinc-100', awayShort: 'RMA', homeScore: 2, awayScore: 1, minute: "78'", league: 'La Liga', featured: true },
  { id: '2', homeTeam: 'Man United', homeColor: 'bg-red-600', homeShort: 'MUN', awayTeam: 'Arsenal', awayColor: 'bg-red-500', awayShort: 'ARS', homeScore: 1, awayScore: 0, minute: "63'", league: 'Premier League' },
  { id: '3', homeTeam: 'Bayern Munich', homeColor: 'bg-red-600', homeShort: 'BAY', awayTeam: 'Dortmund', awayColor: 'bg-yellow-400', awayShort: 'BVB', homeScore: 0, awayScore: 0, minute: "45+2'", league: 'Bundesliga' },
  { id: '4', homeTeam: 'PSG', homeColor: 'bg-blue-800', homeShort: 'PSG', awayTeam: 'Marseille', awayColor: 'bg-sky-400', awayShort: 'OM', homeScore: 1, awayScore: 1, minute: "31'", league: 'Ligue 1' }
]

const upcoming: UpcomingMatch[] = [
  { id: 'u1', time: '18:00', homeTeam: 'Chelsea', homeColor: 'bg-blue-600', homeShort: 'CHE', awayTeam: 'Tottenham', awayColor: 'bg-zinc-100', awayShort: 'TOT', league: 'Premier League' },
  { id: 'u2', time: '20:30', homeTeam: 'AC Milan', homeColor: 'bg-red-600', homeShort: 'MIL', awayTeam: 'Inter Milan', awayColor: 'bg-blue-700', awayShort: 'INT', league: 'Serie A' },
  { id: 'u3', time: '23:00', homeTeam: 'Al Nassr', homeColor: 'bg-yellow-500', homeShort: 'NAS', awayTeam: 'Al Hilal', awayColor: 'bg-blue-500', awayShort: 'HIL', league: 'Saudi Pro League' }
]

const topScorers: Scorer[] = [
  { rank: 1, name: 'K. Mbappé', goals: 28, initials: 'KM', color: 'bg-blue-600' },
  { rank: 2, name: 'H. Kane', goals: 24, initials: 'HK', color: 'bg-red-600' },
  { rank: 3, name: 'E. Haaland', goals: 22, initials: 'EH', color: 'bg-sky-500' }
]
</script>

<template>
  <div class="space-y-12">
    <!-- HERO -->
    <section class="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-stadium-card via-stadium to-emerald-950/40">
      <!-- decorative pitch glow on the right -->
      <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-3/5 md:block">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.12),_transparent_55%)]" />
        <!-- subtle field lines -->
        <svg class="absolute inset-0 h-full w-full opacity-[0.07]" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="500" cy="200" r="80" stroke="white" stroke-width="2" fill="none" />
          <line x1="500" y1="0" x2="500" y2="400" stroke="white" stroke-width="2" />
          <rect x="400" y="120" width="120" height="160" stroke="white" stroke-width="2" fill="none" />
        </svg>
      </div>

      <div class="relative grid gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
        <!-- LEFT: copy + CTA -->
        <div class="flex flex-col justify-center">
          <div class="mb-5 flex flex-wrap items-center gap-2">
            <span class="badge-live">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Live Now
            </span>
            <span class="rounded-md border border-white/10 bg-stadium-card/80 px-2 py-0.5 text-xs font-medium text-zinc-300">
              24 Matches Live
            </span>
          </div>

          <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Live <span class="text-emerald-400">Football</span>
          </h1>
          <p class="mt-4 max-w-md text-zinc-400">
            Watch every goal, every moment — live football from top leagues around the world.
          </p>

          <div class="mt-7">
            <NuxtLink to="/browse" class="btn btn-primary px-6 py-3 text-base font-semibold">
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                <path d="M8 5v14l11-7L8 5Z" />
              </svg>
              Watch Live Now
            </NuxtLink>
          </div>
        </div>

        <!-- RIGHT: top scorers card -->
        <div class="flex items-center justify-end">
          <div class="w-full max-w-xs rounded-xl border border-white/10 bg-stadium-card/80 p-4 backdrop-blur">
            <div class="mb-3 flex items-center justify-between">
              <h3 class="text-sm font-semibold text-white">Top Scorers</h3>
            </div>

            <ul class="space-y-3">
              <li v-for="s in topScorers" :key="s.rank" class="flex items-center gap-3">
                <span class="w-4 text-sm font-semibold text-zinc-400">{{ s.rank }}</span>
                <span
                  :class="['grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white', s.color]"
                >
                  {{ s.initials }}
                </span>
                <div class="flex-1">
                  <div class="text-sm font-medium text-white">{{ s.name }}</div>
                  <div class="text-xs text-zinc-400">{{ s.goals }} Goals</div>
                </div>
              </li>
            </ul>

            <NuxtLink to="/leagues" class="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm text-zinc-300 hover:text-white">
              View all
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- LIVE NOW -->
    <section>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="flex items-center gap-2 text-lg font-bold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-emerald-400">
            <path d="M5 12a7 7 0 0 1 14 0M2 12a10 10 0 0 1 20 0" stroke-linecap="round" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          Live Now
        </h2>
        <NuxtLink to="/browse" class="flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
          View all live
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="m in liveMatches"
          :key="m.id"
          :to="`/stream/${m.id}`"
          :class="[
            'card flex flex-col p-4 transition hover:border-white/20',
            m.featured ? 'border-emerald-500/70 ring-1 ring-emerald-500/30' : ''
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="badge-live">Live</span>
              <span class="text-xs font-semibold text-emerald-400">{{ m.minute }}</span>
            </div>
            <span class="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/10 text-emerald-400">
              <svg viewBox="0 0 24 24" fill="currentColor" class="h-3 w-3">
                <path d="M8 5v14l11-7L8 5Z" />
              </svg>
            </span>
          </div>

          <div class="mt-4 flex items-center justify-between gap-2">
            <div class="flex flex-1 flex-col items-center gap-2">
              <span :class="['grid h-12 w-12 place-items-center rounded-full text-xs font-bold text-zinc-950', m.homeColor]">
                {{ m.homeShort }}
              </span>
              <span class="text-xs text-zinc-300">{{ m.homeTeam }}</span>
            </div>

            <div class="text-2xl font-bold tabular-nums text-white">
              {{ m.homeScore }} <span class="text-zinc-500">-</span> {{ m.awayScore }}
            </div>

            <div class="flex flex-1 flex-col items-center gap-2">
              <span :class="['grid h-12 w-12 place-items-center rounded-full text-xs font-bold text-zinc-950', m.awayColor]">
                {{ m.awayShort }}
              </span>
              <span class="text-xs text-zinc-300">{{ m.awayTeam }}</span>
            </div>
          </div>

          <div class="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-400">
            {{ m.league }}
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- UPCOMING -->
    <section>
      <div class="mb-4 flex items-center justify-between">
        <h2 class="flex items-center gap-2 text-lg font-bold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-emerald-400">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" stroke-linecap="round" />
          </svg>
          Upcoming Live
        </h2>
        <NuxtLink to="/matches" class="flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
          View full schedule
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <ul class="card divide-y divide-white/10">
        <li
          v-for="m in upcoming"
          :key="m.id"
          class="grid grid-cols-2 items-center gap-4 px-5 py-4 md:grid-cols-[100px_1fr_1fr_140px]"
        >
          <div>
            <div class="font-semibold text-white">{{ m.time }}</div>
            <div class="text-xs text-zinc-500">Today</div>
          </div>

          <div class="col-span-2 flex items-center justify-center gap-4 md:col-span-1">
            <span class="text-sm font-medium text-zinc-200">{{ m.homeTeam }}</span>
            <span :class="['grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold text-zinc-950', m.homeColor]">
              {{ m.homeShort }}
            </span>
            <span class="rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-400">vs</span>
            <span :class="['grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold text-zinc-950', m.awayColor]">
              {{ m.awayShort }}
            </span>
            <span class="text-sm font-medium text-zinc-200">{{ m.awayTeam }}</span>
          </div>

          <div class="hidden text-sm text-zinc-400 md:block">{{ m.league }}</div>

          <button class="btn btn-ghost justify-self-end px-3 py-1.5 text-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" stroke-linejoin="round" />
              <path d="M10 19a2 2 0 0 0 4 0" stroke-linecap="round" />
            </svg>
            Notify Me
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
