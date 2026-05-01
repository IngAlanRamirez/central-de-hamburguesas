import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Combos from "@/components/combos";
import Menu from "@/components/menu";
import Characters from "@/components/characters";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Combos />
        <Menu />
        <Characters />
      </main>
      <Footer />
    </>
  );
}
