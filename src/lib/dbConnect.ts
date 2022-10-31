import mongoose from 'mongoose';

const { MONGODB_USER } = process.env;
const { MONGODB_PASSWORD } = process.env;
const { MONGODB_DB } = process.env;

if (!MONGODB_USER) {
  throw new Error('Define the MONGODB_USER environmental variable');
}

if (!MONGODB_PASSWORD) {
  throw new Error('Define the MONGODB_PASSWORD environmental variable');
}

if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  require('@/models/Post');

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(makeMongoURI(), opts).then(
      (connectedMongoose) => connectedMongoose,
    );
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

function makeMongoURI() {
  return `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.68ngh.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;
}
