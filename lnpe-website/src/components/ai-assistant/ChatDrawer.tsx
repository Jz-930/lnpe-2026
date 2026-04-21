"use client";

import { motion, AnimatePresence } from "framer-motion";
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
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            data-signature="jiackey-ai-module"
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[420px] bg-[#111111]/90 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse shadow-[0_0_8px_#3b82f6]" />
                <h3 className="text-white font-medium tracking-wide">
                  {lang === 'en' ? 'LNPE Smart Engineer' : 'LNPE 智能工程师'}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                  className="text-[10px] font-mono tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 px-2 py-0.5 rounded bg-black/50"
                  title="Toggle Language"
                >
                  {lang === 'en' ? '中' : 'EN'}
                </button>
                <span className="text-[10px] uppercase tracking-widest text-[#3b82f6]/70 border border-[#3b82f6]/30 px-2 py-0.5 rounded-full bg-[#3b82f6]/10">T1 Access</span>
              </div>
            </div>

            {/* Main Chat Container Area */}
            <div className="flex-1 overflow-hidden flex flex-col relative">
                {/* Decorative background gradients */}
                <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#3b82f6]/5 to-transparent pointer-events-none" />
                
                {/* Embedded component contains its own scrolling logic */}
                <ChatContainer isInternalMode={false} lang={lang} />
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
