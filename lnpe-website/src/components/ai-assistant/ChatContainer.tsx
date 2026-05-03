"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send, Mic, AlertTriangle, Lock } from "lucide-react";
import ThinkingTimeline from "./ThinkingTimeline";
import ImageGallery from "./ImageGallery";

interface Message {
  id: string;
  role: "user" | "ai";
  content?: React.ReactNode;
  isThinking?: boolean;
}

const DEMO_PICS = [
  { url: "/images/04_products/product_01_jet-mill/product_01_gallery_01.webp", tag: "Jet mill line" },
  { url: "/images/06_projects/project_04_lithium-iron-phosphate-specialized-classified-jet-mill/project_04_content_01.png", tag: "LFP project" },
  { url: "/images/03_about/about_02_jet-pulverizer.webp", tag: "Pulverizer equipment" },
];

export default function ChatContainer({ isInternalMode = false, lang = "en" }: { isInternalMode?: boolean; lang?: "en" | "zh" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [turn, setTurn] = useState<number>(0);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const initZh = ["有没有做过类似磷酸铁的项目？", "超微粉碎机型对比展示", "有没有最新设备运行视频？"];
  const initEn = ["Any projects similar to Iron Phosphate?", "Ultrafine mill comparison", "Show recent machinery videos"];
  const [suggestions, setSuggestions] = useState<string[] | null>(null);

  const activeSuggestions = suggestions !== null ? suggestions : (lang === "en" ? initEn : initZh);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (overrideText?: string) => {
    const textToSend = typeof overrideText === "string" ? overrideText : inputValue;
    if (!textToSend.trim() || isInputDisabled) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (typeof overrideText !== "string") setInputValue("");
    setIsInputDisabled(true);
    setSuggestions([]);

    if (turn === 0 || textToSend.includes("磷酸铁") || textToSend.toLowerCase().includes("iron phosphate")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "ai", isThinking: true }]);
      }, 500);
    } else if (
      turn === 1 ||
      textToSend.includes("价格") ||
      textToSend.includes("成本") ||
      textToSend.toLowerCase().includes("price") ||
      textToSend.toLowerCase().includes("cost")
    ) {
      setTimeout(() => {
        handleTurn2Response();
      }, 800);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "ai",
            content:
              lang === "en"
                ? "As a demo version, I only have pre-loaded knowledge flows related to Iron Phosphate and pricing. You can try asking about these topics."
                : "作为演示版本，我目前只准备了关于磷酸铁和项目成本的预置知识流。您可以尝试询问这些话题。",
          },
        ]);
        setIsInputDisabled(false);
      }, 1000);
    }
  };

  const handleThinkingComplete = (id: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            isThinking: false,
            content: (
              <div className="space-y-4">
                <p className="text-sm leading-7 text-lnpe-text">
                  {lang === "en" ? (
                    <>
                      LNPE has extensive experience in the frontend preparation of{" "}
                      <strong className="font-semibold text-lnpe-dark">Lithium Iron Phosphate (LFP)</strong>. According to
                      our P12 database, we consistently stabilize the D50 particle size of LFP finished products at around{" "}
                      <strong className="font-bold text-lnpe-kinetic">66.8 μm</strong>, setting an industry-leading standard.
                    </>
                  ) : (
                    <>
                      LNPE 在<strong className="font-semibold text-lnpe-dark">磷酸铁锂 (LFP)</strong>前端配套领域拥有大量成熟经验。根据内部
                      P12 数据库交叉比对，我们在该类产线中，将磷酸铁成品平均粒径（D50）稳定控制在{" "}
                      <strong className="font-bold text-lnpe-kinetic">66.8 μm</strong> 左右，处于行业顶尖标准。
                    </>
                  )}
                </p>
                <p className="text-sm leading-6 text-lnpe-muted">
                  {lang === "en"
                    ? "Here are the matched machinery and plant records from our system:"
                    : "以下是系统匹配的相关关键设备和车间存档资料："}
                </p>
                <ImageGallery images={DEMO_PICS} />
              </div>
            ),
          };
        }
        return message;
      })
    );
    setTurn(1);
    setIsInputDisabled(false);
    setSuggestions(
      lang === "en"
        ? ["Can I see more detailed pricing data?", "What is the footprint of this line?", "What is the energy consumption?"]
        : ["能看看更具体的价格数据吗？", "这套设备的场地面积要求是多少？", "该粒径下的能耗水平如何？"]
    );
  };

  const handleTurn2Response = () => {
    if (!isInternalMode) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: (
            <div className="flex items-start gap-3 border border-amber-300 bg-amber-50 p-3 text-amber-900">
              <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={18} />
              <div>
                <p className="mb-1 text-sm font-semibold">{lang === "en" ? "Permission Threshold" : "权限限制"}</p>
                <p className="text-xs leading-6 text-amber-800">
                  {lang === "en" ? (
                    <>
                      You are currently logged in as a Visitor (T1). This query involves proprietary internal pricing data. For
                      in-depth discussions or project budgets, please{" "}
                      <a href="/portal/assistant" className="font-semibold underline">
                        use an internal authorization code to log in
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      您目前以访客 (T1) 身份登录。该查询涉及企业内部机组定价数据。如需深度交流或项目预算报备，请{" "}
                      <a href="/portal/assistant" className="font-semibold underline">
                        使用内部授权码登录
                      </a>
                      。
                    </>
                  )}
                </p>
              </div>
            </div>
          ),
        },
      ]);
      setTurn(2);
      setIsInputDisabled(false);
      setSuggestions([]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content: (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="text-emerald-600" size={14} />
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">T2 Internal Clearance Verified</span>
              </div>
              <p className="text-sm text-lnpe-text">
                {lang === "en" ? "Accessing internal cost database, breakdown as follows:" : "正在调取内部成本库，具体分项如下："}
              </p>
              <div className="border border-lnpe-border bg-lnpe-bg-light p-3 font-mono text-xs text-lnpe-muted">
                <div className="flex justify-between border-b border-lnpe-border py-1">
                  <span className="text-lnpe-blue">{lang === "en" ? "#Equipment Sizing" : "#设备定型"}</span>
                  <span>￥2.4M</span>
                </div>
                <div className="flex justify-between border-b border-lnpe-border py-1">
                  <span className="text-lnpe-blue">{lang === "en" ? "#Labor & Site Dist" : "#人工与场地分摊"}</span>
                  <span>￥0.8M</span>
                </div>
                <div className="flex justify-between border-b border-lnpe-border py-1">
                  <span className="text-lnpe-blue">{lang === "en" ? "#Material Float Rate" : "#基建材料浮动率"}</span>
                  <span>+4.2%</span>
                </div>
                <div className="mt-1 flex justify-between pt-2">
                  <strong className="text-lnpe-dark">{lang === "en" ? "Est. Total Reference" : "预估总价参考"}</strong>
                  <strong className="text-lnpe-kinetic">￥3.28M</strong>
                </div>
              </div>
              <p className="text-xs italic text-lnpe-steel">
                {lang === "en"
                  ? "* This data is for internal reference only. Please add at least 25% for external tax-inclusive quotes."
                  : "* 该数据仅适用于内部参考，对客含税报价请上浮至少25%"}
              </p>
            </div>
          ),
        },
      ]);
      setTurn(2);
      setIsInputDisabled(false);
      setSuggestions([]);
    }
  };

  const handleMockMic = () => {
    setInputValue(lang === "en" ? "Any projects similar to Iron Phosphate?" : "你们有没有做过类似磷酸铁的项目？");
  };

  return (
    <div className="relative z-10 flex h-full flex-col bg-transparent" data-sys-auth="jiackey-core-engine">
      <div className="custom-scrollbar relative z-10 flex-1 overflow-y-auto px-5 py-5 pb-24">
        {messages.length === 0 && (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center border border-lnpe-border bg-lnpe-paper">
              <Image src="/images/00_brand/favicon_01.ico" alt="LNPE assistant" width={24} height={24} />
            </div>
            <p className="max-w-[240px] text-sm leading-6 text-lnpe-muted">
              {lang === "en"
                ? "Welcome to the LNPE Expert Engine. Ask technical questions or request demo flows."
                : "欢迎查询行业专家库数据。您可以随时语音或文字提问。"}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "user" ? (
                  <div className="max-w-[85%] bg-lnpe-blue px-4 py-2.5 text-sm font-medium leading-6 text-lnpe-paper clip-chamfer">
                    {message.content}
                  </div>
                ) : (
                  <div className="w-full max-w-[92%]">
                    <div className="flex flex-col border border-lnpe-border bg-lnpe-paper p-4 text-lnpe-text shadow-sm clip-chamfer">
                      {message.isThinking ? <ThinkingTimeline lang={lang} onComplete={() => handleThinkingComplete(message.id)} /> : message.content}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-1 pb-4" />
        </div>
      </div>

      <div className="sticky bottom-0 z-20 flex flex-col gap-3 border-t border-lnpe-border bg-lnpe-paper p-4">
        <AnimatePresence>
          {activeSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-wrap gap-2 border border-lnpe-border bg-lnpe-bg-light p-3"
            >
              <div className="flex w-full items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-lnpe-blue">
                <span className="h-1.5 w-1.5 bg-lnpe-kinetic" />
                {turn === 0
                  ? lang === "en"
                    ? "Try these examples"
                    : "可尝试的问题"
                  : lang === "en"
                    ? "Explore further"
                    : "继续深度追问"}
              </div>
              {activeSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="border border-lnpe-border bg-lnpe-paper px-3 py-1.5 text-xs font-semibold text-lnpe-blue transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border border-lnpe-border bg-lnpe-bg-light p-1 transition-colors focus-within:border-lnpe-kinetic">
          <div className="flex items-end">
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder={lang === "en" ? "Ask about technical specs, case studies..." : "询问技术参数、类似案例或组件型号..."}
              className="min-h-[44px] max-h-[120px] w-full resize-none bg-transparent px-3 py-3 text-sm leading-6 text-lnpe-dark outline-none placeholder:text-lnpe-steel disabled:opacity-50"
              rows={1}
              disabled={isInputDisabled}
            />
            <div className="flex shrink-0 items-center gap-1 p-1">
              <button
                onClick={handleMockMic}
                disabled={isInputDisabled}
                className="grid h-9 w-9 place-items-center border border-transparent text-lnpe-steel transition-colors hover:border-lnpe-border hover:text-lnpe-blue disabled:opacity-50"
                title="Mock Voice Input"
              >
                <Mic size={18} />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={isInputDisabled || !inputValue.trim()}
                className="grid h-9 w-9 place-items-center bg-lnpe-dark text-lnpe-paper transition-colors hover:bg-lnpe-kinetic disabled:bg-lnpe-border disabled:text-lnpe-steel"
                aria-label="Send message"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-lnpe-steel">LNPE Expert Engine • Proprietary Data</span>
          <span className="sr-only" aria-hidden="true">Designed by jiackey</span>
        </div>
      </div>
    </div>
  );
}
