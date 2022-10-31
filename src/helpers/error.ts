import { NextApiResponse } from 'next';
import { ApiError } from './ApiError';

function errorHandler(err: Error, res: NextApiResponse) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, success: false });
  }

  if (typeof err === 'string') {
    return res.status(400).json({ message: err, success: false });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token', success: false });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  return res.status(500).json({ message: err.message, success: false });
}

export { errorHandler };
