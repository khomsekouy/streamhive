<script setup lang="ts">
type MatchStatus = "LIVE" | "UPCOMING" | "FINISHED"

interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  homeLogo: string
  awayLogo: string
  league: string
  time: string
  minute?: string
  score?: string
  status: MatchStatus
  viewers?: string
}

const search = ref("")
const activeStatus = ref<"ALL" | MatchStatus>("ALL")
const activeLeague = ref("All")

const matches: Match[] = [
  {
    id: 1,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "La Liga",
    time: "Now",
    minute: "78'",
    score: "2 - 1",
    status: "LIVE",
    viewers: "2.4K",
  },
  {
    id: 2,
    homeTeam: "Man United",
    awayTeam: "Arsenal",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "Premier League",
    time: "Now",
    minute: "63'",
    score: "1 - 0",
    status: "LIVE",
    viewers: "1.8K",
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "Bundesliga",
    time: "Now",
    minute: "45+2'",
    score: "0 - 0",
    status: "LIVE",
    viewers: "980",
  },
  {
    id: 4,
    homeTeam: "Chelsea",
    awayTeam: "Tottenham",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "Premier League",
    time: "18:00 Today",
    status: "UPCOMING",
  },
  {
    id: 5,
    homeTeam: "AC Milan",
    awayTeam: "Inter Milan",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "Serie A",
    time: "20:30 Today",
    status: "UPCOMING",
  },
  {
    id: 6,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "Ligue 1",
    time: "23:00 Today",
    status: "UPCOMING",
  },
  {
    id: 7,
    homeTeam: "Liverpool",
    awayTeam: "Man City",
    homeLogo: "/teams/default.svg",
    awayLogo: "/teams/default.svg",
    league: "Premier League",
    time: "Yesterday",
    score: "3 - 2",
    status: "FINISHED",
  },
]

const leagues = computed(() => [
  "All",
  ...new Set(matches.map((match) => match.league)),
])

const statusTabs = [
  { label: "All", value: "ALL" },
  { label: "Live", value: "LIVE" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Finished", value: "FINISHED" },
] as const

const filteredMatches = computed(() => {
  return matches.filter((match) => {
    const keyword = search.value.toLowerCase()

    const matchesSearch =
      match.homeTeam.toLowerCase().includes(keyword) ||
      match.awayTeam.toLowerCase().includes(keyword) ||
      match.league.toLowerCase().includes(keyword)

    const matchesStatus =
      activeStatus.value === "ALL" || match.status === activeStatus.value

    const matchesLeague =
      activeLeague.value === "All" || match.league === activeLeague.value

    return matchesSearch && matchesStatus && matchesLeague
  })
})

const getStatusClass = (status: MatchStatus) => {
  return {
    LIVE: "status-live",
    UPCOMING: "status-upcoming",
    FINISHED: "status-finished",
  }[status]
}
</script>

<template>
  <div class="matches-page">
    <div class="container">
      <!-- Page Header -->
      <section class="page-header">
        <div>
          <div class="badge">⚽ Football Center</div>

          <h1>All Football Matches</h1>

          <p>
            Browse live, upcoming, and finished football matches from top leagues.
          </p>
        </div>

        <div class="header-card">
          <span>{{ matches.length }}</span>
          <p>Total Matches</p>
        </div>
      </section>

      <!-- Filters -->
      <section class="filters-card">
        <div class="search-box">
          <span>🔍</span>
          <input
            v-model="search"
            type="text"
            placeholder="Search teams, leagues, or matches..."
          >
        </div>

        <div class="status-tabs">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            type="button"
            :class="{ selected: activeStatus === tab.value }"
            @click="activeStatus = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="league-tabs">
          <button
            v-for="league in leagues"
            :key="league"
            type="button"
            :class="{ selected: activeLeague === league }"
            @click="activeLeague = league"
          >
            {{ league }}
          </button>
        </div>
      </section>

      <!-- Match List -->
      <section class="match-list">
        <div
          v-for="match in filteredMatches"
          :key="match.id"
          class="match-row"
          :class="{ live: match.status === 'LIVE' }"
        >
          <div class="match-left">
            <div class="status-area">
              <span class="status-badge" :class="getStatusClass(match.status)">
                {{ match.status }}
              </span>

              <small v-if="match.minute">{{ match.minute }}</small>
              <small v-else>{{ match.time }}</small>
            </div>

            <div class="teams">
              <div class="team">
                <img
                  :src="match.homeLogo"
                  :alt="`${match.homeTeam} crest`"
                  class="team-logo"
                  width="48"
                  height="48"
                >
                <span>{{ match.homeTeam }}</span>
              </div>

              <div class="score">
                {{ match.score || "VS" }}
              </div>

              <div class="team right">
                <span>{{ match.awayTeam }}</span>
                <img
                  :src="match.awayLogo"
                  :alt="`${match.awayTeam} crest`"
                  class="team-logo"
                  width="48"
                  height="48"
                >
              </div>
            </div>
          </div>

          <div class="match-right">
            <div class="league">
              <span>🏆</span>
              {{ match.league }}
            </div>

            <div v-if="match.viewers" class="viewers">
              👁 {{ match.viewers }}
            </div>

            <NuxtLink
              v-if="match.status === 'LIVE'"
              :to="`/watch/${match.id}`"
              class="watch-btn"
            >
              ▶ Watch
            </NuxtLink>

            <button
              v-else-if="match.status === 'UPCOMING'"
              type="button"
              class="notify-btn"
            >
              🔔 Notify
            </button>

            <button
              v-else
              type="button"
              class="replay-btn"
            >
              ↻ Replay
            </button>
          </div>
        </div>

        <div v-if="filteredMatches.length === 0" class="empty-state">
          <h3>No matches found</h3>
          <p>Try another team name, league, or status filter.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.matches-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(56, 226, 47, 0.13), transparent 30%),
    radial-gradient(circle at top right, rgba(22, 163, 74, 0.1), transparent 32%),
    linear-gradient(180deg, #071012 0%, #050b0d 45%, #030607 100%);
  color: #ffffff;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

/* Layout */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 46px 24px 80px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 28px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  color: #38e22f;
  background: rgba(56, 226, 47, 0.09);
  border: 1px solid rgba(56, 226, 47, 0.18);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 18px;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -2.8px;
}

