import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Navbar from "../components/Navbar";
import Features from "../components/home/Features";
import Story from "../components/home/Story";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";

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