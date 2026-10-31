import Link from "next/link";
import { ArrowLeft, Building2, HandCoins, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealList } from "@/components/animation/RevealList";
import { homeContent } from "@/content/home";

export function ServicesCards() {
  const icons = [Building2, UsersRound, HandCoins];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <RevealList className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {homeContent.services.map(({ title, problem, description, href, action }, index) => {
            const Icon = icons[index];
            return (
            <article
              key={title}
              className="card-hover flex min-h-64 flex-col rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Icon size={25} aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-ink">{title}</h2>
              <p className="mt-3 font-semibold text-ink">
                {problem}
              </p>
              <p className="mt-2 max-w-md leading-7 text-muted">
                {description}
              </p>
              <Link
                href={href}
                className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-primary"
              >
                {action}
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </article>
            );
          })}
        </RevealList>
      </Container>
    </section>
  );
}
