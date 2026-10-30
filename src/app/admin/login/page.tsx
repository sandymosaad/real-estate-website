import type { Metadata } from "next";
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
      className="flex min-h-screen items-center justify-center bg-slate-100 p-4"
      dir="rtl"
    >
      <form
        action={loginAdmin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold text-ink">دخول لوحة الإدارة</h1>
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">
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
            className="mt-2 w-full rounded-xl border p-3"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          كلمة المرور
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border p-3"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-primary p-3 font-bold text-white"
        >
          دخول
        </button>
      </form>
    </main>
  );
}
