import { requireAdmin } from "@/lib/auth/guard";
import AdminShell from "./admin/components/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  
  return (
    <AdminShell user={session}>
      {children}
    </AdminShell>
  );
}