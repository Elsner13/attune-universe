import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Products } from "@/components/sections/Products";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { AboutSection } from "@/components/sections/About";
import { BottomCTA } from "@/components/sections/BottomCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Products />
        <Testimonials />
        <Newsletter />
        <AboutSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
