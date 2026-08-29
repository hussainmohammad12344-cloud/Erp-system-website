import mongoose from "mongoose"

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export default async function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable in .env.local")
    }

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongooseInstance) => mongooseInstance)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}
