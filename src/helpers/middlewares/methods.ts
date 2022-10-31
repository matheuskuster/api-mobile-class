import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '../ApiError';

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export function allowedMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  methods: Method[],
) {
  if (!methods.includes(req.method as Method)) {
    const message = `${req.method} method not allowed for this route.`;
    throw new ApiError({
      status: 405,
      message,
      log: message,
    });
  }
}
