<script setup lang="ts">
interface League {
  id: number
  name: string
  logo: string
  country: string
  season: string
  teams: number
  matches: number
  liveMatches: number
  viewers: number
  status: "ACTIVE" | "UPCOMING" | "FINISHED"
  topTeam: string
  topScorer: string
}

const search = ref("")
const activeCountry = ref("All")
const activeStatus = ref<"ALL" | "ACTIVE" | "UPCOMING" | "FINISHED">("ALL")

const leagues: League[] = [
  {
    id: 1,
    name: "Premier League",
    logo: "/teams/default.svg",
    country: "England",
    season: "2025/26",
    teams: 20,
    matches: 380,
    liveMatches: 4,
    viewers: 2400000,
    status: "ACTIVE",
    topTeam: "Arsenal",
    topScorer: "H. Kane",
  },
  {
    id: 2,
    name: "La Liga",
    logo: "/teams/default.svg",
    country: "Spain",
    season: "2025/26",
    teams: 20,
    matches: 380,
    liveMatches: 3,
    viewers: 1900000,
    status: "ACTIVE",
    topTeam: "Barcelona",
    topScorer: "K. Mbappé",
  },
  {
    id: 3,
    name: "Bundesliga",
    logo: "/teams/default.svg",
    country: "Germany",
    season: "2025/26",
    teams: 18,
    matches: 306,
    liveMatches: 2,
    viewers: 1200000,
    status: "ACTIVE",
    topTeam: "Bayern Munich",
    topScorer: "E. Haaland",
  },
  {
    id: 4,
    name: "Serie A",
    logo: "/teams/default.svg",
    country: "Italy",
    season: "2025/26",
    teams: 20,
    matches: 380,
    liveMatches: 1,
    viewers: 980000,
    status: "ACTIVE",
    topTeam: "Inter Milan",
    topScorer: "L. Martínez",
  },
  {
    id: 5,
    name: "Ligue 1",
    logo: "/teams/default.svg",
    country: "France",
    season: "2025/26",
    teams: 18,
    matches: 306,
    liveMatches: 1,
    viewers: 760000,
    status: "ACTIVE",
    topTeam: "PSG",
    topScorer: "O. Dembélé",
  },
  {
    id: 6,
    name: "Champions League",
    logo: "/teams/default.svg",
    country: "Europe",
    season: "2025/26",
    teams: 36,
    matches: 189,
    liveMatches: 0,
    viewers: 3100000,
    status: "UPCOMING",
    topTeam: "Real Madrid",
    topScorer: "V. Junior",
  },
]

const countries = computed(() => [
  "All",
  ...new Set(leagues.map((league) => league.country)),
])

const statusTabs = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Upcoming", value: "UPCOMING" },
  { label: "Finished", value: "FINISHED" },
] as const

const featuredLeague = computed(() => leagues[0]!)

const totalLiveMatches = computed(() => {
  return leagues.reduce((total, league) => total + league.liveMatches, 0)
})

const totalViewers = computed(() => {
  return leagues.reduce((total, league) => total + league.viewers, 0)
})

const filteredLeagues = computed(() => {
  return leagues.filter((league) => {
    const keyword = search.value.toLowerCase()

    const matchesSearch =
      league.name.toLowerCase().includes(keyword) ||
      league.country.toLowerCase().includes(keyword) ||
      league.topTeam.toLowerCase().includes(keyword)

    const matchesCountry =
      activeCountry.value === "All" || league.country === activeCountry.value

    const matchesStatus =
      activeStatus.value === "ALL" || league.status === activeStatus.value

    return matchesSearch && matchesCountry && matchesStatus
  })
})

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

const getStatusClass = (status: League["status"]) => {
  return {
    ACTIVE: "status-active",
    UPCOMING: "status-upcoming",
    FINISHED: "status-finished",
  }[status]
}
</script>

