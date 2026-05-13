<script setup lang="ts">
interface Team {
  id: number
  name: string
  shortName: string
  logo: string
  league: string
  country: string
  rank: number
  wins: number
  draws: number
  losses: number
  goals: number
  followers: number
  nextMatch: string
}

const search = ref("")
const activeLeague = ref("All")

const teams: Team[] = [
  {
    id: 1,
    name: "Barcelona",
    shortName: "BAR",
    logo: "/teams/default.svg",
    league: "La Liga",
    country: "Spain",
    rank: 1,
    wins: 22,
    draws: 5,
    losses: 3,
    goals: 72,
    followers: 2400000,
    nextMatch: "vs Real Madrid",
  },
  {
    id: 2,
    name: "Real Madrid",
    shortName: "RMA",
    logo: "/teams/default.svg",
    league: "La Liga",
    country: "Spain",
    rank: 2,
    wins: 21,
    draws: 6,
    losses: 3,
    goals: 69,
    followers: 3100000,
    nextMatch: "vs Barcelona",
  },
  {
    id: 3,
    name: "Manchester United",
    shortName: "MUN",
    logo: "/teams/default.svg",
    league: "Premier League",
    country: "England",
    rank: 4,
    wins: 18,
    draws: 7,
    losses: 5,
    goals: 61,
    followers: 1900000,
    nextMatch: "vs Arsenal",
  },
  {
    id: 4,
    name: "Arsenal",
    shortName: "ARS",
    logo: "/teams/default.svg",
    league: "Premier League",
    country: "England",
    rank: 3,
    wins: 19,
    draws: 6,
    losses: 5,
    goals: 66,
    followers: 1700000,
    nextMatch: "vs Man United",
  },
  {
    id: 5,
    name: "Bayern Munich",
    shortName: "BAY",
    logo: "/teams/default.svg",
    league: "Bundesliga",
    country: "Germany",
    rank: 1,
    wins: 23,
    draws: 4,
    losses: 3,
    goals: 80,
    followers: 1600000,
    nextMatch: "vs Dortmund",
  },
  {
    id: 6,
    name: "Dortmund",
    shortName: "BVB",
    logo: "/teams/default.svg",
    league: "Bundesliga",
    country: "Germany",
    rank: 2,
    wins: 20,
    draws: 6,
    losses: 4,
    goals: 64,
    followers: 1200000,
    nextMatch: "vs Bayern Munich",
  },
  {
    id: 7,
    name: "PSG",
    shortName: "PSG",
    logo: "/teams/default.svg",
    league: "Ligue 1",
    country: "France",
    rank: 1,
    wins: 24,
    draws: 3,
    losses: 3,
    goals: 77,
    followers: 2200000,
    nextMatch: "vs Marseille",
  },
  {
    id: 8,
    name: "AC Milan",
    shortName: "MIL",
    logo: "/teams/default.svg",
    league: "Serie A",
    country: "Italy",
    rank: 2,
    wins: 20,
    draws: 5,
    losses: 5,
    goals: 58,
    followers: 980000,
    nextMatch: "vs Inter Milan",
  },
]

const leagues = computed(() => [
  "All",
  ...new Set(teams.map((team) => team.league)),
])

const totalTeams = computed(() => teams.length)

const totalFollowers = computed(() => {
  return teams.reduce((total, team) => total + team.followers, 0)
})

const filteredTeams = computed(() => {
  return teams.filter((team) => {
    const keyword = search.value.toLowerCase()

    const matchesSearch =
      team.name.toLowerCase().includes(keyword) ||
      team.shortName.toLowerCase().includes(keyword) ||
      team.league.toLowerCase().includes(keyword) ||
      team.country.toLowerCase().includes(keyword)

    const matchesLeague =
      activeLeague.value === "All" || team.league === activeLeague.value

    return matchesSearch && matchesLeague
  })
})

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}
</script>

