import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { loginAdmin } from "./actions";

export const metadata: Metadata = {
  title: "دخول الإدارة",
  robots: { index: false, follow: false },
};

export const instant = false;

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

/** Renders the private administrator login form. */
export default async function AdminLoginPage({
  searchParams,
}: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background p-4"
      dir="rtl"
    >
      <form
        action={loginAdmin}
        className="w-full max-w-md rounded-xl bg-surface p-8 shadow"
      >
        <h1 className="text-2xl font-bold text-ink">دخول لوحة إدارة {SITE_NAME}</h1>
        {error && (
          <p className="mt-4 rounded-lg bg-primary-light p-3 text-error">
            {error}
          </p>
        )}
        <label className="mt-6 block text-sm font-semibold">
          البريد الإلكتروني
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="mt-2 w-full rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          كلمة المرور
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-border bg-surface p-3 text-ink placeholder:text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-primary p-3 font-bold text-on-primary"
        >
          دخول
        </button>
      </form>
    </main>
  );
}
