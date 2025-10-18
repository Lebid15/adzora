import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { mockGalleryData } from "@/lib/data/gallery-data";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery items={mockGalleryData} />
      <About />
      <Contact />
    </main>
  );
}
