import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import {
  ADMIN_AUTH_SECRET_MINIMUM_LENGTH,
  ADMIN_SESSION_DURATION_SECONDS,
} from "@/lib/constants";

const SESSION_COOKIE_NAME = "assiut_admin_session";

type AdminSession = {
  adminId: string;
  email: string;
  fullName: string;
};

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < ADMIN_AUTH_SECRET_MINIMUM_LENGTH) {
    throw new Error("AUTH_SECRET must be at least 32 characters long.");
  }
  return new TextEncoder().encode(secret);
}

function getSessionPayload(payload: JWTPayload): AdminSession | null {
  if (
    typeof payload.adminId !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.fullName !== "string"
  ) {
    return null;
  }
  return {
    adminId: payload.adminId,
    email: payload.email,
    fullName: payload.fullName,
  };
}

/** Creates an encrypted-in-transit signed admin session cookie. */
export async function createSession(session: AdminSession): Promise<void> {
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_DURATION_SECONDS}s`)
    .sign(getAuthSecret());
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_DURATION_SECONDS,
  });
}

/** Reads and verifies the current admin session. */
export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getAuthSecret(), {
      algorithms: ["HS256"],
    });
    return getSessionPayload(payload);
  } catch {
    return null;
  }
}

/** Deletes the current admin session cookie. */
export async function destroySession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}
