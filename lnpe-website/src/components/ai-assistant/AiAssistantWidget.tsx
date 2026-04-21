"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
    setShowTooltip(false); // Hide tooltip if opened
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        
        {/* Tooltip / Hook message */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-black/80 backdrop-blur-md border border-[#3b82f6]/30 text-white p-4 rounded-2xl shadow-2xl pointer-events-auto max-w-[280px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex gap-3 items-start">
                <div className="mt-1 shrink-0">
                  <img src="/images/00_brand/favicon_01.ico" alt="AI Icon" className="w-[18px] h-[18px]" />
                </div>
                <div className="text-sm font-light leading-relaxed">
                  <span className="font-semibold text-white block mb-1 tracking-wide uppercase">Get a Quote</span>
                  {lang === 'en' ? (
                    <>Curious about the efficiency of this powder line?<br/>I am <strong className="text-white font-medium">LNPE Smart Engineer</strong>, ready to assist you.</>
                  ) : (
                    <>想知道这套产线有多高效？<br/>我是 <strong className="text-white font-medium">LNPE 智能工程师</strong>，随时为您解答。</>
                  )}
                </div>
                <button 
                  onClick={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (Energy Core) */}
        <motion.button
          onClick={toggleOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group w-14 h-14 bg-gradient-to-tr from-[#1e1e1e] to-[#2a2a2a] border border-white/10 rounded-full flex items-center justify-center shadow-lg pointer-events-auto overflow-hidden"
        >
          {/* Animated Glow layer */}
          <div className="absolute inset-0 bg-[#3b82f6]/20 blur-xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-pulse" />
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="chat-icon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                className="relative z-10 flex items-center justify-center w-6 h-6"
              >
                 <img src="/images/00_brand/favicon_01.ico" alt="AI Icon" className="w-[22px] h-[22px] animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                className="relative z-10 text-gray-300"
              >
                <X className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Drawer Overlay Component */}
      <ChatDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} lang={lang} setLang={setLang} />
    </>
  );
}
