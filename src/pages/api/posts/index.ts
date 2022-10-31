
import { NextApiRequest, NextApiResponse } from 'next';
import { PostsController } from '@/controllers/posts';

import { ApiError } from '@/helpers/ApiError';
import { apiHandler } from '@/helpers/handler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;
  console.log(page);

  let posts;

  if (page) {
    posts = await PostsController.findAllWithPagination({
      deleted: false,
      page: 1,
      limit: 10,
    });
  } else {
    posts = await PostsController.findAll({ deleted: false });
  }

  if (!posts) {
    throw new ApiError({
      status: 404,
      message: 'Posts not found.',
    });
  }

  return res.status(200).json({
    message: 'Posts encontrados com sucesso.',
    posts,
    success: true,
  });
}

export default apiHandler(handler, {
  db: true,
  methods: ['GET'],
});
