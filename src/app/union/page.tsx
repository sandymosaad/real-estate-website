import { UnionProjectCard } from "@/components/services/UnionProjectCard";
import { UnionExplanation } from "@/components/services/UnionExplanation";
import { LeadForm } from "@/components/forms/LeadForm";
import { Section } from "@/components/ui/Section";
import { getUnionProjects } from "@/lib/data/union-projects";
import type { UnionProject } from "@/models/UnionProject";
import { unionContent } from "@/content/union";
import { SectionCTA } from "@/components/contact/SectionCTA";
import { CallButton } from "@/components/contact/CallButton";
import { ContactWhatsAppButton } from "@/components/contact/WhatsAppButton";

/** Displays the union explanation and currently open projects. */
export default async function UnionPage() {
  let projects: UnionProject[] = [];

  try {
    projects = await getUnionProjects();
  } catch (error: unknown) {
    console.error("تعذر تحميل مشاريع اتحاد الملاك:", error);
    return (
      <>
        <UnionExplanation />
        <Section title={unionContent.title}>
          <p className="rounded-xl border border-border p-8 text-center text-muted">
            حصلت مشكلة مؤقتة في تحميل المشاريع. جرّب تاني بعد شوية.
          </p>
        </Section>
        <Section>
          <div className="mx-auto max-w-2xl">
            <LeadForm
              title="مهتم باتحاد ملاك؟"
              defaultInterestType="اتحاد ملاك"
              relatedItemType="unionProject"
            />
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <UnionExplanation />
      <Section
        title={unionContent.title}
        subtitle={unionContent.subtitle}
      >
        <div className="mb-6 flex flex-wrap gap-3">
          <CallButton context="اتحاد ملاك" />
          <ContactWhatsAppButton context="اتحاد ملاك" />
        </div>
        <div className="mb-8 rounded-xl border border-border bg-primary-light p-6">
          <h2 className="text-2xl font-bold text-ink">{unionContent.beforeJoinTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pe-5 text-muted">
            {unionContent.beforeJoin.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <UnionProjectCard key={project.slug} project={project} />
          ))}
        </div>
        {projects.length === 0 && (
          <p className="rounded-xl border border-border p-8 text-center text-muted">
            {unionContent.empty}
          </p>
        )}
      </Section>
      <SectionCTA context="اتحاد ملاك" />
    </>
  );
}
