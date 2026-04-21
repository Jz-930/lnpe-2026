"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Database, BrainCircuit, Search } from "lucide-react";

interface ThinkingTimelineProps {
  onComplete: () => void;
  lang?: "en" | "zh";
}

export default function ThinkingTimeline({ onComplete, lang = 'en' }: ThinkingTimelineProps) {
  const [step, setStep] = useState(0);

  const steps = lang === 'en' ? [
    { text: "Parsing semantics & extracting keywords", icon: <Search className="w-3.5 h-3.5 text-gray-400" /> },
    { text: "Matched standard library: Lithium Iron Phosphate (LFP)", icon: <BrainCircuit className="w-3.5 h-3.5 text-blue-400" /> },
    { text: "Connecting to internal specs & image DB", icon: <Database className="w-3.5 h-3.5 text-purple-400" /> },
    { text: "Extracted [Project DB_P12] core data", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
    { text: "AI formatting and security screening", icon: <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" /> }
  ] : [
    { text: "解析语义与提炼工业术语", icon: <Search className="w-3.5 h-3.5 text-gray-400" /> },
    { text: "匹配至标准字典库: 磷酸铁锂 (LFP)", icon: <BrainCircuit className="w-3.5 h-3.5 text-blue-400" /> },
    { text: "链接内部技术大表与图库", icon: <Database className="w-3.5 h-3.5 text-purple-400" /> },
    { text: "提取 [项目库_P12] 核心数据", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
    { text: "AI 统合排版与安全过滤", icon: <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" /> }
  ];

  useEffect(() => {
    // Reveal steps one by one to mock "thinking"
    if (step < steps.length) {
      const ms = step === 0 ? 500 : step === 1 ? 600 : step === 2 ? 800 : step === 3 ? 500 : 700;
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, ms);
      return () => clearTimeout(timer);
    } else {
      // Finished
      const finalTimer = setTimeout(() => {
         onComplete();
      }, 500);
      return () => clearTimeout(finalTimer);
    }
  }, [step, onComplete, steps.length]);

  return (
    <div className="flex flex-col gap-2 my-2 py-2 px-3 border-l-2 border-[#3b82f6]/30 bg-[#3b82f6]/5 rounded-r-lg max-w-[90%]">
      <AnimatePresence>
        {steps.map((s, idx) => {
          if (idx > step) return null;
          const isCurrent = idx === step;
          const isDone = idx < step;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                   <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                   s.icon
                )}
              </div>
              <span className={`text-xs font-mono tracking-tight ${isCurrent ? 'text-white' : 'text-gray-500 line-through decoration-gray-700/50'}`}>
                {s.text}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
