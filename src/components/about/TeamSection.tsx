import { aboutContent } from "@/content/about";
import { RevealList } from "@/components/animation/RevealList";
import { Section } from "@/components/ui/Section";
import { TeamCard } from "./TeamCard";

/** Renders the public team roles and their customer responsibilities. */
export function TeamSection() {
  return (
    <Section title={aboutContent.teamTitle}>
      <RevealList className="grid gap-5 md:grid-cols-3">
        {aboutContent.teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </RevealList>
    </Section>
  );
}
