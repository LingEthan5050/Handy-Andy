import { DefaultSession } from "next-auth";
import { UserRole } from "@/generated/prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}