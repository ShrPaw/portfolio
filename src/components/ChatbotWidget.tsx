import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message { id: string; text: string; isUser: boolean; }

// Offline chatbot with pre-built responses — works without API key
const RESPONSES: Record<string, string> = {
  default: "Hi! I'm Nicolas' AI assistant. Ask me about his skills, projects, experience, or how he can help with Python automations, trading scripts, or AI prototypes.",
  skills: "Nicolas is strongest in: Python automation, AI chatbot development (Gemini/OpenAI), TradingView Pine Script indicators, trading bot development (Python + ccxt), data analysis & dashboards, and bilingual (EN/ES) customer support systems. He has 4+ years combining corporate process knowledge with technical skills.",
  experience: "Nicolas started at Banco Nacional de Bolivia (2019, Pasaporte BNB program), then worked at AB InBev as a Sales Executive (2020-22), Tigo Bolivia in corporate accounts (2022), and Intcomex Bolivia as Key Account Manager handling ~2M BOB/month (2022-25). Now he's full-time on AI development and Python automation via Upwork.",
  projects: "Key projects include: (1) TradingView multi-timeframe session indicator, (2) SOL 15m momentum scalper bot, (3) XRP VWAP EMA cloud scalper with Telegram alerts, (4) Enterprise automation pipelines for Intcomex, (5) AI chatbot portfolio integration. Check the Projects section for details!",
  trading: "Nicolas has 6+ years of live trading experience and has built 5+ custom trading bots from scratch. He specializes in Pine Script indicators for TradingView, Python-based scalping bots using ccxt, and VWAP/EMA strategies with real-time Telegram alerts.",
  hire: "You can hire Nicolas through Upwork for freelance projects ($50-800 per project depending on scope), or contact him directly for full-time opportunities. He's open to Data Analyst, Python Developer, AI Specialist, and Software Developer roles. Click 'Hire Me on Upwork' in the Contact section!",
  contact: "You can reach Nicolas at: nicolas.bustamante@example.com. He's based in Cochabamba, Bolivia (GMT-4) and works with US clients. He's currently available for new projects — check the Contact section for more details!",
  price: "Pricing varies by project: Python automation scripts ($50-200), AI chatbot development ($150-500), data analysis & dashboards ($75-300), trading bot development ($200-800), bilingual support systems ($100-400). All work is done personally — no outsourcing!",
  python: "Nicolas has been working with Python for 4+ years, building automations, data pipelines, trading bots, API integrations, and AI prototypes. He's comfortable with libraries like pandas, ccxt, requests, and various LLM APIs.",
  ai: "Nicolas builds AI chatbots using Gemini API and OpenAI. He's integrated AI into portfolio sites, customer support systems, and internal tools. He focuses on practical business applications of AI rather than research.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.match(/skill|what.*do|capabil|technolog/)) return RESPONSES.skills;
  if (lower.match(/experienc|background|history|career|work/)) return RESPONSES.experience;
  if (lower.match(/project|portfolio|built|showcase/)) return RESPONSES.projects;
  if (lower.match(/trad|bot|crypto|scalp|pine|indicator/)) return RESPONSES.trading;
  if (lower.match(/hire|freelance|job|employ|available|price|cost|rate/)) return RESPONSES.hire;
  if (lower.match(/contact|email|reach|location|where/)) return RESPONSES.contact;
  if (lower.match(/price|cost|how much|budget|quote/)) return RESPONSES.price;
  if (lower.match(/python|script|automat/)) return RESPONSES.python;
  if (lower.match(/ai|chatbot|llm|gemini|openai|gpt/)) return RESPONSES.ai;
  if (lower.match(/hi|hello|hey|sup|greet/)) return RESPONSES.default;
  return "That's a great question! I'd recommend reaching out to Nicolas directly for detailed answers — you can email him at nicolas.bustamante@example.com or click 'Hire Me on Upwork' in the Contact section. Is there anything specific about his skills or projects I can help with?";
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
