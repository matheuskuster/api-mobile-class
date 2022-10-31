import { PostModel } from '@/models/Post';

export async function deleteById(params: {
  id: string;
}) {
  const post = await PostModel.findByIdAndUpdate(params.id, {
    deleted: true,
  });
  return post;
}
