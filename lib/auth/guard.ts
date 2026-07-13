import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./index";


export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (
    session.user.role !== "ADMIN" &&
    session.user.role !== "OWNER"
  ) {
    redirect("/signout?callbackUrl=/unauthorized");
  }

  return session.user;
}