import { STATS } from "@/lib/mock-data";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/animation/CountUp";

export function Stats() {
  return (
    <section className="bg-primary py-12 text-on-primary md:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold md:text-4xl">
                <CountUp
                  value={Number(String(stat.value).replace(/[^\d]/g, ""))}
                  suffix={String(stat.value).includes("+") ? "+" : ""}
                />
              </p>
              <p className="mt-2 text-sm text-on-primary/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
