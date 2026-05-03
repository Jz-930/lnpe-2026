"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Database, KeyRound, Lock, Network, ShieldCheck, Gauge, ClipboardList } from "lucide-react";
import ChatContainer from "@/components/ai-assistant/ChatContainer";

export default function AssistantPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStage, setAuthStage] = useState(0);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setAuthStage(1);
    setTimeout(() => setAuthStage(2), 800);
    setTimeout(() => setAuthStage(3), 1600);
    setTimeout(() => setIsLoggedIn(true), 2400);
  };

  if (isLoggedIn) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-lnpe-bg text-lnpe-text" data-sys-author="jiackey">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-lnpe-border bg-lnpe-paper md:flex">
          <div className="border-b border-lnpe-border p-6">
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <ShieldCheck size={18} />
              <span className="text-xs font-bold uppercase tracking-[0.12em]">Security Clearance T2</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-lnpe-steel">Node: LNPE Expert Engine</p>
          </div>

          <div className="flex-1 p-5">
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-lnpe-steel">Recent Queries</h4>
            <div className="space-y-2">
              {["磷酸铁产线 EPC 组评估", "高镍三元前驱体烧结损耗", "2025Q2 厂区扩建报价"].map((query, index) => (
                <button
                  key={query}
                  className={`w-full border px-3 py-2 text-left text-xs leading-5 transition-colors ${
                    index === 0
                      ? "border-lnpe-kinetic bg-lnpe-kinetic/10 text-lnpe-dark"
                      : "border-lnpe-border bg-lnpe-bg-light text-lnpe-muted hover:border-lnpe-blue hover:text-lnpe-dark"
                  }`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-lnpe-bg">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-lnpe-border bg-lnpe-paper px-5 md:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-lnpe-steel">Internal assistant portal</p>
              <h1 className="font-display text-lg font-bold uppercase tracking-wide text-lnpe-dark">LNPE Engineering Workbench</h1>
            </div>
            <div className="hidden items-center gap-2 border border-lnpe-border bg-lnpe-bg-light px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-blue sm:flex">
              <Network size={14} />
              Live sync
            </div>
          </header>

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[1fr_280px] lg:p-6">
            <section className="min-h-0 overflow-hidden border border-lnpe-border bg-lnpe-paper shadow-[0_18px_48px_rgba(17,24,39,0.08)] clip-chamfer">
              <ChatContainer isInternalMode={true} />
            </section>

            <aside className="hidden border border-lnpe-border bg-lnpe-paper p-5 lg:block clip-chamfer">
              <h4 className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-lnpe-steel">
                <Gauge size={14} />
                System Status
              </h4>

              <div className="space-y-5">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span className="text-lnpe-muted">P12 DB connection</span>
                    <span className="text-emerald-700">98ms</span>
                  </div>
                  <div className="h-1.5 overflow-hidden bg-lnpe-bg-light">
                    <div className="h-full w-full bg-emerald-600" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs font-semibold">
                    <span className="text-lnpe-muted">Auth Token TTL</span>
                    <span className="text-lnpe-kinetic">11:45</span>
                  </div>
                  <div className="h-1.5 overflow-hidden bg-lnpe-bg-light">
                    <div className="h-full w-[40%] bg-lnpe-kinetic" />
                  </div>
                </div>

                <div className="mt-6 border-t border-lnpe-border pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Reference Modules</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-lnpe-border bg-lnpe-bg-light p-3 text-center">
                      <Database className="mx-auto mb-2 h-4 w-4 text-lnpe-blue" />
                      <p className="font-mono text-xs text-lnpe-dark">1.2 TB</p>
                    </div>
                    <div className="border border-lnpe-border bg-lnpe-bg-light p-3 text-center">
                      <ClipboardList className="mx-auto mb-2 h-4 w-4 text-lnpe-blue" />
                      <p className="font-mono text-xs text-lnpe-dark">4 Nodes</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-lnpe-bg px-6 py-10 text-lnpe-text" data-sys-author="jiackey">
      <div className="absolute inset-0 bg-technical-grid opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 border border-lnpe-border bg-lnpe-paper shadow-[0_24px_80px_rgba(17,24,39,0.12)] lg:grid-cols-[0.9fr_1.1fr] clip-chamfer"
      >
        <section className="border-b border-lnpe-border bg-lnpe-bg-light p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-8 flex h-12 w-12 items-center justify-center border border-lnpe-border bg-lnpe-paper text-lnpe-blue">
            <KeyRound size={24} />
          </div>
          <p className="spec-label mb-4">INTERNAL ACCESS</p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-lnpe-dark">
            LNPE engineering assistant portal.
          </h1>
          <p className="mt-5 text-sm leading-7 text-lnpe-muted">
            Authorized staff can access internal equipment references, project costing and stored material consultation
            flows from a brighter workbench that matches the public website.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3">
            {["T2 clearance verification", "Project database context", "Material / process / capacity prompts"].map((item) => (
              <div key={item} className="border-l-2 border-lnpe-kinetic bg-lnpe-paper px-4 py-3 text-sm font-semibold text-lnpe-dark">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-lnpe-dark">Authenticate</h2>
            <p className="mt-2 text-sm text-lnpe-muted">Enter clearance credentials to access the internal expert system.</p>
          </div>

          <form onSubmit={handleLogin} className="relative space-y-5">
            <AnimatePresence>
              {authStage > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center border border-lnpe-border bg-lnpe-paper/95 backdrop-blur-sm"
                >
                  <div className="space-y-4 text-center">
                    <Lock className={`mx-auto h-8 w-8 ${authStage >= 3 ? "text-emerald-600" : "text-lnpe-blue animate-pulse"}`} />
                    <div className="text-xs font-bold uppercase tracking-[0.14em]">
                      {authStage === 1 && <span className="text-lnpe-blue">Verifying Credentials...</span>}
                      {authStage === 2 && <span className="text-lnpe-blue">Establishing Secure Connection...</span>}
                      {authStage === 3 && <span className="text-emerald-700">Access Granted</span>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Clearance ID</span>
              <input
                type="text"
                required
                placeholder="LNPE-ID"
                className="h-12 w-full border border-lnpe-border bg-lnpe-bg-light px-4 text-sm text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Passcode</span>
              <input
                type="password"
                required
                placeholder="Passcode"
                className="h-12 w-full border border-lnpe-border bg-lnpe-bg-light px-4 text-sm tracking-widest text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-between bg-lnpe-dark px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-lnpe-paper transition-colors hover:bg-lnpe-kinetic clip-chamfer"
            >
              <span>Authenticate</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-lnpe-steel">
            Unauthorized access is strictly monitored
          </p>
        </section>
      </motion.div>
    </div>
  );
}
