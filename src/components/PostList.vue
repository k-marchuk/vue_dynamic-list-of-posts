<script setup>
import { ref, onMounted } from 'vue';
import * as postsApi from '@/api/posts';
import Loader from './Loader.vue';

const posts = ref([]);
const errorMessage = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    posts.value = await postsApi.getPosts();
  } catch (err) {
    errorMessage.value = 'Failed to load posts';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="tile is-parent">
    <div class="tile is-child box is-success">
      <div class="block">
        <div class="block is-flex is-justify-content-space-between">
          <p class="title">Posts</p>
          <button type="button" class="button is-link">Add New Post</button>
        </div>

        <div v-if="errorMessage" class="has-text-centered">
          <p class="help is-danger is-justify-content-center">
            {{ errorMessage }}
          </p>
        </div>
        <div
          v-if="posts.length === 0 && !isLoading && !errorMessage"
          class="has-text-centered"
        >
          <p>No posts yet</p>
        </div>
        <div v-if="isLoading" class="has-text-centered"><Loader /></div>

        <table
          v-else
          class="table is-fullwidth is-striped is-hoverable is-narrow"
        >
          <thead>
            <tr class="has-background-link-light">
              <th>ID</th>
              <th>Title</th>
              <th class="has-text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post of posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td class="has-text-right is-vcentered">
                <button type="button" class="button is-link">Open</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
