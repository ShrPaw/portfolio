import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill { icon: string; label: string; desc: string; level: number; color: string; }

const skills: Skill[] = [
  { icon: "fab fa-python", label: "Python", desc: "Automations, Scripting & Backend", level: 90, color: "#3776AB" },
  { icon: "fas fa-robot", label: "AI Prototypes", desc: "Chatbots & Intelligent Systems", level: 85, color: "#1A73E8" },
  { icon: "fas fa-chart-line", label: "Trading Systems", desc: "Live Indicators & Scalping Bots", level: 88, color: "#22C55E" },
  { icon: "fas fa-cogs", label: "Enterprise", desc: "Intcomex & AB InBev Scale", level: 92, color: "#F59E0B" },
  { icon: "fas fa-headset", label: "Customer Success", desc: "Bilingual Support & CX", level: 95, color: "#8B5CF6" },
  { icon: "fas fa-globe", label: "Bilingual Ops", desc: "English & Spanish Native", level: 100, color: "#EC4899" },
];

function ProgressRing({ level, color, inView }: { level: number; color: string; inView: boolean }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <svg className="absolute -top-2 -right-2 w-14 h-14 -rotate-90" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="3" />
      <motion.circle cx="32" cy="32" r={radius} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={inView ? { strokeDashoffset } : {}} transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }} />
      <text x="32" y="32" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold fill-[#0F172A]" style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>{level}</text>
    </svg>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-default perspective-1000"
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -10, y: ((e.clientX - rect.left) / rect.width - 0.5) * 10 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:border-transparent hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}10, transparent 70%)` }} />
        <ProgressRing level={skill.level} color={skill.color} inView={isInView} />
        <motion.div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300" style={{ backgroundColor: `${skill.color}10` }} whileHover={{ scale: 1.1, rotate: 5 }}>
          <i className={`${skill.icon} text-2xl`} style={{ color: skill.color }} />
        </motion.div>
        <h3 className="text-base font-bold text-[#0F172A] mb-1">{skill.label}</h3>
        <p className="text-xs text-[#64748B] leading-relaxed">{skill.desc}</p>
        <motion.div className="absolute bottom-0 left-0 h-0.5 rounded-full" style={{ backgroundColor: skill.color }} initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : {}} transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: "easeOut" }} />
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="py-24 px-6 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <motion.div ref={headerRef} className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <motion.span className="inline-block text-xs font-bold tracking-[0.25em] text-[#1A73E8] uppercase mb-4 px-4 py-2 bg-[#1A73E8]/5 rounded-full" initial={{ opacity: 0, scale: 0.8 }} animate={headerInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>What I Do</motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-4">Skills &amp; Expertise</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => <SkillCard key={idx} skill={skill} index={idx} />)}
        </div>
      </div>
    </section>
  );
}
