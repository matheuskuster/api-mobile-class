import { Post, PostModel } from '@/models/Post';

export async function create(params: Omit<Post, 'createdAt' | 'deleted'>) {
  const post = await PostModel.create(params);
  return post;
}
