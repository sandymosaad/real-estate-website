import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export function Section({ title, subtitle, children, className = "", ...props }: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`.trim()} {...props}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-8">
            {title && <h1 className="text-3xl font-bold text-ink md:text-4xl">{title}</h1>}
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
