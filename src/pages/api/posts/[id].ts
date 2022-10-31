
import { NextApiRequest, NextApiResponse } from 'next';
import { PostsController } from '@/controllers/posts';

import { ApiError } from '@/helpers/ApiError';
import { apiHandler } from '@/helpers/handler';
import Joi from 'joi';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { enrollment } = req.body as Schema;

  const post = await PostsController.findById({
    id: id as string,
  });

  if (!post) {
    throw new ApiError({
      status: 404,
      message: 'Post not found.',
    });
  }

  if (post.enrollment !== enrollment) {
    throw new ApiError({
      status: 401,
      message: 'Unauthorized.',
    });
  }

  const deletedPost = await PostsController.deleteById({
    id: id as string,
  });

  return res.status(200).json({
    message: 'Post deletado com sucesso.',
    post: deletedPost,
    success: true,
  });
}

type Schema = {
  enrollment: string;
}

const schema = Joi.object<Schema>({
  enrollment: Joi.string().required(),
})

export default apiHandler(handler, {
  db: true,
  schema,
  methods: ['DELETE'],
});
