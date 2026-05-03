import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Combos from "@/components/combos";
import Menu from "@/components/menu";
import Characters from "@/components/characters";
import Footer from "@/components/footer";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Combos />
        <SectionDivider />
        <Menu />
        <SectionDivider />
        <Characters />
      </main>
      <Footer />
    </>
  );
}
