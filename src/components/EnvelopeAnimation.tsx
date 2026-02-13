import { useState, useEffect } from "react";

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

const EnvelopeAnimation = ({ onComplete }: EnvelopeAnimationProps) => {
  const [phase, setPhase] = useState<"appear" | "opening" | "letter-out" | "done">("appear");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 800);
    const t2 = setTimeout(() => setPhase("letter-out"), 2200);
    const t3 = setTimeout(() => setPhase("done"), 3800);
    const t4 = setTimeout(() => onComplete(), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 transition-opacity duration-[2s]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(350 50% 85% / 0.25) 0%, transparent 70%)",
          opacity: phase === "done" ? 0 : 1,
        }}
      />

      <div
        className="relative z-10 transition-all duration-700"
        style={{
          opacity: phase === "done" ? 0 : 1,
          transform: phase === "done" ? "scale(0.8)" : "scale(1)",
        }}
      >
        {/* Envelope */}
        <div className="relative w-64 h-44 md:w-80 md:h-56 mx-auto" style={{ perspective: "800px" }}>
          {/* Envelope body */}
          <div className="absolute inset-0 bg-cream-dark rounded-lg border border-gold-light/40 shadow-xl overflow-hidden">
            {/* Envelope texture pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--gold) / 0.1) 10px, hsl(var(--gold) / 0.1) 11px)",
              }}
            />
            {/* Wax seal */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-rose-deep flex items-center justify-center shadow-md z-20"
              style={{
                opacity: phase === "appear" ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <span className="text-primary-foreground text-xs font-script">♥</span>
            </div>
          </div>

          {/* Envelope flap */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top z-30"
            style={{
              transform: phase === "appear" ? "rotateX(0deg)" : "rotateX(-180deg)",
              transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front of flap */}
            <div
              className="absolute inset-0 bg-cream-dark rounded-t-lg"
              style={{
                backfaceVisibility: "hidden",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                borderBottom: "2px solid hsl(var(--gold-light) / 0.4)",
              }}
            />
            {/* Back of flap */}
            <div
              className="absolute inset-0 bg-parchment rounded-t-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
              }}
            />
          </div>

          {/* Letter sliding out */}
          <div
            className="absolute left-3 right-3 top-4 bottom-4 bg-parchment rounded shadow-sm z-20 flex items-center justify-center"
            style={{
              transform:
                phase === "letter-out" || phase === "done"
                  ? "translateY(-110%)"
                  : "translateY(0)",
              opacity: phase === "done" ? 0 : 1,
              transition: "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
            }}
          >
            <div className="text-center px-4">
              <p className="font-script text-lg md:text-xl text-foreground">For You</p>
              <p className="font-script text-gold text-sm mt-1">with all my love</p>
            </div>
          </div>
        </div>

        {/* Label */}
        <p
          className="text-center mt-8 font-body text-muted-foreground italic text-sm transition-opacity duration-500"
          style={{ opacity: phase === "appear" ? 1 : 0 }}
        >
          A letter from my heart to yours…
        </p>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
