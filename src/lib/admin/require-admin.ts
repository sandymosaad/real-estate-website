import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/session";

/** Requires an authenticated admin and redirects unauthenticated visitors. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
