
import { NextApiRequest, NextApiResponse } from 'next';
import { PostsController } from '@/controllers/posts';

import { ApiError } from '@/helpers/ApiError';
import { apiHandler } from '@/helpers/handler';
import Joi from 'joi';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, enrollment, content } = req.body as Schema;

  const post = await PostsController.create({
    title,
    enrollment,
    content,
  });

  if (!post) {
    throw new ApiError({
      status: 400,
      message: 'Post not created.',
    });
  }
  
  return res.status(200).json({
    message: 'Post criado com sucesso.',
    post,
    success: true,
  });
}

type Schema = {
  enrollment: string;
  title: string;
  content: string;
}

const schema = Joi.object<Schema>({
  enrollment: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export default apiHandler(handler, {
  db: true,
  methods: ['POST'],
  schema,
});
