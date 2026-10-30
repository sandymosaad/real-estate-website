import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};
const cache: MongooseCache = globalWithMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};
globalWithMongoose.mongooseCache = cache;

/** Opens one cached MongoDB connection so hot reload does not create duplicates. */
export async function connectToDatabase(): Promise<typeof mongoose> {
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error("MONGODB_URI غير موجود. أضفه في ملف البيئة قبل تشغيل قاعدة البيانات.");
  }
  if (cache.connection) return cache.connection;
  if (!cache.promise) {
    cache.promise = mongoose.connect(connectionString);
  }
  cache.connection = await cache.promise;
  return cache.connection;
}
