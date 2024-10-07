import { getSession } from "next-auth/react";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { userId, message } = req.body;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("yourDatabaseName");
  const collection = db.collection("recalls");

  // Save recall message to MongoDB
  await collection.insertOne({
    userId,
    message,
    timestamp: new Date(),
  });

  // (Optional) Generate a response using an LLM or some logic
  const response = `You recalled: ${message}`;

  client.close();

  return res.status(200).json({ response });
}
