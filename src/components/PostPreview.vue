<script setup>
import { defineProps, ref, watch } from 'vue';
import * as commentsApi from '@/api/comments';
import * as postsApi from '@/api/posts';
import Comment from './Comment.vue';
import NoCommentsYet from './NoCommentsYet.vue';
import Loader from './Loader.vue';
import WriteCommentButton from './WriteCommentButton.vue';
import AddCommentForm from './AddCommentForm.vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
  onEdit: {
    type: Function,
    required: true,
  },
});

const comments = ref([]);
const isLoading = ref(true);
const errorMessage = ref(null);
const isCommentFormShown = ref(false);

const fetchComments = async () => {
  try {
    isLoading.value = true;
    comments.value = await commentsApi.getComments(props.post.id);
  } catch (err) {
    errorMessage.value = 'Failed to load comments';
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.post, fetchComments);

fetchComments();

const editPost = () => {
  props.onEdit(props.post);
};

const deletePost = async () => {
  try {
    await postsApi.deletePost(props.post.id);

    props.onDelete(props.post.id); //сказати батьк. компоненту що пост був видалений
  } catch (err) {
    errorMessage.value = 'Failed to delete post';
  }
};

const handleNewComment = newComment => {
  comments.value.push(newComment);
  isCommentFormShown.value = false;
};
</script>

<template>
  <div class="block">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <h2>#{{ post.id }}: {{ post.title }}</h2>
      <div class="is-flex">
        <span class="icon is-small is-right is-clickable" @click="editPost">
          <i class="fas fa-pen-to-square"></i>
        </span>
        <span
          class="icon is-small is-right has-text-danger is-clickable ml-3"
          @click="deletePost"
        >
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ post.body }}</p>
  </div>

  <div v-if="isLoading" class="has-text-centered"><Loader /></div>

  <div class="block" v-if="!isCommentFormShown">
    <div v-for="comment in comments" :key="comment.id">
      <Comment :comment="comment" />
    </div>
    <NoCommentsYet
      v-if="comments.length === 0 && !isLoading && !errorMessage"
    />
    <WriteCommentButton @click="isCommentFormShown = !isCommentFormShown" />
  </div>

  <AddCommentForm
    v-else
    :post="post"
    @close-sidebar="isCommentFormShown = false"
    @comment-added="handleNewComment"
  />
</template>
