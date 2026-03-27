import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";

const roles = ["Data Analyst", "Python Developer", "AI Specialist", "Automation Expert"];

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < current.length) setCharIndex(charIndex + 1);
        else setTimeout(() => setIsDeleting(true), 2000);
      } else {
        if (charIndex > 0) setCharIndex(charIndex - 1);
        else { setIsDeleting(false); setRoleIndex((roleIndex + 1) % roles.length); }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <span className="text-[#1A73E8]">
      {roles[roleIndex].substring(0, charIndex)}
      <motion.span className="inline-block w-0.5 h-8 md:h-10 bg-[#1A73E8] ml-1 align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }} />
    </span>
  );
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <motion.button
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({ x: (e.clientX - rect.left - rect.width / 2) * 0.2, y: (e.clientY - rect.top - rect.height / 2) * 0.2 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToServices = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative overflow-hidden bg-white">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(circle, #1A73E8, transparent)", top: "-10%", right: "-5%", animation: "float-slow 20s ease-in-out infinite" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-8" style={{ background: "radial-gradient(circle, #FACC15, transparent)", bottom: "-10%", left: "-5%", animation: "float-slow 25s ease-in-out infinite reverse" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-6" style={{ background: "radial-gradient(circle, #00D99F, transparent)", top: "40%", left: "50%", animation: "float-slow 18s ease-in-out infinite" }} />
      </div>

      <ParticleField />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        {/* Avatar with glow ring */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
          <div className="absolute -inset-4 rounded-full opacity-30 blur-xl" style={{ background: "conic-gradient(from 0deg, #1A73E8, #FACC15, #00D99F, #1A73E8)", animation: "spin-slow 8s linear infinite" }} />
          <div className="absolute -inset-2 rounded-full opacity-40" style={{ background: "conic-gradient(from 180deg, #1A73E8, #FACC15, #00D99F, #1A73E8)", animation: "spin-slow 6s linear infinite reverse", padding: "2px", mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))" }} />
          <img src="/nicolas-profile.jpg" alt="Nicolas Bustamante" className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shadow-2xl relative z-10 ring-4 ring-white" style={{ objectPosition: "center 20%" }} />
        </motion.div>

        {/* Availability badge */}
        <motion.div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0F172A]/[0.03] backdrop-blur-sm border border-[#E2E8F0] rounded-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <motion.div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-sm font-medium text-[#64748B]">Open to full-time & freelance</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0F172A] leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Nicolas<br />Bustamante
        </motion.h1>

        <motion.div className="text-2xl md:text-3xl font-medium min-h-[2.5rem] md:min-h-[3rem]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <TypewriterText />
        </motion.div>

        <motion.p className="text-base md:text-lg text-[#64748B] max-w-xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
          Ex-Intcomex & AB InBev • 4+ years building automations, AI chatbots, trading systems & data solutions for real business problems.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
          <MagneticButton onClick={scrollToContact} className="px-8 py-4 text-base font-semibold rounded-xl bg-[#0F172A] text-white hover:bg-[#0F172A]/90 transition-colors duration-200 shadow-lg shadow-[#0F172A]/20">
            Hire Me (Full-time) →
          </MagneticButton>
          <MagneticButton onClick={scrollToServices} className="px-8 py-4 text-base font-semibold rounded-xl border-2 border-[#FACC15] text-[#0F172A] bg-white hover:bg-[#FACC15]/10 transition-colors duration-200">
            💼 Freelance Services
          </MagneticButton>
        </motion.div>

        <motion.a href="/cv-nicolas-bustamante.html" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#1A73E8] transition-colors duration-200 group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}>
          <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Download CV / Resume
        </motion.a>

        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#64748B]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}>
          <span className="flex items-center gap-1.5"><span className="text-lg">🇧🇴</span> Bolivia</span>
          <span className="w-1 h-1 bg-[#CBD5E1] rounded-full" />
          <span className="flex items-center gap-1.5"><span className="text-lg">🇺🇸</span> USA Clients</span>
          <span className="w-1 h-1 bg-[#CBD5E1] rounded-full" />
          <span>Bilingual EN/ES</span>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center cursor-pointer group"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-[10px] tracking-[0.3em] text-[#94A3B8] font-medium mb-3 group-hover:text-[#1A73E8] transition-colors duration-300">SCROLL</div>
          <motion.div className="w-5 h-9 rounded-full border-2 border-[#CBD5E1] flex items-start justify-center pt-1.5 group-hover:border-[#1A73E8] transition-colors duration-300">
            <motion.div className="w-1 h-2 bg-[#94A3B8] rounded-full group-hover:bg-[#1A73E8]" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
