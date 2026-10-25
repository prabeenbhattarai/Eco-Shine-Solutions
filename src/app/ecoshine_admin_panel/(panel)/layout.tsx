import { requireAdmin } from "@/lib/admin-auth";
import { logoutAction } from "@/app/ecoshine_admin_panel/actions";
import { getSubmissions } from "@/lib/content";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  const submissions = await getSubmissions();
  const unreadEnquiries = submissions.filter((s) => !s.read).length;

  return (
    <AdminShell logoutAction={logoutAction} unreadEnquiries={unreadEnquiries}>
      {children}
    </AdminShell>
  );
}
