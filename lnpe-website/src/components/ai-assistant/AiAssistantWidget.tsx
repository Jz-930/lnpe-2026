"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import ChatDrawer from "./ChatDrawer";

export default function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [lang, setLang] = useState<"en" | "zh">("en");

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (!isOpen) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 200);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 18, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 18, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="pointer-events-auto max-w-[300px] border border-lnpe-border bg-lnpe-paper p-4 text-lnpe-text shadow-[0_18px_45px_rgba(17,24,39,0.14)] clip-chamfer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex gap-3">
                <div className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-lnpe-border bg-lnpe-bg-light">
                  <Image src="/images/00_brand/favicon_01.ico" alt="LNPE assistant" width={18} height={18} />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-lnpe-kinetic" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-lnpe-blue">Engineering inquiry</p>
                  <p className="mt-2 text-sm leading-6 text-lnpe-muted">
                    {lang === "en"
                      ? "LNPE Smart Engineer can help with material, capacity and equipment selection questions."
                      : "LNPE 智能工程师可协助梳理物料、产能和设备选型问题。"}
                  </p>
                </div>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="h-7 w-7 shrink-0 text-lnpe-steel transition-colors hover:text-lnpe-kinetic"
                  aria-label="Close assistant tip"
                >
                  <X size={15} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="pointer-events-auto relative flex h-14 w-14 items-center justify-center border border-lnpe-border bg-lnpe-paper text-lnpe-blue shadow-[0_16px_38px_rgba(17,24,39,0.18)] transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic clip-chamfer"
          aria-label={isOpen ? "Close LNPE assistant" : "Open LNPE assistant"}
        >
          <span className="absolute right-2 top-2 h-2.5 w-2.5 bg-lnpe-kinetic" />
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="chat-icon"
                initial={{ opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 40 }}
              >
                <MessageCircle className="h-6 w-6" strokeWidth={1.9} />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 40 }}
              >
                <X className="h-6 w-6" strokeWidth={1.9} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <ChatDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} lang={lang} setLang={setLang} />
    </>
  );
}
