<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="message is-small mt-4">
    <div class="message-header">
      <a :href="`mailto:${comment.email}`">{{ comment.name }} </a>
      <button type="button" class="delete is-small" aria-label="delete">
        delete button
      </button>
    </div>
    <div class="message-body">{{ comment.body }}</div>
  </article>
</template>
