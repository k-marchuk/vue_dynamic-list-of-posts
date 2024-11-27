<script setup>
import { ref, watch } from 'vue';
import * as postsApi from '@/api/posts';

const emit = defineEmits(['postAdded', 'closeSidebar']);

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const title = ref('');
const content = ref('');
const error = ref('');

watch(
  () => props.post,
  newPost => {
    if (newPost) {
      console.log(newPost);
      title.value = newPost.title;
      content.value = newPost.body;
    } else {
      title.value = '';
      content.value = '';
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  if (!title.value || !content.value) {
    error.value = 'Field is required';
    return;
  }

  const updatedPost = {
    title: title.value,
    body: content.value,
  };

  let postToShow;

  try {
    if (props.post && props.post.id) {
      postToShow = await postsApi.editPost(props.post.id, updatedPost);
    } else {
      postToShow = await postsApi.addPost({
        title: title.value,
        body: content.value,
      });
    }

    emit('postAdded', postToShow);

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
    <h2>{{ props.post ? 'Post editing' : 'Create new post' }}</h2>

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
          <button type="submit" class="button is-link">
            {{ props.post ? 'Save' : 'Create' }}
          </button>
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
