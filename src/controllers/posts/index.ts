import { findAll, findAllWithPagination } from './find-all';
import { findByEnrollment } from './find-by-enrollment';
import { findById } from './find-by-id';
import { create } from './create';
import { deleteById } from './delete';

export const PostsController = {
  findAll,
  findAllWithPagination,
  findByEnrollment,
  findById,
  deleteById,
  create,
};
