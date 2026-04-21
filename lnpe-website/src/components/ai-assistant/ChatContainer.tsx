"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, AlertTriangle, Lock } from "lucide-react";
import ThinkingTimeline from "./ThinkingTimeline";
import ImageGallery from "./ImageGallery";

interface Message {
  id: string;
  role: "user" | "ai";
  content?: React.ReactNode;
  isThinking?: boolean;
}

const DEMO_PICS = [
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", tag: "📷 核心反应釜" },
  { url: "https://images.unsplash.com/photo-1541888087405-ebad05f9c44e?auto=format&fit=crop&q=80&w=800", tag: "🏢 实验基地" },
  { url: "https://images.unsplash.com/photo-1629813351980-fc0218ab28c4?auto=format&fit=crop&q=80&w=800", tag: "🧪 成品粉带" }
];

export default function ChatContainer({ isInternalMode = false, lang = 'en' }: { isInternalMode?: boolean; lang?: "en" | "zh" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [turn, setTurn] = useState<number>(0);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const initZh = ["有没有做过类似磷酸铁的项目？", "超微粉碎机型对比展示", "有没有最新设备运行视频？"];
  const initEn = ["Any projects similar to Iron Phosphate?", "Ultrafine mill comparison", "Show recent machinery videos"];
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  
  const activeSuggestions = suggestions !== null ? suggestions : (lang === 'en' ? initEn : initZh);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (overrideText?: string) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : inputValue;
    if (!textToSend.trim() || isInputDisabled) return;
    
    // Add user message
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (typeof overrideText !== 'string') setInputValue("");
    setIsInputDisabled(true);
    setSuggestions([]); // Clear suggestions when sending

    // Turn 1 logic: Ask about LFP
    if (turn === 0 || textToSend.includes("磷酸铁") || textToSend.toLowerCase().includes("iron phosphate")) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "ai", isThinking: true }]);
      }, 500);
    } 
    // Turn 2 logic: Ask about price/cost
    else if (turn === 1 || textToSend.includes("价格") || textToSend.includes("成本") || textToSend.toLowerCase().includes("price") || textToSend.toLowerCase().includes("cost")) {
      setTimeout(() => {
        handleTurn2Response();
      }, 800);
    } else {
       // Generic fallback
       setTimeout(() => {
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "ai", content: lang === 'en' ? "As a demo version, I only have pre-loaded knowledge flows related to 'Iron Phosphate' and 'Pricing'. You can try asking about these topics 😊" : "作为一个演示版本，我目前只准备了关于“磷酸铁”和“项目成本”相关的预拌知识流。您可以尝试询问这些话题 😊" }]);
        setIsInputDisabled(false);
      }, 1000);
    }
  };

  const handleThinkingComplete = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m, 
          isThinking: false,
          content: (
            <div className="space-y-4">
              <p className="text-sm text-gray-200 leading-relaxed">
                {lang === 'en' ? (
                  <>LNPE has extensive experience in the frontend preparation of <strong className="text-white font-medium">Lithium Iron Phosphate (LFP)</strong>. According to our P12 database, we consistently stabilize the D50 particle size of LFP finished products at around <strong className="text-[#3b82f6] font-bold text-base">66.8 μm</strong>, setting an industry-leading standard.</>
                ) : (
                  <>LNPE 在<strong className="text-white font-medium">磷酸铁锂 (LFP)</strong>前端配套领域拥有大量的成熟经验。根据内部 P12 数据库交叉比对，我们在该类产线中，将磷酸铁成品平均粒径（D50）稳定控制在 <strong className="text-[#3b82f6] font-bold text-base">66.8 μm</strong> 左右，处于行业顶尖标准。</>
                )}
              </p>
              <p className="text-sm text-gray-400">{lang === 'en' ? "Here are the matched machinery and plant records from our system:" : "以下是系统匹配的相关关键设备和车间存档录像/照片资料："}</p>
              <ImageGallery images={DEMO_PICS} />
            </div>
          )
        };
      }
      return m;
    }));
    setTurn(1);
    setIsInputDisabled(false);
    setSuggestions(lang === 'en' ? [
      "Can I see more detailed pricing data?",
      "What is the footprint of this line?",
      "What is the energy consumption?"
    ] : [
      "能看看更具体的价格数据吗？",
      "这套设备的场地面积要求是多少？",
      "该粒径下的能耗水平如何？"
    ]);
  };

  const handleTurn2Response = () => {
    if (!isInternalMode) {
      // T1 Restricted mode
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: "ai", 
        content: (
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex items-start gap-3">
             <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
             <div>
                <p className="text-amber-200 font-medium text-sm mb-1">{lang === 'en' ? "Permission Threshold" : "权限限制"}</p>
                <p className="text-xs text-amber-500/80 leading-relaxed">
                  {lang === 'en' ? (
                    <>You are currently logged in as a Visitor (T1). This query involves proprietary internal pricing data. For in-depth discussions or project budgets, please <a href="/portal/assistant" className="underline text-white/90">use an internal authorization code to log in</a>.</>
                  ) : (
                    <>您目前以访客 (T1) 身份登录。该查询标的含有企业内部机密机组定价数据。如需深度交流或项目预算报备，请 <a href="/portal/assistant" className="underline text-white/90">使用内部授权码登录</a>。</>
                  )}
                </p>
             </div>
          </div>
        )
      }]);
      setTurn(2);
      setIsInputDisabled(false);
      setSuggestions([]);
    } else {
      // T2 Internal mode
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: "ai", 
        content: (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
               <Lock className="text-emerald-400" size={14} />
               <span className="text-emerald-400 text-xs font-mono uppercase">T2 Internal Clearance Verified</span>
            </div>
            <p className="text-sm text-gray-200">{lang === 'en' ? "Accessing internal cost database, breakdown as follows:" : "正在调取内部成本库，具体分项如下："}</p>
            <div className="bg-[#111] p-3 rounded-md border border-white/10 font-mono text-xs text-gray-400">
               <div className="flex justify-between py-1 border-b border-white/5"><span className="text-blue-300">{lang === 'en' ? "#Equipment Sizing" : "#设备定型"}</span><span>￥2.4M</span></div>
               <div className="flex justify-between py-1 border-b border-white/5"><span className="text-blue-300">{lang === 'en' ? "#Labor & Site Dist" : "#人工与场地分摊"}</span><span>￥0.8M</span></div>
               <div className="flex justify-between py-1 border-b border-white/5"><span className="text-blue-300">{lang === 'en' ? "#Material Float Rate" : "#基建材料浮动率"}</span><span>+4.2%</span></div>
               <div className="flex justify-between pt-2 mt-1"><strong className="text-white">{lang === 'en' ? "Est. Total Reference" : "预估总价参考"}</strong><strong className="text-emerald-400">￥3.28M</strong></div>
            </div>
            <p className="text-xs text-gray-500 italic mt-2">{lang === 'en' ? "* This data is for internal reference only. Please add at least 25% for external tax-inclusive quotes." : "* 该数据仅适用于内部参考，对客含税报价请上浮至少25%"}</p>
          </div>
        )
      }]);
      setTurn(2);
      setIsInputDisabled(false);
      setSuggestions([]);
    }
  };

  const handleMockMic = () => {
    setInputValue(lang === 'en' ? "Any projects similar to Iron Phosphate?" : "你们有没有做过类似磷酸铁的项目？");
  };

  return (
    <div className="flex flex-col h-full bg-transparent" data-sys-auth="jiackey-core-engine">
      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 custom-scrollbar relative z-10">
        
        {messages.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center text-center opacity-50 mt-10">
              <img src="/images/00_brand/favicon_01.ico" alt="AI Icon" className="w-8 h-8 mb-4 opacity-50" />
              <p className="text-sm text-gray-400 max-w-[200px]">{lang === 'en' ? "Welcome to the LNPE Expert Engine. Ask technical questions or request demo flows." : "欢迎查询行业专家库数据。您可以随时语音或文字提问。"}</p>
           </div>
        )}

        <div className="flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "user" ? (
                  <div className="bg-[#3b82f6]/20 border border-[#3b82f6]/40 text-blue-50 px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm font-light">
                    {msg.content}
                  </div>
                ) : (
                  <div className="w-full max-w-[92%]">
                    {/* Minimalist AI Bubble */}
                    <div className="text-gray-300 flex flex-col">
                      {msg.isThinking ? (
                        <ThinkingTimeline lang={lang} onComplete={() => handleThinkingComplete(msg.id)} />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-1 pb-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-t from-[#111111] to-transparent sticky bottom-0 z-20 flex flex-col gap-3">
        {/* Suggestion Buttons */}
        <AnimatePresence>
          {activeSuggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-wrap gap-2 pb-1 bg-black/40 p-3 rounded-2xl border border-white/5 backdrop-blur-md"
            >
              <div className="w-full text-[11px] text-[#3b82f6] font-medium tracking-wide flex items-center gap-1.5 animate-pulse mb-1">
                 <img src="/images/00_brand/favicon_01.ico" alt="AI Icon" className="w-3 h-3 grayscale contrast-150 brightness-150" /> 
                 {turn === 0 ? (lang === 'en' ? "👉 Try clicking these examples:" : "👉 点击下方标签，体验全自动演示：") : (lang === 'en' ? "👉 You can explore further:" : "👉 您可以继续深度追问：")}
              </div>
              {activeSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#3b82f6] hover:text-blue-200 text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative group">
          {/* Glowing border effect on focus-within */}
          <div className="absolute inset-0 bg-[#3b82f6]/20 group-focus-within:bg-[#3b82f6]/40 blur-md rounded-2xl transition-colors duration-500" />
          
          <div className="relative bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 group-focus-within:border-[#3b82f6]/50 rounded-2xl p-1 flex items-end shadow-2xl transition-all duration-300">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={lang === 'en' ? "Ask about technical specs, case studies..." : "询问技术参数、类似案列或组件型号..."}
              className="w-full bg-transparent text-sm text-gray-200 placeholder-gray-600 px-4 py-3 min-h-[44px] max-h-[120px] resize-none outline-none font-light leading-relaxed disabled:opacity-50"
              rows={1}
              disabled={isInputDisabled}
            />
            <div className="flex items-center gap-1 p-1 shrink-0">
              <button 
                onClick={handleMockMic}
                disabled={isInputDisabled}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-colors disabled:opacity-50"
                title="Mock Voice Input"
              >
                <Mic size={18} />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={isInputDisabled || !inputValue.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#3b82f6]/20 text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all disabled:opacity-30 disabled:bg-white/5 disabled:text-gray-500"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 relative">
          <span className="text-[10px] text-gray-600 font-medium tracking-wide">LNPE EXPERT ENGINE • PROPRIETARY DATA</span>
          <span className="sr-only" aria-hidden="true">Designed by jiackey</span>
        </div>
      </div>
    </div>
  );
}
