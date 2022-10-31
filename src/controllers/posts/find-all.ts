import { PostModel } from '@/models/Post';

export async function findAll(params: {
  deleted?: boolean;
} = {
  deleted: false,
}) {
  const posts = await PostModel.find({ deleted: params.deleted });
  return posts;
}

export async function findAllWithPagination(params: {
  deleted: boolean;
  page: number;
  limit: number;
} = {
  deleted: false,
  page: 1,
  limit: 10,
}) {
  const posts = await PostModel.find({ deleted: params.deleted })
    .skip((params.page - 1) * params.limit)
    .limit(params.limit);
  return posts;
}

