import { NextApiResponse, NextApiRequest } from 'next';
import Joi, { Err } from 'joi';
import { ApiError } from '../ApiError';

export async function validate(
  req: NextApiRequest,
  res: NextApiResponse,
  schema: Joi.ObjectSchema,
) {
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    const joiError = error as Err;
    throw new ApiError({
      status: 400,
      message: joiError.toString(),
      error: error as Error,
    });
  }
}
