
import { NextApiRequest, NextApiResponse } from 'next';
import { PostsController } from '@/controllers/posts';

import { ApiError } from '@/helpers/ApiError';
import { apiHandler } from '@/helpers/handler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const posts = await PostsController.findByEnrollment({
    enrollment: id as string,
    deleted: false,
  });

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
