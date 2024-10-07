import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        // Find the user by username
        console.log("Connecting to the database...");
        await dbConnect();
        console.log("Database connected");

        const user = await User.findOne({ username: credentials.username });
        console.log("User found:", user);
        if (!user) {
          throw new Error("User not found");
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }
        console.log("Connecting to the database...");
        await dbConnect();
        console.log("Database connected");

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
        token.id = user.id;
      }
      return token;
    },  
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
