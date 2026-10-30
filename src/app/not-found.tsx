import Link from "next/link";

export default function NotFound() {
  return <main className="container py-24 text-center">
          <h1 className="text-3xl font-bold text-ink">
            الصفحة مش موجودة
          </h1>

          <p className="mt-4 text-muted">
            ممكن تكون اتنقلت أو مش متاحة دلوقتي.
          </p>
          
          <Link href="/" className="mt-6 inline-flex font-semibold text-primary">
          ارجع للرئيسية
          </Link>
        </main>;
}
