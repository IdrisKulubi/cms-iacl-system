/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import db from "./db/drizzle";
import { users } from "./db/schema";

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
    Google({
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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
    jwt: async ({ token, user, trigger, session, account }: any) => {
      if (user) {
        if (account?.provider === "google") {
          const existingUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, user.email),
          });

          if (existingUser) {
            token.role = existingUser.role;
          } else {
            // Set default role for new users
            token.role = "employee";

            const userId = crypto.randomUUID();
            await db
              .insert(users)
              .values({
                id: userId,
                name: user.name,
                email: user.email,
                image: user.image,
                role: "employee",
              })
              .onConflictDoUpdate({
                target: users.email,
                set: {
                  name: user.name,
                  image: user.image,
                },
              });
          }
        } else {
          token.role = user.role;
        }

        // Handle users with no name
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
          await db
            .update(users)
            .set({ name: token.name })
            .where(eq(users.id, user.id));
        }
      }

      // Handle profile updates
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      session.user.id = token.sub;
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
