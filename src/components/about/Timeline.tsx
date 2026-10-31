import { Reveal } from "@/components/animation/Reveal";
import type { AboutMilestone } from "@/content/about";

/** Displays stage-based milestones without unverified dates or claims. */
export function Timeline({ milestones }: { milestones: readonly AboutMilestone[] }) {
  return (
    <ol className="relative space-y-6 border-s-2 border-border ps-6 md:space-y-8">
      {milestones.map((milestone, index) => (
        <li key={milestone.title} className="relative">
          <span className="absolute -start-[2.05rem] top-2 h-4 w-4 rounded-full border-4 border-background bg-primary" aria-hidden="true" />
          <Reveal delay={index * 80} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-xl font-bold text-ink">{milestone.title}</h3>
            <p className="mt-2 leading-7 text-muted">{milestone.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
