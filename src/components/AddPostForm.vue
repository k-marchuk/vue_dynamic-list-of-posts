<script setup>
import { ref } from 'vue';
import * as postsApi from '@/api/posts';
const emit = defineEmits(['postAdded', 'closeSidebar']);

const title = ref('');
const content = ref('');
const error = ref('');

const handleSubmit = async () => {
  if (!title.value || !content.value) {
    error.value = 'Field is required';
    return;
  }

  try {
    const newPost = {
      title: title.value,
      body: content.value,
      userId: 1892,
    };

    const createdPost = await postsApi.addPost(newPost);
    emit('postAdded', createdPost);

    title.value = '';
    content.value = '';
    error.value = '';
  } catch (err) {
    console.log(err);
    error.value = 'Failed to create post. Please try again.';
  }
};
</script>

<template>
  <div class="content">
    <h2>Create new post</h2>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="title"
            class="input"
            type="text"
            placeholder="Post title"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Write Post Body</label>
        <div class="control">
          <textarea
            v-model="content"
            class="textarea"
            :class="{ 'is-danger': error }"
            placeholder="Post body"
            required
          ></textarea>
        </div>
      </div>

      <div v-if="error" class="has-text-danger">
        <p>{{ error }}</p>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">Save</button>
        </div>
        <div class="control">
          <button
            type="button"
            class="button is-link is-light"
            @click="emit('closeSidebar')"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
