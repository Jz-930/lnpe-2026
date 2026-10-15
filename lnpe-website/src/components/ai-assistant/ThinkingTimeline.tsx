"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Database, BrainCircuit, Search } from "lucide-react";
import { assistantMessages } from '@/i18n/messages/assistant';

interface ThinkingTimelineProps {
  onComplete: () => void;
  lang?: "en" | "zh";
}

export default function ThinkingTimeline({ onComplete, lang = "en" }: ThinkingTimelineProps) {
  const [step, setStep] = useState(0);

  const icons = [
    <Search key="search" className="h-3.5 w-3.5 text-lnpe-steel" />,
    <BrainCircuit key="match" className="h-3.5 w-3.5 text-lnpe-blue" />,
    <Database key="database" className="h-3.5 w-3.5 text-lnpe-blue" />,
    <CheckCircle2 key="data" className="h-3.5 w-3.5 text-emerald-600" />,
    <Loader2 key="format" className="h-3.5 w-3.5 animate-spin text-lnpe-kinetic" />,
  ];
  const steps = assistantMessages[lang].steps.map((text, index) => ({ text, icon: icons[index] }));

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
