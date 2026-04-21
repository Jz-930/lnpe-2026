"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Fingerprint, Network, Terminal, Database, ShieldCheck } from "lucide-react";
import ChatContainer from "@/components/ai-assistant/ChatContainer";

export default function AssistantPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authStage, setAuthStage] = useState(0); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake login sequence
    setAuthStage(1);
    setTimeout(() => setAuthStage(2), 800);
    setTimeout(() => setAuthStage(3), 1600);
    setTimeout(() => setIsLoggedIn(true), 2400);
  };

  if (isLoggedIn) {
    return (
      <div className="flex h-screen w-full bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden" data-sys-author="jiackey">
        {/* Left Sidebar - History & Nodes */}
        <div className="w-64 border-r border-white/5 bg-[#111] flex flex-col pt-6 z-10">
           <div className="px-6 pb-6 border-b border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                 <ShieldCheck size={18} />
                 <span className="font-mono text-sm tracking-tight">SECURITY CLEARANCE T2</span>
              </div>
              <p className="text-xs text-gray-500 font-mono tracking-tighter">NODE: CN-EAST-DATACENTER</p>
           </div>
           
           <div className="p-4 flex-1">
              <h4 className="text-[10px] text-gray-600 font-mono uppercase mb-3">Recent Queries</h4>
              <div className="space-y-2">
                 <div className="px-3 py-2 bg-white/5 rounded-md text-xs border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    磷酸铁产线 C 组评估
                 </div>
                 <div className="px-3 py-2 text-gray-500 text-xs cursor-pointer hover:text-gray-300 transition-colors">
                    高镍三元前驱体烧结损耗
                 </div>
                 <div className="px-3 py-2 text-gray-500 text-xs cursor-pointer hover:text-gray-300 transition-colors">
                    2025Q2 厂区扩建报价
                 </div>
              </div>
           </div>
        </div>

        {/* Center - Main Chat */}
        <div className="flex-1 flex flex-col relative max-w-3xl mx-auto border-x border-white/5 bg-black/40 shadow-2xl">
          <div className="h-14 border-b border-white/5 flex items-center justify-center shrink-0 bg-[#0a0a0a]">
             <span className="font-mono text-xs text-gray-500 tracking-widest">LNPE CORE ASSISTANT TERMINAL v2.4.1</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatContainer isInternalMode={true} />
          </div>
        </div>

        {/* Right Sidebar - Data Readouts mock */}
        <div className="hidden lg:flex w-72 flex-col border-l border-white/5 bg-[#111] p-6 z-10">
            <h4 className="flex items-center gap-2 text-[10px] text-gray-600 font-mono uppercase mb-6"><Network size={14}/> Live Sync Status</h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono"><span className="text-gray-400">P12 DB connection</span><span className="text-emerald-400">98ms</span></div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-emerald-500/50 w-full" /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono"><span className="text-gray-400">Auth Token TTL</span><span className="text-amber-400">11:45</span></div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-amber-500/50 w-[40%]" /></div>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                 <p className="text-xs text-gray-500 font-mono mb-2">Memory Allocation</p>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black/50 border border-white/5 p-3 rounded text-center">
                       <Database className="w-4 h-4 mx-auto text-blue-400 mb-1 opacity-50" />
                       <p className="text-xs font-mono text-gray-300">1.2 TB</p>
                    </div>
                    <div className="bg-black/50 border border-white/5 p-3 rounded text-center">
                       <Terminal className="w-4 h-4 mx-auto text-purple-400 mb-1 opacity-50" />
                       <p className="text-xs font-mono text-gray-300">4 Nodes</p>
                    </div>
                 </div>
              </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-mono selection:bg-[#3b82f6]/30" data-sys-author="jiackey">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden">
           {/* Top Decorative Glow */}
           <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-50" />
           
           <div className="mb-10 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative group">
                <div className="absolute inset-0 bg-[#3b82f6]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Fingerprint className="w-8 h-8 text-gray-400 group-hover:text-[#3b82f6] transition-colors" />
              </div>
              <h1 className="text-xl text-white tracking-widest font-light mb-2 uppercase">Core System Auth</h1>
              <p className="text-xs text-gray-500 tracking-tighter">Enter clearance credentials to access internal expert system.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6 relative">
              <AnimatePresence>
                {authStage > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl"
                  >
                    <div className="space-y-4 text-center">
                      <Lock className={`w-8 h-8 mx-auto ${authStage >= 3 ? 'text-emerald-400' : 'text-[#3b82f6] animate-pulse'}`} />
                      <div className="text-xs tracking-widest uppercase">
                        {authStage === 1 && <span className="text-[#3b82f6]">Verifying Credentials...</span>}
                        {authStage === 2 && <span className="text-[#3b82f6]">Establishing Secure Connection...</span>}
                        {authStage === 3 && <span className="text-emerald-400">Access Granted</span>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                 <input 
                   type="text" 
                   required
                   placeholder="Clearance ID"
                   className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-[#3b82f6]/50 focus:bg-[#1a1a1a] transition-all"
                 />
              </div>
              <div>
                 <input 
                   type="password" 
                   required
                   placeholder="Passcode"
                   className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-[#3b82f6]/50 focus:bg-[#1a1a1a] transition-all tracking-widest"
                 />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white py-3 rounded-xl text-xs uppercase tracking-widest transition-all mt-4"
              >
                Authenticate
              </button>
           </form>
           
           <div className="mt-8 text-center">
              <span className="text-[9px] text-gray-600 tracking-widest uppercase">Unauthorized access is strictly monitored</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
