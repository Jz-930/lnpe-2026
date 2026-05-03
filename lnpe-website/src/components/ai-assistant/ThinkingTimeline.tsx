"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Database, BrainCircuit, Search } from "lucide-react";

interface ThinkingTimelineProps {
  onComplete: () => void;
  lang?: "en" | "zh";
}

export default function ThinkingTimeline({ onComplete, lang = "en" }: ThinkingTimelineProps) {
  const [step, setStep] = useState(0);

  const steps = lang === "en" ? [
    { text: "Parsing semantics & extracting keywords", icon: <Search className="h-3.5 w-3.5 text-lnpe-steel" /> },
    { text: "Matched standard library: Lithium Iron Phosphate (LFP)", icon: <BrainCircuit className="h-3.5 w-3.5 text-lnpe-blue" /> },
    { text: "Connecting to internal specs & image DB", icon: <Database className="h-3.5 w-3.5 text-lnpe-blue" /> },
    { text: "Extracted [Project DB_P12] core data", icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> },
    { text: "AI formatting and security screening", icon: <Loader2 className="h-3.5 w-3.5 animate-spin text-lnpe-kinetic" /> },
  ] : [
    { text: "解析语义与提炼工业术语", icon: <Search className="h-3.5 w-3.5 text-lnpe-steel" /> },
    { text: "匹配至标准字典库: 磷酸铁锂 (LFP)", icon: <BrainCircuit className="h-3.5 w-3.5 text-lnpe-blue" /> },
    { text: "链接内部技术大表与图库", icon: <Database className="h-3.5 w-3.5 text-lnpe-blue" /> },
    { text: "提取 [项目库_P12] 核心数据", icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> },
    { text: "AI 统合排版与安全过滤", icon: <Loader2 className="h-3.5 w-3.5 animate-spin text-lnpe-kinetic" /> },
  ];

  useEffect(() => {
    if (step < steps.length) {
      const ms = step === 0 ? 500 : step === 1 ? 600 : step === 2 ? 800 : step === 3 ? 500 : 700;
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, ms);
      return () => clearTimeout(timer);
    }

    const finalTimer = setTimeout(() => {
      onComplete();
    }, 500);
    return () => clearTimeout(finalTimer);
  }, [step, onComplete, steps.length]);

  return (
    <div className="my-2 flex max-w-[92%] flex-col gap-2 border-l-2 border-lnpe-kinetic bg-lnpe-paper px-3 py-3 shadow-sm">
      <AnimatePresence>
        {steps.map((item, index) => {
          if (index > step) return null;
          const isCurrent = index === step;
          const isDone = index < step;

          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : item.icon}
              </div>
              <span
                className={`text-xs font-medium tracking-tight ${
                  isCurrent ? "text-lnpe-dark" : "text-lnpe-steel line-through decoration-lnpe-border"
                }`}
              >
                {item.text}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
