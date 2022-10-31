import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';

import { dbConnect } from '@/lib/dbConnect';
import { allowedMethods, Method } from './middlewares/methods';
import { validate } from './middlewares/validate';
import { errorHandler } from './error';

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

interface Options {
  methods?: Method[];
  schema?: Joi.ObjectSchema;
  db?: boolean;
}

const defaultOptions: Options = {
  methods: [],
  schema: undefined,
  db: false,
};

export function apiHandler(handler: Handler, options?: Options) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const mergedOptions: Options = {
      ...defaultOptions,
      ...options,
    };

    const {
      methods, schema, db,
    } = mergedOptions;

    try {
      if (methods && methods?.length > 0) {
        allowedMethods(req, res, methods);
      }

      if (schema) {
        await validate(req, res, schema);
      }

      if (db) {
        await dbConnect();
      }

      await handler(req, res);
    } catch (err) {
      const typedError = err as Error;
      errorHandler(typedError, res);
    }
  };
}
