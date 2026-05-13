<script setup lang="ts">
type FormResult = "W" | "D" | "L"

interface TableRow {
  id: number
  position: number
  name: string
  logo: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  points: number
  form: FormResult[]
}

const route = useRoute()
const leagueId = route.params.id

const league = {
  id: leagueId,
  name: "La Liga",
  logo: "/teams/default.svg",
  country: "Spain",
  season: "2025/26",
  matchday: 30,
  teamCount: 10,
  topScorer: "Robert Lewandowski",
  topScorerGoals: 22,
}

const standings: TableRow[] = [
  {
    id: 1,
    position: 1,
    name: "Barcelona",
    logo: "/teams/default.svg",
    played: 30,
    wins: 22,
    draws: 5,
    losses: 3,
    goalsFor: 72,
    goalsAgainst: 28,
    points: 71,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    id: 2,
    position: 2,
    name: "Real Madrid",
    logo: "/teams/default.svg",
    played: 30,
    wins: 21,
    draws: 6,
    losses: 3,
    goalsFor: 69,
    goalsAgainst: 30,
    points: 69,
    form: ["W", "D", "W", "W", "W"],
  },
  {
    id: 3,
    position: 3,
    name: "Atlético Madrid",
    logo: "/teams/default.svg",
    played: 30,
    wins: 18,
    draws: 8,
    losses: 4,
    goalsFor: 58,
    goalsAgainst: 32,
    points: 62,
    form: ["W", "W", "L", "W", "D"],
  },
  {
    id: 4,
    position: 4,
    name: "Athletic Bilbao",
    logo: "/teams/default.svg",
    played: 30,
    wins: 17,
    draws: 7,
    losses: 6,
    goalsFor: 52,
    goalsAgainst: 35,
    points: 58,
    form: ["D", "W", "W", "L", "W"],
  },
  {
    id: 5,
    position: 5,
    name: "Real Sociedad",
    logo: "/teams/default.svg",
    played: 30,
    wins: 15,
    draws: 8,
    losses: 7,
    goalsFor: 48,
    goalsAgainst: 38,
    points: 53,
    form: ["W", "L", "D", "W", "W"],
  },
  {
    id: 6,
    position: 6,
    name: "Real Betis",
    logo: "/teams/default.svg",
    played: 30,
    wins: 14,
    draws: 8,
    losses: 8,
    goalsFor: 45,
    goalsAgainst: 41,
    points: 50,
    form: ["L", "W", "W", "D", "L"],
  },
  {
    id: 7,
    position: 7,
    name: "Villarreal",
    logo: "/teams/default.svg",
    played: 30,
    wins: 13,
    draws: 7,
    losses: 10,
    goalsFor: 47,
    goalsAgainst: 45,
    points: 46,
    form: ["W", "L", "L", "W", "D"],
  },
  {
    id: 8,
    position: 8,
    name: "Valencia",
    logo: "/teams/default.svg",
    played: 30,
    wins: 10,
    draws: 9,
    losses: 11,
    goalsFor: 38,
    goalsAgainst: 42,
    points: 39,
    form: ["D", "D", "L", "W", "L"],
  },
  {
    id: 9,
    position: 9,
    name: "Sevilla",
    logo: "/teams/default.svg",
    played: 30,
    wins: 7,
    draws: 8,
    losses: 15,
    goalsFor: 30,
    goalsAgainst: 50,
    points: 29,
    form: ["L", "L", "D", "L", "L"],
  },
  {
    id: 10,
    position: 10,
    name: "Granada",
    logo: "/teams/default.svg",
    played: 30,
    wins: 5,
    draws: 6,
    losses: 19,
    goalsFor: 24,
    goalsAgainst: 62,
    points: 21,
    form: ["L", "L", "L", "D", "L"],
  },
]

const goalDifference = (row: TableRow) => row.goalsFor - row.goalsAgainst

const positionZone = (position: number) => {
  if (position <= 4) return "zone-champions"
  if (position <= 6) return "zone-europa"
  if (position >= standings.length - 1) return "zone-relegation"
  return ""
}

const formColor = (result: FormResult) => {
  return {
    W: "form-w",
    D: "form-d",
    L: "form-l",
  }[result]
}
</script>

