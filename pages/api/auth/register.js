// pages/api/auth/register.js
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import UserProfile from "../../../models/UserProfile";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const { username, email, password } = req.body;

    try {
      const hashedPassword = await hash(password, 10);

      // Create user in User collection
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Create profile in UserProfile collection
      const userProfile = await UserProfile.create({ username });

      res.status(201).json({ user, userProfile });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