<template>
  <div class="teams-page">
    <div class="container">
      <!-- Header -->
      <section class="page-header">
        <div>
          <div class="badge">⚽ Football Teams</div>

          <h1>Explore Football Teams</h1>

          <p>
            Follow your favorite clubs, check their form, live matches,
            upcoming games, and league performance.
          </p>
        </div>

        <div class="summary-grid">
          <div class="summary-card">
            <strong>{{ totalTeams }}</strong>
            <span>Total Teams</span>
          </div>

          <div class="summary-card">
            <strong>{{ formatNumber(totalFollowers) }}</strong>
            <span>Followers</span>
          </div>
        </div>
      </section>

      <!-- Filters -->
      <section class="filters-card">
        <div class="search-box">
          <span>🔍</span>
          <input
            v-model="search"
            type="text"
            placeholder="Search team, league, or country..."
          >
        </div>

        <div class="filter-row">
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

      <!-- Teams Grid -->
      <section class="teams-grid">
        <article
          v-for="team in filteredTeams"
          :key="team.id"
          class="team-card"
        >
          <div class="team-top">
            <img
              :src="team.logo"
              :alt="`${team.name} crest`"
              class="team-logo"
              width="62"
              height="62"
            >

            <div class="team-rank">
              #{{ team.rank }}
            </div>
          </div>

          <div class="team-info">
            <h2>{{ team.name }}</h2>

            <p>
              {{ team.league }} · {{ team.country }}
            </p>
          </div>

          <div class="status-line">
            <span>{{ formatNumber(team.followers) }} followers</span>
          </div>

          <div class="stats-grid">
            <div>
              <strong>{{ team.wins }}</strong>
              <span>Wins</span>
            </div>

            <div>
              <strong>{{ team.draws }}</strong>
              <span>Draws</span>
            </div>

            <div>
              <strong>{{ team.losses }}</strong>
              <span>Losses</span>
            </div>

            <div>
              <strong>{{ team.goals }}</strong>
              <span>Goals</span>
            </div>
          </div>

          <div class="next-match">
            <span>Next Match</span>
            <strong>{{ team.nextMatch }}</strong>
          </div>

          <div class="team-actions">
            <NuxtLink :to="`/teams/${team.id}`" class="primary-btn">
              View Team
            </NuxtLink>

            <NuxtLink :to="`/matches?team=${team.shortName}`" class="ghost-btn">
              Matches
            </NuxtLink>
          </div>
        </article>

        <div v-if="filteredTeams.length === 0" class="empty-state">
          <h3>No teams found</h3>
          <p>Try another team, league, or country.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.teams-page {
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
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 28px;
  align-items: end;
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
  max-width: 720px;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -2.8px;
}

.page-header p {
  margin: 16px 0 0;
  max-width: 620px;
  color: #9ca3af;
  font-size: 18px;
  line-height: 1.6;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  gap: 14px;
}

.summary-card {
  padding: 20px;
  border-radius: 22px;
  background: rgba(13, 23, 26, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.summary-card strong {
  display: block;
  color: #38e22f;
  font-size: 32px;
  font-weight: 950;
}

.summary-card span {
  color: #9ca3af;
  font-size: 13px;
  font-weight: 800;
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

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-row button {
  border: 0;
  cursor: pointer;
  color: #d1d5db;
  font-weight: 800;
  border-radius: 999px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.07);
  transition: 0.2s ease;
}

.filter-row button.selected {
  color: #ffffff;
  background: linear-gradient(135deg, #38e22f, #16a34a);
  box-shadow: 0 12px 28px rgba(56, 226, 47, 0.22);
}

/* Teams */
.teams-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.team-card {
  padding: 20px;
  border-radius: 26px;
  background: rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.25s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 226, 47, 0.35);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.32);
}

.team-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-logo {
  width: 62px;
  height: 62px;
  border-radius: 20px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.team-rank {
  color: #38e22f;
  font-size: 15px;
  font-weight: 950;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(56, 226, 47, 0.1);
  border: 1px solid rgba(56, 226, 47, 0.16);
}

.team-info {
  margin-top: 22px;
}

.team-info h2 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.8px;
}

.team-info p {
  margin: 8px 0 0;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 700;
}

.status-line {
  margin-top: 18px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 800;
}

.stats-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
}

.stats-grid div {
  padding: 14px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.stats-grid div:last-child {
  border-right: 0;
}

.stats-grid strong {
  display: block;
  font-size: 18px;
  font-weight: 950;
}

.stats-grid span {
  color: #9ca3af;
  font-size: 11px;
  font-weight: 800;
}

.next-match {
  margin-top: 18px;
  padding: 15px;
  border-radius: 18px;
  background: rgba(56, 226, 47, 0.07);
  border: 1px solid rgba(56, 226, 47, 0.12);
}

.next-match span {
  display: block;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 6px;
}

.next-match strong {
  font-size: 15px;
}

.team-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
}

.primary-btn,
.ghost-btn {
  text-align: center;
  text-decoration: none;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 14px;
}

.primary-btn {
  color: #ffffff;
  background: linear-gradient(135deg, #38e22f, #16a34a);
  box-shadow: 0 12px 28px rgba(56, 226, 47, 0.2);
}

.ghost-btn {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.empty-state {
  grid-column: 1 / -1;
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
@media (max-width: 1100px) {
  .teams-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .page-header {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 820px) {
  .teams-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .container {
    padding-inline: 16px;
  }

  .teams-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    letter-spacing: -1.8px;
  }

  .team-actions {
    grid-template-columns: 1fr;
  }
}
</style>