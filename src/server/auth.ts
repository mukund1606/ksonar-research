import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { clientDecryption, comparePassword, serverDecrypt } from "@/lib/utils";
import { db } from "@/server/db";
import { LoginSchema } from "@/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    name: string;
    email: string;
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User {
    username: string;
    name: string;
    email: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          LoginSchema.parse(credentials);
        } catch (error) {
          throw new Error("Invalid Credentials");
        }
        const dataFromAPI = LoginSchema.parse(credentials);
        const userData = await db.user.findUniqueOrThrow({
          where: {
            username: dataFromAPI.username,
          },
        });
        const decryptedUserPassword = serverDecrypt(userData.password);
        const decryptedCredentialsPassword = clientDecryption(
          dataFromAPI.password,
        );
        const isPasswordMatch = comparePassword(
          decryptedCredentialsPassword,
          decryptedUserPassword,
        );
        if (!isPasswordMatch) throw new Error("Invalid Password");
        const data: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          username: userData.username,
        };
        return data;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        return Promise.resolve({ ...user });
      } else {
        return Promise.resolve(token);
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
