// pages/api/profile.js
import dbConnect from "../../lib/db";
import UserProfile from "../../../models/UserProfile";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "POST") {
    const { username, bio, profilePicture } = req.body;

    try {
      // Update user profile by username
      const updatedProfile = await UserProfile.findOneAndUpdate(
        { username: session.user.name }, // Using the logged-in username
        { bio, profilePicture },
        { new: true }
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
