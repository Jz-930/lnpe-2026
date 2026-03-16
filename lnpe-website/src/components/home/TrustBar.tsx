export function TrustBar() {
  return (
    <div className="w-full border-y border-lnpe-border bg-lnpe-bg-light/50 backdrop-blur-md overflow-hidden relative group">
      {/* Decorative side gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-lnpe-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-lnpe-bg to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap py-4 animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-8 font-mono text-sm tracking-widest text-lnpe-text">
            <span className="text-white hover:text-lnpe-kinetic transition-colors cursor-default">TRUSTED BY <span className="text-lnpe-kinetic font-bold">5,000+</span> USERS</span>
            <span className="text-lnpe-border/50">///</span>
            <span className="text-white hover:text-lnpe-kinetic transition-colors cursor-default"><span className="text-lnpe-kinetic font-bold">20+</span> COUNTRIES</span>
            <span className="text-lnpe-border/50">///</span>
          </div>
        ))}
      </div>
      
      {/* Inline style for the marquee keyframes since Tailwind arbitrary value animation can be tricky for keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
