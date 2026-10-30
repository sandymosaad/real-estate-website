import { UnionProjectCard } from "@/components/services/UnionProjectCard";
import { UnionExplanation } from "@/components/services/UnionExplanation";
import { Section } from "@/components/ui/Section";
import { getUnionProjects } from "@/lib/data/union-projects";
import type { UnionProject } from "@/models/UnionProject";

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
        <Section title="مشاريع مفتوحة">
          <p className="rounded-xl border border-border p-8 text-center text-muted">
            حصلت مشكلة مؤقتة في تحميل المشاريع. جرّب تاني بعد شوية.
          </p>
        </Section>
      </>
    );
  }

  return (
    <>
      <UnionExplanation />
      <Section
        title="مشاريع مفتوحة"
        subtitle="اختار المشروع المناسب وشوف المقاعد المتاحة."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <UnionProjectCard key={project.slug} project={project} />
          ))}
        </div>
        {projects.length === 0 && (
          <p className="rounded-xl border border-border p-8 text-center text-muted">
            مفيش مشاريع مفتوحة حاليًا، تابعنا قريبًا.
          </p>
        )}
      </Section>
    </>
  );
}
