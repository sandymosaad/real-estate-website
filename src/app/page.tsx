import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestListings } from "@/components/home/LatestListings";
import { QuickSearch } from "@/components/home/QuickSearch";
import { ServicesCards } from "@/components/home/ServicesCards";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyUs } from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <ServicesCards />
      <WhyUs />
      <LatestListings />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
