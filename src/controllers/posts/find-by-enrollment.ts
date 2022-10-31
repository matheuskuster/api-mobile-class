import { PostModel } from '@/models/Post';

export async function findByEnrollment(params: {
  enrollment: string;
  deleted?: boolean;
}) {
  const posts = await PostModel.find({
    enrollment: params.enrollment,
    deleted: params.deleted || false,
  });
  return posts;
}
