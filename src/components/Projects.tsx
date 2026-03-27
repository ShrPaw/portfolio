import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Project { title: string; description: string; tags: string[]; link?: string; color: string; icon: string; }

const projects: Project[] = [
  { title: "Sessions with Opening/Closing Multi-Timeframe", description: "TradingView indicator showing session open/close levels across multiple timeframes. Used by active day traders for timing entries.", tags: ["Pine Script", "TradingView", "Indicators"], link: "https://es.tradingview.com/script/15bIFKpL-Sessions-with-Opening-Closing-Multi-timeframe/", color: "#22C55E", icon: "📊" },
  { title: "SOL 15m Momentum Scalper", description: "High-frequency scalping bot for Solana using momentum indicators on 15-minute candles. Built with Python + ccxt.", tags: ["Python", "ccxt", "Crypto", "Scalping"], link: "https://es.tradingview.com/script/YdmCARfZ/", color: "#9945FF", icon: "⚡" },
  { title: "XRP 15m VWAP EMA Cloud Scalper Pro", description: "Advanced XRP trading system combining VWAP and EMA cloud strategies. Real-time signal generation with Telegram alerts.", tags: ["Python", "VWAP", "EMA", "Telegram Bot"], link: "https://es.tradingview.com/script/RMOxl45V/", color: "#00AAE4", icon: "🌊" },
  { title: "AI Portfolio Chatbot", description: "Interactive AI assistant for this portfolio site, powered by Gemini API. Demonstrates chatbot integration and NLP capabilities.", tags: ["React", "Gemini API", "TypeScript"], color: "#1A73E8", icon: "🤖" },
  { title: "Enterprise Process Automation", description: "Custom Python automation pipelines built for Intcomex Bolivia. Streamlined wholesale operations and reporting.", tags: ["Python", "Automation", "Enterprise"], color: "#F59E0B", icon: "⚙️" },
  { title: "Bilingual Customer Success System", description: "Customer support framework with English/Spanish routing, ticket management, and automated follow-ups.", tags: ["Python", "CRM", "i18n"], color: "#EC4899", icon: "🌐" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -8, y: ((e.clientX - rect.left) / rect.width - 0.5) * 8 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.a
        href={project.link}
        target={project.link ? "_blank" : undefined}
        rel={project.link ? "noopener noreferrer" : undefined}
        className="block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-2xl hover:border-transparent transition-all duration-500"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }} />
        <div className="p-6 md:p-7">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm" style={{ backgroundColor: `${project.color}10` }}>{project.icon}</div>
            <h3 className="text-lg font-bold text-[#0F172A] leading-snug group-hover:text-[#1A73E8] transition-colors duration-300">{project.title}</h3>
          </div>
          <p className="text-sm text-[#64748B] leading-relaxed mb-5">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => <span key={i} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#64748B] tracking-wide uppercase">{tag}</span>)}
          </div>
          {project.link && (
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#1A73E8] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View on TradingView
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          )}
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="py-24 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: "#FACC15" }} />
      <div className="max-w-5xl mx-auto relative">
        <motion.div ref={headerRef} className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <motion.span className="inline-block text-xs font-bold tracking-[0.25em] text-[#1A73E8] uppercase mb-4 px-4 py-2 bg-[#1A73E8]/5 rounded-full" initial={{ opacity: 0, scale: 0.8 }} animate={headerInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>My Work</motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-4">Featured Projects</h2>
          <p className="text-[#64748B] mt-4 max-w-lg mx-auto">Real solutions for real problems — trading bots, AI prototypes, and enterprise automations.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => <ProjectCard key={idx} project={project} index={idx} />)}
        </div>
      </div>
    </section>
  );
}
