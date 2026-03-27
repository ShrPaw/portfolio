import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat { value: number; suffix: string; label: string; prefix?: string; }

const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Points of Sale Coded" },
  { value: 2, suffix: "M+", prefix: "~", label: "BOB Monthly Managed" },
  { value: 5, suffix: "+", label: "Trading Bots Built" },
];

function AnimatedNumber({ value, suffix, prefix, inView }: { value: number; suffix: string; prefix?: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span className="tabular-nums">{prefix}{display}{suffix}</span>;
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 px-6 bg-[#0F172A]">
      <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div key={idx} className="text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.15 }}>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} inView={isInView} />
            </div>
            <div className="text-sm text-[#64748B] font-medium tracking-wide uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
