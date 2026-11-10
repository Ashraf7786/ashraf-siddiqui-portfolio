import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  const session = await getAdminSessionFromCookies();

  if (!session.authenticated) {
    redirect("/admin/login");
  }

  return <DashboardClient adminUsername={session.username || "ashraf"} />;
}
