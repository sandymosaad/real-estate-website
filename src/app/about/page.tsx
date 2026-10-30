import type { Metadata } from "next";
import Link from "next/link";
import { Eye, HandHeart, MapPinned, ShieldCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "قصتنا",
  description: "اتعرف على قصة بيتك أسيوط ورؤيتنا لمساعدة أهل أسيوط في رحلتهم العقارية.",
};

const values = [
  {
    title: "الوضوح",
    description: "نشرح التفاصيل ببساطة ومن غير كلام كبير.",
    icon: Eye,
  },
  {
    title: "الأمانة",
    description: "نقول اللي نعرفه ونكون صريحين في كل خطوة.",
    icon: ShieldCheck,
  },
  {
    title: "القرب",
    description: "فاهمين مراكز أسيوط واحتياجات أهلها.",
    icon: MapPinned,
  },
  {
    title: "المساندة",
    description: "نفضل جنبك من أول سؤال لحد ما الصورة توضح.",
    icon: HandHeart,
  },
];

// PLACEHOLDER
const teamMembers = [
  "فريق البحث والتنسيق",
  "فريق متابعة العقارات",
  "فريق خدمة العملاء",
];

// PLACEHOLDER DATES
const milestones = [
  {
    date: "2024",
    title: "بدأت الفكرة",
    description: "بدأنا نسأل إزاي نخلي البحث عن العقار أبسط.",
  },
  {
    date: "2025",
    title: "وسعنا نطاقنا",
    description: "بدأنا نغطي مراكز أكتر في أسيوط.",
  },
  {
    date: "قريبًا",
    title: "خطوتنا الجاية",
    description: "نكمّل بناء تجربة أوضح لكل عميل.",
  },
];

/** Presents the story, values, and direction of the Assiut real-estate service. */
export default function AboutPage() {
  return (
    <>
      <Section
        title="قصتنا"
        subtitle="بدأنا من سؤال بسيط: إزاي نساعد أهل أسيوط يلاقوا طريق أوضح لعقار مناسب؟"
      >
        <p className="max-w-3xl leading-8 text-muted">
          الأراضي والشقق بقت تحدي كبير خصوصًا للشباب، وكتير من الناس
          بتواجه معلومات ناقصة أو اختيارات مش واضحة. عشان كده أسسنا بيتك
          أسيوط كمساحة تجمع الاختيارات وتشرحها بلغة بسيطة وقريبة.
        </p>
      </Section>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl bg-primary-light p-6">
            <Target className="text-primary" size={30} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-ink">مهمتنا</h2>
            <p className="mt-3 leading-7 text-muted">
              نساعدك تفهم اختياراتك العقارية في أسيوط وتوصل لقرار مناسب ليك،
              من غير ضغط أو وعود مبالغ فيها.
            </p>
          </article>
          <article className="rounded-xl border border-border p-6">
            <Eye className="text-primary" size={30} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-ink">رؤيتنا</h2>
            <p className="mt-3 leading-7 text-muted">
              نبني تجربة محلية موثوقة تخلي الوصول للمعلومة والتواصل مع أهل
              الخبرة أسهل.
            </p>
          </article>
        </div>
      </Section>
      <Section title="قيمنا">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, description, icon: Icon }) => (
            <div key={title}>
              <Icon className="text-primary" size={28} aria-hidden="true" />
              <h2 className="mt-3 font-bold text-ink">{title}</h2>
              <p className="mt-2 leading-6 text-muted">{description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="فريقنا">
        <div className="grid gap-5 md:grid-cols-3">
          {teamMembers.map((member) => (
            <div
              key={member}
              className="rounded-xl border border-border bg-primary-light p-6 text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm text-muted">
                صورة
              </div>
              <h2 className="mt-4 font-bold text-ink">{member}</h2>
              <p className="mt-2 text-sm text-muted">فريق بيتك أسيوط</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="محطات في الطريق">
        <div className="grid gap-5 md:grid-cols-3">
          {milestones.map((milestone) => (
            <div
              key={milestone.date}
              className="border-s-2 border-primary ps-5"
            >
              <p className="font-bold text-primary">{milestone.date}</p>
              <h2 className="mt-2 font-bold text-ink">{milestone.title}</h2>
              <p className="mt-2 leading-6 text-muted">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <section className="bg-primary py-14 text-center text-white">
        <h2 className="text-3xl font-bold">خلينا نبدأ من احتياجك</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          احكيلنا بتدور على إيه، وهنساعدك تشوف الصورة أوضح.
        </p>
        <Link href="/contact" className="mt-6 inline-flex">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            تواصل معانا
          </Button>
        </Link>
      </section>
    </>
  );
}
