<script setup lang="ts">
type TabKey = "attacking" | "defending" | "goalkeeping" | "discipline"

interface Stat {
  label: string
  value: string | number
}

const route = useRoute()
const teamId = route.params.id

const team = {
  id: teamId,
  name: "Barcelona",
  logo: "/teams/default.svg",
  league: "La Liga",
  country: "Spain",
  founded: 1899,
  stadium: "Camp Nou",
  coach: "Hansi Flick",
  rank: 1,
  matchesPlayed: 30,
  wins: 22,
  draws: 5,
  losses: 3,
  points: 71,
  goalsFor: 72,
  goalsAgainst: 28,
  cleanSheets: 12,
  followers: 2400000,
}

const tabs = [
  { key: "attacking", label: "Attacking" },
  { key: "defending", label: "Defending" },
  { key: "goalkeeping", label: "Goalkeeping" },
  { key: "discipline", label: "Discipline" },
] as const

const activeTab = ref<TabKey>("attacking")

const statsByTab: Record<TabKey, Stat[]> = {
  attacking: [
    { label: "Goals Scored", value: 72 },
    { label: "Shots", value: 412 },
    { label: "Shots on Target", value: 184 },
    { label: "Big Chances Created", value: 67 },
    { label: "Assists", value: 53 },
    { label: "Pass Accuracy", value: "88%" },
    { label: "Possession", value: "62%" },
    { label: "Expected Goals (xG)", value: 64.3 },
  ],
  defending: [
    { label: "Goals Conceded", value: 28 },
    { label: "Clean Sheets", value: 12 },
    { label: "Tackles Won", value: 384 },
    { label: "Interceptions", value: 296 },
    { label: "Blocks", value: 105 },
    { label: "Clearances", value: 612 },
    { label: "Aerials Won", value: 487 },
    { label: "Expected Goals Against (xGA)", value: 31.8 },
  ],
  goalkeeping: [
    { label: "Saves", value: 78 },
    { label: "Save %", value: "73%" },
    { label: "Clean Sheets", value: 12 },
    { label: "Goals Conceded", value: 28 },
    { label: "Penalties Saved", value: 3 },
    { label: "Sweeper Actions", value: 41 },
    { label: "Catches", value: 22 },
    { label: "Punches", value: 9 },
  ],
  discipline: [
    { label: "Yellow Cards", value: 54 },
    { label: "Red Cards", value: 3 },
    { label: "Fouls Committed", value: 312 },
    { label: "Fouls Suffered", value: 287 },
    { label: "Offsides", value: 41 },
    { label: "Penalties Conceded", value: 4 },
  ],
}

const activeStats = computed(() => statsByTab[activeTab.value])

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}
</script>

<template>
  <div class="team-page">
    <div class="container">
      <NuxtLink to="/teams" class="back-link">
        ← Back to Teams
      </NuxtLink>

      <!-- Hero -->
      <section class="team-hero">
        <div class="hero-left">
          <img
            :src="team.logo"
            :alt="`${team.name} crest`"
            class="hero-logo"
            width="120"
            height="120"
          >

          <div class="hero-body">
            <div class="hero-pill">
              #{{ team.rank }} · {{ team.league }}
            </div>

            <h1>{{ team.name }}</h1>

            <p>
              {{ team.country }} · Founded {{ team.founded }} · {{ team.stadium }}
            </p>
          </div>
        </div>

        <div class="hero-stats">
          <div>
            <strong>{{ team.points }}</strong>
            <span>Points</span>
          </div>

          <div>
            <strong>{{ team.matchesPlayed }}</strong>
            <span>Played</span>
          </div>

          <div>
            <strong>{{ team.wins }}-{{ team.draws }}-{{ team.losses }}</strong>
            <span>W-D-L</span>
          </div>

          <div>
            <strong>{{ team.goalsFor }}:{{ team.goalsAgainst }}</strong>
            <span>Goals</span>
          </div>
        </div>
      </section>

      <!-- Info row -->
      <section class="info-row">
        <div class="info-card">
          <span>Head Coach</span>
          <strong>{{ team.coach }}</strong>
        </div>

        <div class="info-card">
          <span>Stadium</span>
          <strong>{{ team.stadium }}</strong>
        </div>

        <div class="info-card">
          <span>Founded</span>
          <strong>{{ team.founded }}</strong>
        </div>

        <div class="info-card">
          <span>Followers</span>
          <strong>{{ formatNumber(team.followers) }}</strong>
        </div>
      </section>

      <!-- Tabbed Stats -->
      <section class="stats-section">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            :class="{ selected: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="stats-panel">
          <div
            v-for="stat in activeStats"
            :key="stat.label"
            class="stat-cell"
          >
            <span>{{ stat.label }}</span>
            <strong>{{ stat.value }}</strong>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.team-page {
  min-height: 100vh;
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

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 24px 80px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  margin-bottom: 22px;
}

