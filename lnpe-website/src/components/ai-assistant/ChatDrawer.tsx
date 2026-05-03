"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChatContainer from "./ChatContainer";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "zh";
  setLang: (lang: "en" | "zh") => void;
}

export default function ChatDrawer({ isOpen, onClose, lang, setLang }: ChatDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-lnpe-dark/20 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 210 }}
            data-signature="jiackey-ai-module"
            className="fixed inset-y-3 right-3 z-50 flex w-[calc(100vw-24px)] max-w-[430px] flex-col overflow-hidden border border-lnpe-border bg-lnpe-paper shadow-[0_26px_80px_rgba(17,24,39,0.24)] md:inset-y-6 md:right-6 md:w-full clip-chamfer"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-lnpe-border bg-lnpe-bg-light px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-lnpe-kinetic" />
                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-lnpe-dark">
                    {lang === "en" ? "LNPE Smart Engineer" : "LNPE 智能工程师"}
                  </h3>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-lnpe-steel">
                  {lang === "en" ? "Powder process consultation" : "粉体工艺咨询"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang(lang === "en" ? "zh" : "en")}
                  className="border border-lnpe-border bg-lnpe-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-lnpe-blue transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic"
                  title="Toggle Language"
                >
                  {lang === "en" ? "中" : "EN"}
                </button>
                <span className="border border-lnpe-border bg-lnpe-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-lnpe-steel">
                  T1 Access
                </span>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center border border-lnpe-border bg-lnpe-paper text-lnpe-steel transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic"
                  aria-label="Close assistant"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-lnpe-bg">
              <div className="absolute inset-0 bg-technical-grid opacity-45" />
              <ChatContainer isInternalMode={false} lang={lang} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
