import PageTransition from "@/components/layout/PageTransition";
import Hero from "@/components/sections/Hero";
import StatsTicker from "@/components/sections/StatsTicker";
import Programs from "@/components/sections/Programs";
import About from "@/components/sections/About";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import CoachesPreview from "@/components/sections/CoachesPreview";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import JoinCTA from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <PageTransition>
      <main className="bg-deep-black w-full min-h-screen">
        <Hero />
        <StatsTicker />
        <Programs />
        <About />
        <HorizontalShowcase />
        <CoachesPreview />
        <Testimonials />
        <Pricing />
        <JoinCTA />
      </main>
    </PageTransition>
  );
}
