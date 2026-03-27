import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Service { icon: string; title: string; description: string; features: string[]; priceRange: string; popular?: boolean; color: string; bgColor: string; }

const services: Service[] = [
  { icon: "🐍", title: "Python Automation", description: "Custom scripts that save hours of manual work. Data processing, file handling, API integrations, workflow automation.", features: ["Custom Python scripts", "Scheduled task automation", "API integrations", "Data pipeline setup"], priceRange: "$50–200", color: "#3776AB", bgColor: "#3776AB10" },
  { icon: "🤖", title: "AI Chatbot Development", description: "Intelligent chatbots powered by LLMs (Gemini, OpenAI). Customer support, lead generation, internal tools.", features: ["Custom AI chatbot", "Knowledge base integration", "Multi-language support", "Analytics dashboard"], priceRange: "$150–500", popular: true, color: "#1A73E8", bgColor: "#1A73E810" },
  { icon: "📊", title: "Data Analysis & Dashboards", description: "Turn raw data into actionable insights. Excel/Python analysis, automated reports, interactive dashboards.", features: ["Data cleaning & analysis", "Automated Excel reports", "Interactive dashboards", "Visualization & charts"], priceRange: "$75–300", color: "#22C55E", bgColor: "#22C55E10" },
  { icon: "📈", title: "Trading Bot Development", description: "Custom trading algorithms and indicators. Backtested strategies, live execution, Telegram alerts.", features: ["TradingView indicators", "Python trading bots", "Backtesting & optimization", "Real-time alerts"], priceRange: "$200–800", color: "#F59E0B", bgColor: "#F59E0B10" },
  { icon: "🌐", title: "Bilingual Support Systems", description: "English/Spanish customer success setups. Ticket systems, automated responses, CRM configuration.", features: ["EN/ES support setup", "CRM configuration", "Automated workflows", "Knowledge base creation"], priceRange: "$100–400", color: "#EC4899", bgColor: "#EC489910" },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${service.popular ? "border-[#1A73E8] shadow-xl shadow-[#1A73E8]/10" : "border-[#E2E8F0] hover:border-[#1A73E8]/20 hover:shadow-xl"}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {service.popular && <div className="bg-[#1A73E8] text-white text-xs font-bold text-center py-1.5 tracking-wider uppercase">⭐ Most Popular</div>}
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: service.bgColor }}>{service.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-[#0F172A]">{service.title}</h3>
            <div className="text-sm font-bold mt-1" style={{ color: service.color }}>{service.priceRange} per project</div>
          </div>
        </div>
        <p className="text-sm text-[#64748B] leading-relaxed mb-5">{service.description}</p>
        <ul className="space-y-2.5 mb-6">
          {service.features.map((feature, i) => (
            <motion.li key={i} className="flex items-center gap-3 text-sm text-[#0F172A]" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.1 + i * 0.08 + 0.3 }}>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: service.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              {feature}
            </motion.li>
          ))}
        </ul>
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
          style={{ backgroundColor: service.popular ? service.color : "transparent", color: service.popular ? "white" : service.color, border: service.popular ? "none" : `2px solid ${service.color}` }}
          whileHover={{ backgroundColor: service.color, color: "white" }}
          whileTap={{ scale: 0.97 }}
        >
          Get a Quote →
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: "#FACC15" }} />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: "#1A73E8" }} />
      <div ref={ref} className="max-w-5xl mx-auto relative">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <motion.span className="inline-block text-xs font-bold tracking-[0.25em] text-[#1A73E8] uppercase mb-4 px-4 py-2 bg-[#1A73E8]/5 rounded-full" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>Freelance Services</motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-4">What I Can Build For You</h2>
          <p className="text-[#64748B] mt-4 max-w-lg mx-auto">From quick automations to full AI systems — I deliver fast, reliable solutions. All work is done personally, no outsourcing.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => <ServiceCard key={idx} service={service} index={idx} />)}
        </div>
        <motion.div className="mt-14 text-center" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }}>
          <p className="text-sm text-[#64748B] mb-4">Need something custom? Let's talk.</p>
          <motion.a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white font-semibold text-sm rounded-xl hover:bg-[#0F172A]/90 transition-colors duration-200" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Contact Me Directly →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
