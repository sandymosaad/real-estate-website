"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import {
  ADMIN_ACCOUNT_LOCK_DURATION_MS,
  ADMIN_ACCOUNT_MAX_FAILED_ATTEMPTS,
  ADMIN_AUTH_ERROR_MESSAGE,
} from "@/lib/constants";
import { isRateLimited } from "@/lib/rate-limit";
import { AdminModel } from "@/models/Admin";
import { createSession } from "@/lib/admin/session";

function getClientKey(headerValue: string | null): string {
  return headerValue?.split(",")[0]?.trim() || "unknown";
}

/** Authenticates an admin without revealing whether the email exists. */
export async function loginAdmin(formData: FormData): Promise<void> {
  const requestHeaders = await headers();
  const clientKey = getClientKey(requestHeaders.get("x-forwarded-for"));
  if (isRateLimited(`admin-login:${clientKey}`)) {
    redirect("/admin/login?error=1");
  }
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  await connectToDatabase();
  const admin = await AdminModel.findOne({ email }).select("+passwordHash");
  const isLocked = Boolean(admin?.lockedUntil && admin.lockedUntil.getTime() > Date.now());
  const isPasswordValid = admin
    ? await bcrypt.compare(password, admin.passwordHash)
    : false;
  if (!admin || isLocked || !isPasswordValid) {
    if (admin && !isLocked && !isPasswordValid) {
      const failedAttempts = admin.failedLoginAttempts + 1;
      const shouldLock = failedAttempts >= ADMIN_ACCOUNT_MAX_FAILED_ATTEMPTS;
      await AdminModel.updateOne(
        { _id: admin._id },
        {
          failedLoginAttempts: shouldLock ? 0 : failedAttempts,
          lockedUntil: shouldLock
            ? new Date(Date.now() + ADMIN_ACCOUNT_LOCK_DURATION_MS)
            : null,
        },
      );
    }
    redirect(`/admin/login?error=${encodeURIComponent(ADMIN_AUTH_ERROR_MESSAGE)}`);
  }
  await AdminModel.updateOne(
    { _id: admin._id },
    { failedLoginAttempts: 0, lockedUntil: null },
  );
  await createSession({
    adminId: String(admin._id),
    email: admin.email,
    fullName: admin.fullName,
  });
  redirect("/admin");
}
