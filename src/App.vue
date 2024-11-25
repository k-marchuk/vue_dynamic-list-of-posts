<script setup>
import Header from './components/Header.vue';
import PostList from './components/PostList.vue';
</script>

<template>
  <Header />

  <main class="section">
    <div class="container">
      <div class="tile is-ancestor"><PostList /></div>
    </div>
  </main>
</template>
