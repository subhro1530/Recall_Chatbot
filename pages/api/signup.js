import bcrypt from "bcryptjs";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create a new user
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });
      return res
        .status(201)
        .json({ success: true, message: "User created", data: newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