.back-link:hover {
  color: #38e22f;
}

/* Hero */
.team-hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 28px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(56, 226, 47, 0.18), transparent 35%),
    rgba(13, 23, 26, 0.82);
  border: 1px solid rgba(56, 226, 47, 0.22);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
  margin-bottom: 24px;
}

.hero-left {
  display: flex;
  align-items: center;
  gap: 22px;
}

.hero-logo {
  width: 120px;
  height: 120px;
  border-radius: 28px;
  object-fit: cover;
  background: rgba(56, 226, 47, 0.1);
  border: 1px solid rgba(56, 226, 47, 0.2);
  flex-shrink: 0;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  color: #38e22f;
  background: rgba(56, 226, 47, 0.1);
  border: 1px solid rgba(56, 226, 47, 0.18);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
}

.hero-body h1 {
  margin: 12px 0 6px;
  font-size: clamp(34px, 4.5vw, 56px);
  line-height: 1;
  letter-spacing: -2px;
}

.hero-body p {
  margin: 0;
  color: #9ca3af;
  font-size: 15px;
  font-weight: 700;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 110px);
  gap: 10px;
}

.hero-stats div {
  padding: 16px;
  border-radius: 18px;
  text-align: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.hero-stats strong {
  display: block;
  font-size: 22px;
  font-weight: 950;
}

.hero-stats span {
  color: #9ca3af;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

/* Info row */
.info-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.info-card {
  padding: 18px;
  border-radius: 20px;
  background: rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-card span {
  display: block;
  color: #9ca3af;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 6px;
}

.info-card strong {
  font-size: 18px;
  font-weight: 900;
}

/* Stats section */
.stats-section {
  padding: 20px;
  border-radius: 26px;
  background: rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 18px;
}

.tabs button {
  position: relative;
  border: 0;
  cursor: pointer;
  color: #9ca3af;
  font-weight: 850;
  font-size: 14px;
  background: transparent;
  padding: 10px 14px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.tabs button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

.tabs button.selected {
  color: #38e22f;
  background: rgba(56, 226, 47, 0.08);
}

.tabs button.selected::after {
  content: "";
  position: absolute;
  inset: auto 14px -17px;
  height: 2px;
  border-radius: 999px;
  background: #38e22f;
}

/* Stats grid */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-cell {
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-cell span {
  display: block;
  color: #9ca3af;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 8px;
}

.stat-cell strong {
  font-size: 26px;
  font-weight: 950;
  color: #ffffff;
}

/* Responsive */
@media (max-width: 1100px) {
  .team-hero {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: repeat(4, 1fr);
  }

  .stats-panel {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 820px) {
  .info-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .container {
    padding-inline: 16px;
  }

  .hero-left {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .info-row {
    grid-template-columns: 1fr;
  }

  .stats-panel {
    grid-template-columns: 1fr;
  }
}
</style>
