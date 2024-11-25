import { client } from './../utils/fetchClient';

const USER_ID = 1892;

export const getPosts = async () => {
  const response = await client.get(`/posts?userId=${USER_ID}`);

  return response.data;
};