.page-header p {
  margin: 16px 0 0;
  max-width: 580px;
  color: #9ca3af;
  font-size: 18px;
  line-height: 1.6;
}

.header-card {
  min-width: 160px;
  padding: 22px;
  border-radius: 22px;
  background: rgba(13, 23, 26, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.header-card span {
  display: block;
  color: #38e22f;
  font-size: 42px;
  font-weight: 950;
}

.header-card p {
  margin: 4px 0 0;
  color: #9ca3af;
  font-weight: 700;
}

/* Filters */
.filters-card {
  padding: 18px;
  border-radius: 24px;
  background: rgba(13, 23, 26, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  margin-bottom: 24px;
}

.search-box {
  height: 54px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
}

.search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ffffff;
  font-size: 15px;
}

.search-box input::placeholder {
  color: #6b7280;
}

.status-tabs,
.league-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.status-tabs {
  margin-bottom: 12px;
}

.status-tabs button,
.league-tabs button {
  border: 0;
  cursor: pointer;
  color: #d1d5db;
  font-weight: 800;
  border-radius: 999px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.07);
  transition: 0.2s ease;
}

.status-tabs button.selected,
.league-tabs button.selected {
  color: #ffffff;
  background: linear-gradient(135deg, #38e22f, #16a34a);
  box-shadow: 0 12px 28px rgba(56, 226, 47, 0.22);
}

/* Match List */
.match-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.match-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 20px;
  border-radius: 24px;
  background: rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.25s ease;
}

.match-row:hover {
  transform: translateY(-2px);
  border-color: rgba(56, 226, 47, 0.35);
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
}

.match-row.live {
  border-color: rgba(56, 226, 47, 0.45);
  box-shadow: inset 0 0 0 1px rgba(56, 226, 47, 0.1);
}

.match-left {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 20px;
  align-items: center;
}

.status-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.status-badge {
  width: fit-content;
  padding: 7px 10px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 950;
}

.status-live {
  background: #ef4444;
  color: #ffffff;
}

.status-upcoming {
  background: rgba(56, 226, 47, 0.14);
  color: #38e22f;
}

.status-finished {
  background: rgba(148, 163, 184, 0.16);
  color: #cbd5e1;
}

.status-area small {
  color: #9ca3af;
  font-weight: 800;
}

.teams {
  display: grid;
  grid-template-columns: 1fr 110px 1fr;
  align-items: center;
  gap: 16px;
}

.team {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 850;
}

.team.right {
  justify-content: flex-end;
}

.team-logo {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.score {
  text-align: center;
  font-size: 30px;
  font-weight: 950;
  letter-spacing: -1px;
}

.match-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.league,
.viewers {
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.watch-btn,
.notify-btn,
.replay-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 16px;
  text-decoration: none;
}

.watch-btn {
  background: linear-gradient(135deg, #38e22f, #16a34a);
  box-shadow: 0 12px 28px rgba(56, 226, 47, 0.22);
}

.notify-btn,
.replay-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  border-radius: 24px;
  background: rgba(13, 23, 26, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.empty-state h3 {
  margin: 0;
  font-size: 24px;
}

.empty-state p {
  margin: 10px 0 0;
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 900px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .match-row {
    grid-template-columns: 1fr;
  }

  .match-left {
    grid-template-columns: 1fr;
  }

  .teams {
    grid-template-columns: 1fr;
  }

  .team,
  .team.right {
    justify-content: space-between;
  }

  .score {
    padding: 14px 0;
    border-block: 1px solid rgba(255, 255, 255, 0.08);
  }

  .match-right {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

@media (max-width: 560px) {
  .container {
    padding-inline: 16px;
  }

  .page-header h1 {
    letter-spacing: -1.8px;
  }

  .team {
    font-size: 16px;
  }

  .score {
    font-size: 26px;
  }

  .watch-btn,
  .notify-btn,
  .replay-btn {
    width: 100%;
  }
}
</style>