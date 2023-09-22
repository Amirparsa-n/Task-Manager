import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, password } = credentials;

                try {
                    connectDB();
                } catch (e) {
                    throw new Error("Error in connecting DB", e);
                }

                if (!email || !password) {
                    throw new Error(`Invalid Data`);
                }

                const user = await User.findOne({ email: email });
                if (!user) {
                    throw new Error(`Username or password is incorrect`);
                }

                const isValid = await verifyPassword(password, user.password);
                if (!isValid) {
                    throw new Error(`Username or password is incorrect`);
                }

                return { email };
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
        // error: "/api/auth/error",
    },
};

export default NextAuth(authOptions);
