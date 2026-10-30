import Link from "next/link";
import { ArrowLeft, Building2, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ServicesCards() {
  const services = [
    {
      title: "شقق للبيع",
      description:
        "اختيارات شقق مناسبة للعائلات والأفراد في مراكز أسيوط المختلفة.",
      href: "/apartments",
      icon: Building2,
    },
    {
      title: "اتحاد ملاك",
      description: "شارك في مشروع مناسب ليك مع خطوات واضحة وتفاصيل مفهومة.",
      href: "/union",
      icon: UsersRound,
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map(({ title, description, href, icon: Icon }) => (
            <article
              key={title}
              className="flex min-h-64 flex-col rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon size={25} aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-ink">{title}</h2>
              <p className="mt-3 max-w-md leading-7 text-muted">
                {description}
              </p>
              <Link
                href={href}
                className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-primary"
              >
                اعرف أكتر
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
