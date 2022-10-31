import {
  Schema, model, models, Model,
} from 'mongoose';

export interface Post {
  title: string;
  content: string;
  enrollment: string;
  deleted?: Boolean;
  createdAt?: Date;
}

const PostSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const PostModel: Model<Post> = models?.Post || model<Post>('Post', PostSchema);
