import mongoose, { Mongoose } from 'mongoose';


const MONGO_URI = process.env.MONGODB_URI as string;

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}
const globalWithMongoose = global as typeof globalThis &{mongoose?: MongooseCache}
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn; // Use existing connection

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI,{}).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}