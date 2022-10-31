import { PostModel } from '@/models/Post';

export async function findById(params: {
  id: string;
}) {
  const post = await PostModel.findById(params.id);
  return post;
}
