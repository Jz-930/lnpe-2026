"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import ChatContainer from "./ChatContainer";
import { assistantMessages } from "@/i18n/messages/assistant";
import { useVisualViewport } from "./useVisualViewport";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "zh";
  setLang: (lang: "en" | "zh") => void;
}

export default function ChatDrawer({ isOpen, onClose, lang, setLang }: ChatDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && <ChatDrawerDialog key="reference-search" onClose={onClose} lang={lang} setLang={setLang} />}
    </AnimatePresence>
  );
}

function ChatDrawerDialog({ onClose, lang, setLang }: Omit<ChatDrawerProps, "isOpen">) {
  const copy = assistantMessages[lang];
  const dialog = useRef<HTMLDialogElement>(null);
  useVisualViewport(dialog);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const subtitleId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return (
        <motion.dialog
          ref={dialog}
          aria-labelledby={titleId}
          aria-describedby={subtitleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          onCancel={(event) => { event.preventDefault(); onClose(); }}
          className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-lnpe-dark backdrop:bg-transparent"
        >
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
            onClickCapture={(event) => {
              if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
              if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
              if (new URL(anchor.href, window.location.href).origin === window.location.origin) onClose();
            }}
            className="assistant-panel fixed inset-y-3 right-3 z-50 flex w-[calc(100vw-24px)] max-w-[430px] flex-col overflow-hidden border border-lnpe-border bg-lnpe-paper shadow-[0_26px_80px_rgba(17,24,39,0.24)] md:inset-y-6 md:right-6 md:w-full clip-chamfer"
          >
            <div className="assistant-header flex shrink-0 flex-wrap items-start justify-between gap-3 border-b border-lnpe-border bg-lnpe-bg-light px-5 py-4">
              <div className="min-w-0 flex-1 basis-[180px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 bg-lnpe-kinetic" />
                  <h3 id={titleId} className="font-display text-base font-bold uppercase tracking-wide text-lnpe-dark">
                    {copy.name}
                  </h3>
                </div>
                <p id={subtitleId} className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-lnpe-steel">
                  {copy.subtitle}
                </p>
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLang(lang === "en" ? "zh" : "en")}
                  className="border border-lnpe-border bg-lnpe-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-lnpe-blue transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic"
                  title={copy.toggle}
                >
                  {lang === "en" ? "中" : "EN"}
                </button>
                <span className="assistant-access border border-lnpe-border bg-lnpe-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-lnpe-steel">
                  {copy.access}
                </span>
                <button
                  ref={closeButton}
                  type="button"
                  autoFocus
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center border border-lnpe-border bg-lnpe-paper text-lnpe-steel transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic"
                  aria-label={copy.closeDrawer}
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
        </motion.dialog>
  );
}
