<template>
  <div class="app">
    <header class="app-header">
      <NuxtLink to="/" class="logo">StreamHive</NuxtLink>
      <nav>
        <NuxtLink to="/browse">Browse</NuxtLink>
        <NuxtLink to="/go-live">Go Live</NuxtLink>
      </nav>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <span>&copy; {{ new Date().getFullYear() }} StreamHive</span>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f1115;
  color: #e6e6e6;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid #222;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1.25rem;
}

nav a {
  color: #b8b8b8;
  text-decoration: none;
}

nav a:hover,
nav a.router-link-active {
  color: #fff;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  padding: 1rem 2rem;
  border-top: 1px solid #222;
  text-align: center;
  color: #888;
  font-size: 0.875rem;
}
</style>
