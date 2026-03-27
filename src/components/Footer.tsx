import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#0F172A]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, system-ui, sans-serif" }} whileHover={{ scale: 1.05 }}>
            Nicolas<span className="text-[#1A73E8]">.</span>
          </motion.div>
          <div className="flex items-center gap-8 text-sm text-[#64748B]">
            {["About", "Timeline", "Skills", "Services", "Projects", "Contact"].map((item) => (
              <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors duration-200">{item}</button>
            ))}
          </div>
          <div className="text-xs text-[#64748B]">© {new Date().getFullYear()} Nicolas Bustamante</div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#475569]">Built with React, TypeScript & Tailwind CSS</div>
          <div className="flex items-center gap-4 text-xs text-[#475569]">
            <a href="mailto:nbustamante.work@gmail.com" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              nbustamante.work@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#475569]">
            <span>🇧🇴</span><span>Made in Bolivia with</span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-red-500">♥</motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
}
