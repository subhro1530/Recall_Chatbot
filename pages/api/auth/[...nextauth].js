import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    jwt: true, // Use JWT-based sessions
    maxAge: 30 * 24 * 60 * 60, // Optional: Set session expiration to 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to MongoDB
        await dbConnect();

        // Find the user by username
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("User not found");
        }

        // Verify the provided password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // If the credentials are valid, return the user object
        return { id: user._id, username: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in token
        token.username = user.username; // Optional: Store username in token if needed
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Store user ID in session
      session.user.username = token.username; // Optional: Add username to session
      return session;
    },
  },
  // Optional: add error handling for unexpected cases
  events: {
    error: (message) => {
      console.error("NextAuth Error: ", message);
    },
  },
});
