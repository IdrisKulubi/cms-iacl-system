/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import db from "./db/drizzle";
import { users } from "./db/schema";
import { verifyPassword } from "./lib/auth-utils";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate company email domain
        const allowedDomains = process.env.ALLOWED_DOMAINS?.split(",") || [];
        const emailDomain = credentials.email.split('@')[1];
        
        if (!allowedDomains.includes(emailDomain)) {
          throw new Error("Invalid company email domain");
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.password) {
          throw new Error("Account not set up properly");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/profile/,
        /\/dashboard/,
        /\/performance/,
        /\/reviews/,
        /\/goals/,
        /\/admin/,
        /\/reports/,
        /\/settings/,
      ];
      const { pathname } = request.nextUrl;
      return !protectedPaths.some((p) => p.test(pathname)) || !!auth;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
