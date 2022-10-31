/* eslint-disable no-var */
/* eslint-disable vars-on-top */

declare module globalThis {
  import type { Mongoose } from 'mongoose';

  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}
