import { client } from './../utils/fetchClient';

const USER_ID = 1892;

export const getPosts = async () => {
  const response = await client.get(`/posts?userId=${USER_ID}`);

  return response.data;
};

export const addPost = async postData => {
  const response = await client.post(`/posts`, {
    userId: USER_ID,
    ...postData,
  });

  return response.data;
};

export const editPost = async (postId, postData) => {
  const response = await client.patch(`/posts/${postId}`, postData);

  return response.data;
};

export const deletePost = async postId => {
  const response = await client.delete(`/posts/${postId}`);

  return response.data;
};
