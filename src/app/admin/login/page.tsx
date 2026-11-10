import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import LoginClient from "./LoginClient";

export default async function AdminLoginPage() {
  const session = await getAdminSessionFromCookies();

  // If already authenticated, redirect to dashboard
  if (session.authenticated) {
    redirect("/admin");
  }

  return <LoginClient />;
}
