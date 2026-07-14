import { requireAdmin } from "@/lib/admin-auth";
import { logoutAction } from "@/app/ecoshine_admin_panel/actions";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return <AdminShell logoutAction={logoutAction}>{children}</AdminShell>;
}
