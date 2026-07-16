import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/db/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session }) {
      if (!session.user?.email) {
        return session;
      }

      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          name: true,
          image: true,
          role: true,
        },
      });

      if (dbUser) {
        session.user.name = dbUser.name ?? session.user.name;
        session.user.image = dbUser.image ?? session.user.image
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
};
