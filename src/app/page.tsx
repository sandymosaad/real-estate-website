import { connection } from "next/server";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestListings } from "@/components/home/LatestListings";
import { SectionCTA } from "@/components/contact/SectionCTA";
import { QuickSearch } from "@/components/home/QuickSearch";
import { ServicesCards } from "@/components/home/ServicesCards";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUs } from "@/components/home/WhyUs";
import { getPublishedTestimonials } from "@/lib/data/testimonials";

export const instant = false;

export default async function Home() {
  await connection();
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <Hero />
      <QuickSearch />
      <ServicesCards />
      <WhyUs />
      <LatestListings />
      {/* Keep one mid-page strip; Hero, FinalCTA, and the mobile bar already provide contact actions. */}
      <SectionCTA context="اختيارات العقارات" />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <FAQ />
      <FinalCTA />
    </>
  );
}
