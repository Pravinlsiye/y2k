import { onMount } from "solid-js";
import { ScrollTrigger } from "./lib/gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Philosophy from "./components/Philosophy";
import VisionMission from "./components/VisionMission";
import WhyWeExist from "./components/WhyWeExist";
import Footer from "./components/Footer";

export default function App() {
  onMount(() => {
    ScrollTrigger.refresh();
  });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Philosophy />
        <VisionMission />
        <WhyWeExist />
      </main>
      <Footer />
    </>
  );
}
