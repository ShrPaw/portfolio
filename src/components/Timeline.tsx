import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEntry {
  year: string; title: string; company: string; description: string;
  status: "completed" | "in-progress"; color: string; icon: string;
}

const timelineData: TimelineEntry[] = [
  { year: "2019", title: "Pasaporte BNB Program", company: "Banco Nacional de Bolivia", description: "Selected among hundreds of applicants for a 6-month intensive rotation across all major banking departments. Presented a debit card incentive project directly to vice-presidents.", status: "completed", color: "#22C55E", icon: "🏦" },
  { year: "2020–22", title: "Sales Executive – Direct Sales Launch", company: "Cervecería Boliviana Nacional (AB InBev)", description: "Opened and coded ~100 points of sale during AB InBev's Direct Sales launch. Consistently ranked among top performers in a team of 50+ executives.", status: "completed", color: "#22C55E", icon: "🍺" },
  { year: "2022–25", title: "Key Account Manager – Wholesalers", company: "Intcomex Bolivia", description: "Trusted relationship manager for the 4 largest wholesalers in Cochabamba. Handled ~2 million bolivianos monthly while organizing trainings and activations.", status: "completed", color: "#22C55E", icon: "💼" },
  { year: "Now", title: "AI Developer & Python Automation", company: "Upwork & Independent Clients", description: "Building AI prototypes, Python automations, trading bots, and providing bilingual customer success consulting for international clients.", status: "in-progress", color: "#1A73E8", icon: "🚀" },
];

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10 group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg text-2xl relative overflow-hidden"
          style={{ background: entry.status === "in-progress" ? "linear-gradient(135deg, #1A73E8, #00D99F)" : entry.color }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {entry.status === "in-progress" && <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(90deg, transparent, white, transparent)", animation: "shimmer 2s infinite" }} />}
          <span className="relative z-10">{entry.icon}</span>
        </motion.div>
        {index < timelineData.length - 1 && <div className="w-0.5 flex-1 min-h-[60px] bg-gradient-to-b from-[#E2E8F0] to-transparent mt-2" />}
      </div>

      <motion.div
        className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:border-[#1A73E8]/20 transition-all duration-500 group-hover:-translate-y-1 mb-8"
        whileHover={{ boxShadow: "0 20px 40px -12px rgba(26, 115, 232, 0.12)" }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg text-white tracking-wide" style={{ background: entry.status === "in-progress" ? "linear-gradient(135deg, #1A73E8, #00D99F)" : entry.color }}>{entry.year}</span>
          {entry.status === "in-progress" && (
            <span className="text-xs font-semibold text-[#1A73E8] bg-[#1A73E8]/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <motion.span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              IN PROGRESS
            </span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] leading-snug">{entry.title}</h3>
        <p className="text-sm text-[#1A73E8] font-semibold mt-1.5">{entry.company}</p>
        <p className="mt-4 text-[#64748B] leading-relaxed text-[15px]">{entry.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="timeline" className="py-24 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: "#1A73E8" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: "#FACC15" }} />
      <div className="max-w-3xl mx-auto relative">
        <motion.div ref={headerRef} className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <motion.span className="inline-block text-xs font-bold tracking-[0.25em] text-[#1A73E8] uppercase mb-4 px-4 py-2 bg-[#1A73E8]/5 rounded-full" initial={{ opacity: 0, scale: 0.8 }} animate={headerInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>Career Journey</motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-4">My Career Timeline</h2>
          <p className="text-[#64748B] mt-4 max-w-md mx-auto">From banking rotations to building AI solutions — a path driven by curiosity and hustle.</p>
        </motion.div>
        <div className="relative">
          {timelineData.map((entry, idx) => <TimelineCard key={idx} entry={entry} index={idx} />)}
        </div>
      </div>
    </section>
  );
}