<template>
  <div class="leagues-page">
    <div class="container">
      <!-- Header -->
      <section class="page-header">
        <div>
          <div class="badge">🏆 Football Leagues</div>

          <h1>Explore Top Football Leagues</h1>

          <p>
            Watch live league matches, follow standings, check top teams,
            and explore football competitions around the world.
          </p>
        </div>

        <div class="summary-grid">
          <div class="summary-card">
            <strong>{{ leagues.length }}</strong>
            <span>Leagues</span>
          </div>

          <div class="summary-card">
            <strong>{{ totalLiveMatches }}</strong>
            <span>Live Matches</span>
          </div>

          <div class="summary-card">
            <strong>{{ formatNumber(totalViewers) }}</strong>
            <span>Viewers</span>
          </div>
        </div>
      </section>

      <!-- Featured League -->
      <section class="featured-section">
        <div class="featured-card">
          <div class="featured-left">
            <img
              :src="featuredLeague.logo"
              :alt="`${featuredLeague.name} crest`"
              class="featured-logo"
              width="76"
              height="76"
            >

            <div>
              <span class="featured-label">Featured League</span>
              <h2>{{ featuredLeague.name }}</h2>
              <p>
                {{ featuredLeague.country }} · Season {{ featuredLeague.season }}
              </p>
            </div>
          </div>

          <div class="featured-stats">
            <div>
              <strong>{{ featuredLeague.teams }}</strong>
              <span>Teams</span>
            </div>

            <div>
              <strong>{{ featuredLeague.matches }}</strong>
              <span>Matches</span>
            </div>

            <div>
              <strong>{{ featuredLeague.liveMatches }}</strong>
              <span>Live Now</span>
            </div>

            <div>
              <strong>{{ formatNumber(featuredLeague.viewers) }}</strong>
              <span>Viewers</span>
            </div>
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
            placeholder="Search league, country, or top team..."
          >
        </div>

        <div class="filter-row">
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

        <div class="filter-row country-row">
          <button
            v-for="country in countries"
            :key="country"
            type="button"
            :class="{ selected: activeCountry === country }"
            @click="activeCountry = country"
          >
            {{ country }}
          </button>
        </div>
      </section>

      <!-- Leagues Grid -->
      <section class="leagues-grid">
        <article
          v-for="league in filteredLeagues"
          :key="league.id"
          class="league-card"
          :class="{ live: league.liveMatches > 0 }"
        >
          <div class="league-top">
            <img
              :src="league.logo"
              :alt="`${league.name} crest`"
              class="league-logo"
              width="64"
              height="64"
            >

            <span class="status-badge" :class="getStatusClass(league.status)">
              {{ league.status }}
            </span>
          </div>

          <div class="league-info">
            <h2>{{ league.name }}</h2>
            <p>{{ league.country }} · {{ league.season }}</p>
          </div>

          <div class="league-stats">
            <div>
              <strong>{{ league.teams }}</strong>
              <span>Teams</span>
            </div>

            <div>
              <strong>{{ league.matches }}</strong>
              <span>Matches</span>
            </div>

            <div>
              <strong>{{ league.liveMatches }}</strong>
              <span>Live</span>
            </div>
          </div>

          <div class="league-detail">
            <div>
              <span>Top Team</span>
              <strong>{{ league.topTeam }}</strong>
            </div>

            <div>
              <span>Top Scorer</span>
              <strong>{{ league.topScorer }}</strong>
            </div>
          </div>

          <div class="viewers-row">
            <span>👁 {{ formatNumber(league.viewers) }} viewers</span>
            <span v-if="league.liveMatches > 0" class="live-dot">
              Live now
            </span>
          </div>

          <div class="league-actions">
            <NuxtLink :to="`/leagues/${league.id}`" class="primary-btn">
              View League
            </NuxtLink>

            <NuxtLink :to="`/matches?league=${league.id}`" class="ghost-btn">
              Matches
            </NuxtLink>
          </div>
        </article>

        <div v-if="filteredLeagues.length === 0" class="empty-state">
          <h3>No leagues found</h3>
          <p>Try another league, country, or status filter.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.leagues-page {
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
  max-width: 760px;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -2.8px;
}

.page-header p {
  margin: 16px 0 0;
  max-width: 650px;
  color: #9ca3af;
  font-size: 18px;
  line-height: 1.6;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 150px);
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

/* Featured */
.featured-section {
  margin-bottom: 24px;
}

.featured-card {
  padding: 24px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(56, 226, 47, 0.18), transparent 35%),
    rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(56, 226, 47, 0.22);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
}

.featured-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.featured-logo {
  width: 76px;
  height: 76px;
  border-radius: 24px;
  object-fit: cover;
  background: rgba(56, 226, 47, 0.1);
  border: 1px solid rgba(56, 226, 47, 0.2);
  flex-shrink: 0;
}

.featured-label {
  color: #38e22f;
  font-size: 13px;
  font-weight: 900;
}

.featured-left h2 {
  margin: 6px 0;
  font-size: 34px;
  letter-spacing: -1.4px;
}

.featured-left p {
  margin: 0;
  color: #9ca3af;
  font-weight: 700;
}

.featured-stats {
  display: grid;
  grid-template-columns: repeat(4, 110px);
  gap: 12px;
}

.featured-stats div {
  padding: 16px;
  border-radius: 18px;
  text-align: center;
  background: rgba(255, 255, 255, 0.06);
}

.featured-stats strong {
  display: block;
  font-size: 24px;
  font-weight: 950;
}

.featured-stats span {
  color: #9ca3af;
  font-size: 12px;
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

.country-row {
  margin-top: 12px;
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

/* League Grid */
.leagues-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.league-card {
  padding: 20px;
  border-radius: 26px;
  background: rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.25s ease;
}

.league-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 226, 47, 0.35);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.32);
}

.league-card.live {
  border-color: rgba(56, 226, 47, 0.34);
}

.league-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.league-logo {
  width: 64px;
  height: 64px;
  border-radius: 22px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.status-badge {
  padding: 8px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 950;
}

.status-active {
  background: rgba(56, 226, 47, 0.14);
  color: #38e22f;
}

.status-upcoming {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.status-finished {
  background: rgba(148, 163, 184, 0.16);
  color: #cbd5e1;
}

.league-info {
  margin-top: 22px;
}

.league-info h2 {
  margin: 0;
  font-size: 25px;
  letter-spacing: -0.9px;
}

.league-info p {
  margin: 8px 0 0;
  color: #9ca3af;
  font-weight: 700;
}

.league-stats {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
}

.league-stats div {
  padding: 15px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.league-stats div:last-child {
  border-right: 0;
}

.league-stats strong {
  display: block;
  font-size: 20px;
  font-weight: 950;
}

.league-stats span {
  color: #9ca3af;
  font-size: 12px;
  font-weight: 800;
}

.league-detail {
  margin-top: 18px;
  display: grid;
  gap: 10px;
}

.league-detail div {
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
}

.league-detail span {
  display: block;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 5px;
}

.league-detail strong {
  font-size: 15px;
}

.viewers-row {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 800;
}

.live-dot {
  color: #38e22f;
}

.league-actions {
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
  .page-header,
  .featured-card {
    grid-template-columns: 1fr;
  }

  .summary-grid,
  .featured-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .leagues-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 820px) {
  .featured-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured-left {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .container {
    padding-inline: 16px;
  }

  .summary-grid,
  .featured-stats,
  .leagues-grid {
    grid-template-columns: 1fr;
  }

  .league-actions {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    letter-spacing: -1.8px;
  }
}
</style>