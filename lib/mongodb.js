import mongoose from "mongoose";

// Fetch the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Ensure the MONGODB_URI environment variable is defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global object is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

// Check if a cached connection exists, if not, create one
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Function to connect to MongoDB
 *
 * @returns {Promise<mongoose.Connection>} The Mongoose connection
 */
async function dbConnect() {
  // If a cached connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // Disable buffer commands to avoid issues with connection
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new topology engine
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  // Await the cached promise and assign the connection to cached.conn
  cached.conn = await cached.promise;
  return cached.conn; // Return the established connection
}

export default dbConnect;
