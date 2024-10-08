// pages/api/profile.js
import { getSession } from "next-auth/react";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  const user = await User.findById(session.user.id); // Get user by ID from session
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Return user profile data
  res.status(200).json({
    username: user.username,
    bio: user.bio || "No bio available.",
    profilePicture: user.profilePicture || "No profile picture available.",
  });
}
