import type { Metadata } from "next";
import { Eye, HandHeart, MapPinned, ShieldCheck, Target } from "lucide-react";
import { SectionCTA } from "@/components/contact/SectionCTA";
import { Timeline } from "@/components/about/Timeline";
import { TeamSection } from "@/components/about/TeamSection";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/content/about";

export const metadata: Metadata = {
  title: aboutContent.metadataTitle,
  description: aboutContent.metadataDescription,
};

const valueIcons = [Eye, ShieldCheck, MapPinned, HandHeart];

/** Presents the story, values, team roles, and milestones of the public service. */
export default function AboutPage() {
  return (
    <>
      <Section title={aboutContent.title} subtitle={aboutContent.subtitle}>
        <p className="max-w-3xl leading-8 text-muted">{aboutContent.story}</p>
      </Section>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-primary-light p-6">
            <Target className="text-primary" size={30} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-ink">{aboutContent.mission.title}</h2>
            <p className="mt-3 leading-7 text-muted">{aboutContent.mission.description}</p>
          </article>
          <article className="rounded-xl border border-border p-6">
            <Eye className="text-primary" size={30} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-ink">{aboutContent.vision.title}</h2>
            <p className="mt-3 leading-7 text-muted">{aboutContent.vision.description}</p>
          </article>
        </div>
      </Section>
      <Section title={aboutContent.valuesTitle}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map(({ title, description }, index) => {
            const Icon = valueIcons[index];
            return (
              <div key={title}>
                <Icon className="text-primary" size={28} aria-hidden="true" />
                <h2 className="mt-3 font-bold text-ink">{title}</h2>
                <p className="mt-2 leading-6 text-muted">{description}</p>
              </div>
            );
          })}
        </div>
      </Section>
      <TeamSection />
      <Section title={aboutContent.milestonesTitle}>
        <Timeline milestones={aboutContent.milestones} />
      </Section>
      <SectionCTA context={aboutContent.ctaContext} />
    </>
  );
}
