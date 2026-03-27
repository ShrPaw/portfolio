import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("nicolas.bustamante@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { label: "Upwork", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.487-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.039-2.687-5.892H7.828v7.112c-.002 1.405-1.141 2.543-2.547 2.543s-2.543-1.139-2.543-2.544V3.491H0v7.112c0 2.914 2.37 5.298 5.281 5.298 2.913 0 5.283-2.385 5.283-5.298v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-2.998-2.439-5.447-5.439-5.447z" /></svg>, href: "https://www.upwork.com", color: "#14B867" },
    { label: "LinkedIn", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, href: "https://www.linkedin.com", color: "#0077B5" },
    { label: "GitHub", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>, href: "https://github.com", color: "#333" },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-white relative">
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <motion.span className="inline-block text-xs font-bold tracking-[0.25em] text-[#1A73E8] uppercase mb-4 px-4 py-2 bg-[#1A73E8]/5 rounded-full" initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>Get in Touch</motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mt-4">Let's Work Together</h2>
          <p className="text-[#64748B] mt-4 max-w-md mx-auto">Ready to automate your processes, build trading systems, or prototype an AI solution? Let's talk.</p>
        </motion.div>

        <motion.div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl shadow-[#0F172A]/5 p-8 md:p-12 relative overflow-hidden" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: "#1A73E8" }} />
          <div className="relative z-10 space-y-8">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A73E8]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#1A73E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Email</div>
                <div className="text-[#0F172A] font-semibold">nicolas.bustamante@example.com</div>
              </div>
              <button onClick={copyEmail} className="px-4 py-2 text-sm font-medium rounded-lg border border-[#E2E8F0] text-[#64748B] hover:border-[#1A73E8] hover:text-[#1A73E8] transition-all duration-200">{copied ? "✓ Copied" : "Copy"}</button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Location</div>
                <div className="text-[#0F172A] font-semibold">Cochabamba, Bolivia (GMT-4)</div>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                <motion.div className="w-3 h-3 bg-[#22C55E] rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>
              <div>
                <div className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Status</div>
                <div className="text-[#0F172A] font-semibold">Available for new projects</div>
              </div>
            </div>

            <div className="border-t border-[#E2E8F0]" />

            {/* Social Links */}
            <div>
              <div className="text-xs text-[#64748B] font-medium uppercase tracking-wider mb-4">Find me on</div>
              <div className="flex gap-3">
                {socials.map((social, idx) => (
                  <motion.a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-300 group" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <span style={{ color: social.color }} className="group-hover:scale-110 transition-transform duration-300 inline-block">{social.icon}</span>
                    <span className="text-sm font-medium text-[#0F172A]">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.a href="https://www.upwork.com" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 rounded-xl bg-[#0F172A] text-white font-semibold text-base hover:bg-[#0F172A]/90 transition-colors duration-200 shadow-lg shadow-[#0F172A]/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Hire Me on Upwork →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
