import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message { id: string; text: string; isUser: boolean; }

// Offline chatbot with pre-built responses — works without API key
const RESPONSES: Record<string, string> = {
  default: "Hey! I'm Nicolas' AI assistant. I know his full career story — ask me about his experience at AB InBev, Intcomex, Banco Nacional de Bolivia, his Python automation work, trading bots, or anything else. You can also reach him directly at nbustamante.work@gmail.com or WhatsApp +59172512525!",

  skills: "Nicolas brings a rare mix of commercial experience and technical skills:\n\n🐍 Python — 4+ years building automations, data pipelines, trading bots (ccxt, pandas, requests), and API integrations\n🤖 AI — Chatbot development using Gemini API and OpenAI, integrated into real products\n📊 Data Analysis — Sales reports, performance dashboards, automated Excel reports\n📈 Trading Systems — 5+ custom trading bots, TradingView Pine Script indicators, VWAP/EMA strategies\n🌐 Bilingual — Native Spanish + advanced English, proven in multinational environments (AB InBev, Intcomex)\n💼 Enterprise — Process automation at scale for Intcomex, customer success systems",

  experience: "Here's Nicolas' career journey:\n\n🏦 2019 — Banco Nacional de Bolivia (BNB): Selected among hundreds for the prestigious Pasaporte BNB program. Only 4 candidates made it. He rotated through Retail Banking, Corporate Banking, Credit Risk, HR, Operations, Financial Leasing, and more. He presented a debit card rewards project for youth directly to regional and national vice presidents.\n\n🍺 2020–2022 — Cervecería Boliviana Nacional (AB InBev): Sales Executive during the Direct Sales launch. He opened and coded ~100 points of sale, consistently ranked among top performers out of 50+ executives. Managed small stores to wholesalers, ensured in-store execution, tracked coolers/dispensers, and worked closely with logistics. Frequently recognized as one of the best salespeople on the team.\n\n💼 2022–2025 — Intcomex Bolivia: Key Account Manager handling the region's largest wholesalers. Managed enterprise accounts (resellers, integrators, hardware/software/cloud clients). Organized strategic activations and trainings. Built Python scripts to automate sales reports, dashboards, and TradingView market monitoring alerts. Combined Customer Success with technical automation.\n\n🚀 Now — Full-time on AI development, Python automation, and freelance projects via Upwork.",

  bnb: "In 2019, Nicolas was selected among hundreds of applicants for the Pasaporte BNB program at Banco Nacional de Bolivia — the country's second-largest bank. Only 4 candidates were chosen for this intensive 6-month rotational program. He rotated through every key department: Retail Banking, Corporate & Institutional Banking, Credit Risk, HR, Operations & Systems, Financial Leasing, Teller Operations, and large-scale credit approvals. His job was to observe processes, identify inefficiencies, and propose improvements. At the end, he developed a debit card rewards program for youth (points + monthly raffles) and presented it to regional and national vice presidents.",

  abinbev: "Nicolas joined Cervecería Boliviana Nacional (CBN – AB InBev), Bolivia's largest beverage company, as a Sales Executive during the launch of their Direct Sales project. From day one, he was opening and coding ~100 points of sale across his region. He managed a diverse portfolio — small stores, wholesalers, transporters — and consistently met or exceeded monthly hectoliter targets for beer brands and volume targets for carbonated beverages. He ensured excellent in-store execution (rotation, displays, POS materials), distributed and tracked refrigeration equipment, maintained relationships with key customers at all hours, worked with logistics to resolve delivery issues, and conducted on-site surveys. He was frequently recognized as one of the top salespeople among ~50 executives.",

  intcomex: "At Intcomex, a leading Latin American technology distributor, Nicolas combined Customer Success with sales and technical automation. He managed enterprise accounts — resellers, integrators, and companies buying hardware, software, and cloud solutions. He ensured high post-sale satisfaction, resolved issues efficiently, and identified upselling/cross-selling opportunities. He maintained bilingual communication (Spanish/English) with clients and regional teams. On the technical side, he built custom Python scripts for: automated sales reports, account performance dashboards, and TradingView-integrated market monitoring alerts. This role blended account management, customer success, and real technical automation.",

  projects: "Key projects Nicolas has built:\n\n🌐 Portfolio Website — You're on it! Built from scratch with React 19, TypeScript, Vite 6, Tailwind CSS 4, and Framer Motion. Features particle field background, 3D tilt cards, typewriter hero, glass morphism navbar, animated stats counter, scroll-driven animations, and me — the AI chatbot.\n\n📊 TradingView Multi-Timeframe Session Indicator — Shows session open/close levels across timeframes, used by day traders for timing entries.\n⚡ SOL 15m Momentum Scalper — High-frequency scalping bot for Solana using Python + ccxt on 15-min candles.\n🌊 XRP VWAP EMA Cloud Scalper — Advanced XRP system combining VWAP and EMA cloud strategies with real-time Telegram alerts.\n🤖 AI Chatbot Integration — The assistant you're talking to right now! Offline AI with smart keyword matching.\n⚙️ Enterprise Process Automation — Python pipelines built at Intcomex to streamline wholesale operations and reporting.\n🌐 Bilingual Customer Success System — EN/ES support framework with ticket management and automated follow-ups.\n\nClick the Projects section to see them all with TradingView links!",

  trading: "Nicolas has 6+ years of live trading experience and has built 5+ custom trading bots from scratch. His trading work includes:\n\n📈 TradingView Pine Script — Custom indicators like multi-timeframe session open/close trackers\n🤖 Python Trading Bots — Built with ccxt for crypto exchange connectivity\n📊 Strategies — VWAP, EMA cloud, momentum scalping on SOL, XRP, and other pairs\n📲 Telegram Alerts — Real-time signal notifications integrated into trading systems\n\nHe's also developed TradingView scripts for market monitoring and technical analysis as part of his automation work at Intcomex.",

  hire: "You can hire Nicolas in two ways:\n\n💼 Freelance (Upwork) — $50-800 per project depending on scope:\n  • Python automation scripts: $50-200\n  • AI chatbot development: $150-500\n  • Data analysis & dashboards: $75-300\n  • Trading bot development: $200-800\n  • Bilingual support systems: $100-400\n\n🏢 Full-time — He's open to roles as Data Analyst, Python Developer, AI Specialist, Customer Success Manager, or Account Manager.\n\nAll work is done personally — no outsourcing. Click 'Hire Me on Upwork' in the Contact section!",

  contact: "Here's how to reach Nicolas:\n\n📧 Email: nbustamante.work@gmail.com\n💬 WhatsApp: +59172512525 (click the Chat button in the Contact section!)\n🔗 LinkedIn: linkedin.com/in/nicolas-bustamante-526464184/\n💼 Upwork: upwork.com/freelancers/~015e58af861eafe53c\n🐙 GitHub: github.com/ShrPaw\n\n📍 Based in Cochabamba, Bolivia (GMT-4). Bilingual EN/ES. Currently available for new projects!",

  price: "Pricing depends on project scope:\n\n🐍 Python automation scripts: $50-200\n🤖 AI chatbot development: $150-500\n📊 Data analysis & dashboards: $75-300\n📈 Trading bot development: $200-800\n🌐 Bilingual support systems: $100-400\n\nAll work is done personally by Nicolas — no outsourcing, no middlemen. For custom quotes, reach out at nbustamante.work@gmail.com or WhatsApp +59172512525.",

  python: "Nicolas has been working with Python for 4+ years. His Python work spans:\n\n⚙️ Process Automation — Custom scripts that saved hours of manual work at Intcomex (sales reports, account dashboards)\n📈 Trading Bots — 5+ bots built with ccxt for crypto trading, including VWAP/EMA strategies with Telegram alerts\n📊 Data Pipelines — Automated report generation, data cleaning, performance tracking\n🔗 API Integrations — REST APIs, TradingView webhooks, exchange APIs, AI model APIs (Gemini, OpenAI)\n\nHe's comfortable with libraries like pandas, ccxt, requests, openpyxl, and various LLM SDKs.",

  ai: "Nicolas builds practical AI solutions focused on business applications:\n\n🤖 Chatbots — Portfolio assistant (you're using it!), customer support bots using Gemini API and OpenAI\n🔧 Internal Tools — AI-powered automation for enterprise workflows\n💡 Smart Integrations — AI embedded into existing systems for classification, summarization, and response generation\n\nHe focuses on making AI useful for real business problems — not just demos. His approach: identify the workflow, find where AI adds value, build it, ship it.",

  education: "Nicolas' education is rooted in real-world experience. His foundation came from the Pasaporte BNB program at Banco Nacional de Bolivia — a rigorous 6-month rotational training that exposed him to every major department of a large bank. Combined with his sales experience at AB InBev (one of the world's largest companies) and technical work at Intcomex, plus 6+ years of self-taught trading and Python development, his skill set is built on doing, not just studying.",

  languages: "Nicolas is fully bilingual:\n\n🇧🇴 Spanish — Native speaker (Bolivia)\n🇺🇸 English — Advanced level, used daily in multinational environments (AB InBev, Intcomex) for client communication, technical documentation, and regional team coordination.\n\nHe's comfortable working in both languages for customer success, sales, technical writing, and presentations.",

  portfolio: "This portfolio website was built entirely from scratch by Nicolas! Here's the tech stack:\n\n⚛️ React 19 + TypeScript — Modern component architecture\n⚡ Vite 6 — Lightning-fast builds\n🎨 Tailwind CSS 4 — Utility-first styling\n✨ Framer Motion — Smooth animations (scroll reveals, 3D tilt cards, typewriter)\n🫧 Glass morphism navbar with scroll-aware transparency\n🌌 Interactive particle field (neural mesh background)\n📊 Animated stats counters\n💬 Offline AI chatbot (me!) with keyword-based smart responses\n🖱️ Custom glowing cursor with trail effect\n📱 Fully responsive — mobile, tablet, desktop\n\nThe whole site is a project in itself — clean code, production-ready, deployable to Vite/Vercel/Netlify.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.match(/portfolio|website|this site|built this|tech stack|stack|react|framer/)) return RESPONSES.portfolio;
  if (lower.match(/skill|what.*do|capabil|technolog/)) return RESPONSES.skills;
  if (lower.match(/bnb|banco|bank|pasaporte/)) return RESPONSES.bnb;
  if (lower.match(/ab ?inbev|cbn|cervecer|beer|beverage/)) return RESPONSES.abinbev;
  if (lower.match(/intcomex|distribut|wholesale/)) return RESPONSES.intcomex;
  if (lower.match(/experienc|background|history|career|journey|timeline/)) return RESPONSES.experience;
  if (lower.match(/project|portfolio|built|showcase/)) return RESPONSES.projects;
  if (lower.match(/trad|bot|crypto|scalp|pine|indicator/)) return RESPONSES.trading;
  if (lower.match(/hire|freelance|job|employ|available|work/)) return RESPONSES.hire;
  if (lower.match(/contact|email|reach|location|where|whatsapp/)) return RESPONSES.contact;
  if (lower.match(/price|cost|how much|budget|quote|rate/)) return RESPONSES.price;
  if (lower.match(/python|script|automat|ccxt|pandas/)) return RESPONSES.python;
  if (lower.match(/ai|chatbot|llm|gemini|openai|gpt/)) return RESPONSES.ai;
  if (lower.match(/educat|school|university|degree|study|learn/)) return RESPONSES.education;
  if (lower.match(/language|bilingual|spanish|english/)) return RESPONSES.languages;
  if (lower.match(/hi|hello|hey|sup|greet/)) return RESPONSES.default;
  return "That's a great question! I'd recommend reaching out to Nicolas directly for detailed answers — you can email him at nbustamante.work@gmail.com or WhatsApp: +59172512525. Click 'Hire Me on Upwork' in the Contact section for freelance projects. Is there anything specific about his skills or projects I can help with?";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: RESPONSES.default, isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputValue, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getResponse(inputValue);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: reply, isUser: false }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button onClick={() => setIsOpen(!isOpen)} className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <div className="absolute -inset-1 rounded-full opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-300" style={{ background: "conic-gradient(from 0deg, #00D99F, #1A73E8, #FACC15, #00D99F)", animation: "spin-slow 4s linear infinite" }} />
        <div className="relative w-12 h-12 rounded-full bg-[#00D99F] flex items-center justify-center text-white">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg key="close" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg key="chat" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">Chat with my AI</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl w-[340px] sm:w-[380px] h-[520px] flex flex-col overflow-hidden border border-[#E2E8F0]" initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
            <div className="h-1" style={{ background: "linear-gradient(90deg, #1A73E8, #00D99F, #FACC15, #1A73E8)", backgroundSize: "300% 100%", animation: "gradient-shift 4s ease infinite" }} />
            <div className="bg-[#0F172A] text-white px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center text-xs font-bold">NB</div>
                <div>
                  <h3 className="font-semibold text-sm">Nicolas' AI</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/60">
                    <motion.div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    Online
                  </div>
                </div>
              </div>
              <motion.button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-200" whileTap={{ scale: 0.9 }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-[#F8FAFC] space-y-4">
              {messages.map((msg) => (
                <motion.div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.isUser ? "bg-[#1A73E8] text-white rounded-br-md" : "bg-white text-[#0F172A] rounded-bl-md border border-[#E2E8F0] shadow-sm"}`}>{msg.text}</div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-white text-[#0F172A] px-4 py-3 rounded-2xl rounded-bl-md border border-[#E2E8F0] shadow-sm flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => <motion.span key={i} className="w-2 h-2 bg-[#94A3B8] rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#E2E8F0] bg-white">
              <div className="flex gap-2">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())} placeholder="Ask me anything..." disabled={isTyping} className="flex-1 px-4 py-3 bg-[#F8FAFC] text-[#0F172A] rounded-xl text-sm placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/30 focus:bg-white transition-all duration-200 disabled:opacity-50" />
                <motion.button onClick={sendMessage} disabled={isTyping || !inputValue.trim()} className="bg-[#1A73E8] text-white w-11 h-11 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
