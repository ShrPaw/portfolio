import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import StatsCounter from "./components/StatsCounter";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import WhatsAppFloat from "./components/WhatsAppFloat";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <StatsCounter />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
