<script setup lang="ts">
const route = useRoute()
const streamId = route.params.id as string
</script>

<template>
  <section class="watch">
    <div class="player">
      <div class="placeholder">Video player goes here<br />(stream id: {{ streamId }})</div>
    </div>
    <aside class="chat">
      <div class="chat-header">Chat</div>
      <div class="chat-body">
        <p class="msg"><b>Ada:</b> hello!</p>
        <p class="msg"><b>Ben:</b> hi from Vietnam</p>
      </div>
      <input class="chat-input" placeholder="Send a message" />
    </aside>
  </section>
</template>

<style scoped>
.watch {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1rem;
  height: calc(100vh - 180px);
}

@media (max-width: 800px) {
  .watch {
    grid-template-columns: 1fr;
    height: auto;
  }
}

.player {
  background: #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
}

.placeholder {
  color: #888;
  text-align: center;
}

.chat {
  background: #1a1d23;
  border: 1px solid #2a2d33;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #2a2d33;
  font-weight: 600;
}

.chat-body {
  flex: 1;
  padding: 0.75rem 1rem;
  overflow-y: auto;
}

.msg {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
}

.chat-input {
  margin: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #0f1115;
  border: 1px solid #2a2d33;
  border-radius: 6px;
  color: #e6e6e6;
}
</style>