<template>
  <div class="league-page">
    <div class="container">
      <NuxtLink to="/leagues" class="back-link">
        ← Back to Leagues
      </NuxtLink>

      <!-- Hero -->
      <section class="league-hero">
        <div class="hero-left">
          <img
            :src="league.logo"
            :alt="`${league.name} crest`"
            class="hero-logo"
            width="110"
            height="110"
          >

          <div class="hero-body">
            <div class="hero-pill">
              {{ league.country }} · Season {{ league.season }}
            </div>

            <h1>{{ league.name }}</h1>

            <p>
              Matchday {{ league.matchday }} ·
              Top Scorer: <strong>{{ league.topScorer }}</strong>
              ({{ league.topScorerGoals }} goals)
            </p>
          </div>
        </div>

        <!-- Legend -->
        <div class="legend">
          <span><span class="zone-dot zone-champions" />Champions League</span>
          <span><span class="zone-dot zone-europa" />Europa</span>
          <span><span class="zone-dot zone-relegation" />Relegation</span>
        </div>
      </section>

      <!-- Standings Table -->
      <section class="table-wrap">
        <div class="table-header">
          <h2>Standings</h2>
          <span>{{ standings.length }} teams · Matchday {{ league.matchday }}</span>
        </div>

        <div class="table-scroll">
          <table class="standings">
            <thead>
              <tr>
                <th class="pos">#</th>
                <th class="team">Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th class="form">Form</th>
                <th class="pts">Pts</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in standings"
                :key="row.id"
                :class="positionZone(row.position)"
              >
                <td class="pos">
                  <span class="pos-badge">{{ row.position }}</span>
                </td>

                <td class="team">
                  <NuxtLink :to="`/teams/${row.id}`" class="team-link">
                    <img
                      :src="row.logo"
                      :alt="`${row.name} crest`"
                      class="row-logo"
                      width="28"
                      height="28"
                    >
                    <span>{{ row.name }}</span>
                  </NuxtLink>
                </td>

                <td>{{ row.played }}</td>
                <td>{{ row.wins }}</td>
                <td>{{ row.draws }}</td>
                <td>{{ row.losses }}</td>
                <td>{{ row.goalsFor }}</td>
                <td>{{ row.goalsAgainst }}</td>
                <td :class="{ positive: goalDifference(row) > 0, negative: goalDifference(row) < 0 }">
                  {{ goalDifference(row) > 0 ? "+" : "" }}{{ goalDifference(row) }}
                </td>

                <td class="form">
                  <div class="form-dots">
                    <span
                      v-for="(result, i) in row.form"
                      :key="i"
                      :class="formColor(result)"
                      :title="result"
                    >
                      {{ result }}
                    </span>
                  </div>
                </td>

                <td class="pts">{{ row.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.league-page {
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
.league-hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 26px;
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
  gap: 20px;
}

.hero-logo {
  width: 110px;
  height: 110px;
  border-radius: 26px;
  object-fit: cover;
  background: rgba(56, 226, 47, 0.1);
  border: 1px solid rgba(56, 226, 47, 0.2);
  flex-shrink: 0;
}

.hero-pill {
  display: inline-flex;
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
  font-size: clamp(32px, 4.4vw, 52px);
  line-height: 1;
  letter-spacing: -1.8px;
}

.hero-body p {
  margin: 0;
  color: #9ca3af;
  font-size: 15px;
  font-weight: 700;
}

.hero-body p strong {
  color: #ffffff;
}

/* Legend */
.legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  font-weight: 800;
  color: #cbd5e1;
}

.legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.zone-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.zone-dot.zone-champions {
  background: #38e22f;
}

.zone-dot.zone-europa {
  background: #60a5fa;
}

.zone-dot.zone-relegation {
  background: #ef4444;
}

/* Table */
.table-wrap {
  padding: 22px;
  border-radius: 26px;
  background: rgba(13, 23, 26, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
}

.table-header h2 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.8px;
}

.table-header span {
  color: #9ca3af;
  font-size: 13px;
  font-weight: 800;
}

.table-scroll {
  overflow-x: auto;
}

.standings {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.standings th {
  text-align: center;
  padding: 12px 8px;
  color: #9ca3af;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.standings th.team {
  text-align: left;
  padding-left: 14px;
}

.standings th.pos,
.standings td.pos {
  width: 50px;
}

.standings th.pts,
.standings td.pts {
  font-size: 16px;
  font-weight: 950;
  color: #38e22f;
}

.standings th.form,
.standings td.form {
  width: 140px;
}

.standings td {
  text-align: center;
  padding: 14px 8px;
  font-size: 15px;
  font-weight: 800;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.standings tr:last-child td {
  border-bottom: 0;
}

.standings tr:hover td {
  background: rgba(255, 255, 255, 0.03);
}

/* Position badge */
.pos-badge {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 950;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.zone-champions .pos-badge {
  background: rgba(56, 226, 47, 0.18);
  color: #38e22f;
}

.zone-europa .pos-badge {
  background: rgba(96, 165, 250, 0.18);
  color: #60a5fa;
}

.zone-relegation .pos-badge {
  background: rgba(239, 68, 68, 0.18);
  color: #ef4444;
}

/* Team cell */
.team-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #ffffff;
  padding-left: 6px;
}

.team-link:hover {
  color: #38e22f;
}

.row-logo {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.standings td.team {
  text-align: left;
  min-width: 200px;
}

/* GD coloring */
.standings td.positive {
  color: #38e22f;
}

.standings td.negative {
  color: #ef4444;
}

/* Form dots */
.form-dots {
  display: inline-flex;
  gap: 4px;
  justify-content: center;
}

.form-dots span {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 950;
  color: #ffffff;
}

.form-w {
  background: #16a34a;
}

.form-d {
  background: #ca8a04;
}

.form-l {
  background: #dc2626;
}

/* Responsive */
@media (max-width: 1100px) {
  .league-hero {
    grid-template-columns: 1fr;
  }

  .legend {
    flex-direction: row;
    flex-wrap: wrap;
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
}
</style>
