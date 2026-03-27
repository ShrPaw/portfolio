import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
  "I'm Nicolás Bustamante, a Bilingual Python Developer and Automation Specialist from Cochabamba, Bolivia.",
  "My career started in 2019 with the highly selective Pasaporte BNB program at Banco Nacional de Bolivia, where I rotated through every major department of one of the country's largest banks. I then joined AB InBev as a Sales Executive during their Direct Sales launch, consistently ranking among the top performers.",
  "At Intcomex Bolivia I became the trusted key account manager for the region's largest wholesalers, handling ~2 million bolivianos in monthly transactions and organizing strategic activations. Parallel to my corporate roles, I've spent the last 6+ years as an independent trader, building my own Python tools, TradingView scripts, and 5+ custom trading bots from scratch.",
  "I combine real corporate process knowledge with strong technical skills to deliver fast, reliable automation and trading solutions.",
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-6 bg-white border-b border-[#E2E8F0]">
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <motion.span className="inline-block text-xs font-bold tracking-[0.25em] text-[#1A73E8] uppercase mb-4 px-4 py-2 bg-[#1A73E8]/5 rounded-full" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            Who I Am
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-4">About Me</h2>
        </motion.div>

        <div className="space-y-6">
          {paragraphs.map((text, idx) => (
            <motion.p
              key={idx}
              className={`text-lg leading-relaxed ${idx === 0 ? "text-[#0F172A] font-semibold text-xl" : idx === paragraphs.length - 1 ? "text-[#1A73E8] font-medium" : "text-[#64748B]"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.15 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.9 }}>
          {[
            { icon: "🐍", label: "Python First", desc: "Automation at scale" },
            { icon: "🤖", label: "AI Builder", desc: "Chatbots & prototypes" },
            { icon: "📈", label: "Trader", desc: "6+ years live trading" },
          ].map((item, idx) => (
            <motion.div key={idx} className="flex items-center gap-4 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1A73E8]/20 hover:shadow-md transition-all duration-300" whileHover={{ y: -2 }}>
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold text-[#0F172A] text-sm">{item.label}</div>
                <div className="text-xs text-[#64748B]">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
