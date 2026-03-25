import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import AdvancedEdge from "@/components/sections/AdvancedEdge";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <AdvancedEdge />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}