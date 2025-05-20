import Hero from "../../src/components/home/Hero";
import About from "../../src/components/home/About";
import Navbar from "../../src/components/Navbar";
import Features from "../../src/components/home/Features";
import Story from "../../src/components/home/Story";
import Contact from "../../src/components/home/Contact";
import Footer from "../../src/components/home/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};