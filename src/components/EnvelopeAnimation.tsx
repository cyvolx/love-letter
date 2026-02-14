import { useState, useEffect, useRef } from "react";
import FloatingHearts from "./FloatingHearts";

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

const EnvelopeAnimation = ({ onComplete }: EnvelopeAnimationProps) => {
  const [phase, setPhase] = useState<
    "appear" | "ready" | "unsealing" | "opening" | "letter-out" | "done"
  >("appear");
  const [showButton, setShowButton] = useState(false);

  const waxSealAudioRef = useRef<HTMLAudioElement | null>(null);
  const paperSlideAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setPhase("ready");
    setShowButton(true);
  }, []);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (phase === "opening") {
      console.log("⏰ Starting envelope timers");

      setTimeout(() => {
        console.log("📝 Letter sliding out");
        setPhase("letter-out");
      }, 1400);

      setTimeout(() => {
        console.log("✅ Animation done - calling onComplete");
        setPhase("done");
        onCompleteRef.current();
      }, 3000);
    }
  }, [phase]);

  const handleUnseal = () => {
    if (phase !== "ready") return;

    setShowButton(false);

    waxSealAudioRef.current = new Audio("/audio/wax-seal-break.mp3");
    waxSealAudioRef.current.volume = 0.8;
    waxSealAudioRef.current.play().catch(() => console.log("Audio blocked"));

    setPhase("unsealing");

    setTimeout(() => {
      setPhase("opening");

      paperSlideAudioRef.current = new Audio("/audio/paper-slide.mp3");
      paperSlideAudioRef.current.volume = 0.6;
      paperSlideAudioRef.current
        .play()
        .catch(() => console.log("Audio blocked"));
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <FloatingHearts />

      <div
        className="absolute inset-0 transition-opacity duration-[2s]"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(350 60% 85% / 0.35) 0%, hsl(350 50% 90% / 0.2) 50%, transparent 70%)",
          opacity: phase === "done" ? 0 : 1,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-[2s]"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, hsl(10 70% 85% / 0.2) 0%, transparent 30%), radial-gradient(circle at 70% 60%, hsl(340 65% 88% / 0.25) 0%, transparent 35%)",
          opacity: phase === "done" ? 0 : 1,
        }}
      />

      <div
        className="relative z-10 transition-all duration-1000"
        style={{
          opacity: phase === "done" ? 0 : 1,
          transform:
            phase === "done"
              ? "scale(0.95) translateY(-20px)"
              : "scale(1) translateY(0)",
        }}
      >
        <div
          className="relative w-80 h-56 md:w-96 md:h-64 mx-auto"
          style={{ perspective: "1000px" }}
        >
          <div className="absolute inset-0 bg-cream-dark rounded-lg border border-gold-light/40 shadow-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--gold) / 0.15) 10px, hsl(var(--gold) / 0.15) 11px)",
              }}
            />

            <div
              className="absolute bottom-8 left-1/2 w-14 h-14 rounded-full bg-rose-deep flex items-center justify-center z-20 transition-all duration-500"
              style={{
                opacity: phase === "appear" || phase === "ready" ? 1 : 0,
                transform:
                  phase === "unsealing"
                    ? "translateX(-50%) scale(1.2) rotate(15deg)"
                    : "translateX(-50%) scale(1)",
                boxShadow:
                  phase === "ready"
                    ? "0 0 30px rgba(220, 38, 38, 0.6), 0 0 15px rgba(220, 38, 38, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)"
                    : "0 0 20px rgba(220, 38, 38, 0.4), 0 4px 6px rgba(0, 0, 0, 0.1)",
                filter: phase === "unsealing" ? "blur(2px)" : "none",
                left: "50%",
              }}
            >
              <span className="text-white text-lg font-script">♥</span>
            </div>
          </div>

          <div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top z-30"
            style={{
              transform:
                phase === "opening" ||
                phase === "letter-out" ||
                phase === "done"
                  ? "rotateX(-180deg)"
                  : "rotateX(0deg)",
              transition: "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 bg-cream-dark rounded-t-lg"
              style={{
                backfaceVisibility: "hidden",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                borderBottom: "2px solid hsl(var(--gold-light) / 0.4)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              className="absolute inset-0 bg-parchment rounded-t-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
              }}
            />
          </div>

          <div
            className="absolute left-4 right-4 top-6 bottom-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-lg flex items-center justify-center border-2 border-rose-200/40"
            style={{
              transform:
                phase === "letter-out" || phase === "done"
                  ? "translateY(-120%)"
                  : "translateY(0)",
              opacity: phase === "done" ? 0 : 1,
              transition:
                "transform 1.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
              boxShadow:
                phase === "letter-out" || phase === "done"
                  ? "0 15px 50px rgba(219, 39, 119, 0.3), 0 0 80px rgba(255, 192, 203, 0.25)"
                  : "0 3px 10px rgba(0, 0, 0, 0.1)",
              zIndex: phase === "letter-out" || phase === "done" ? 40 : 15,
            }}
          >
            <div className="text-center px-6">
              <p className="font-script text-xl md:text-2xl text-rose-800 mb-2">
                For My Beloved Patata
              </p>
              <p className="font-script text-rose-600 text-base md:text-lg">
                with endless love ♥
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center mt-12 transition-all duration-500"
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? "translateY(0)" : "translateY(10px)",
            pointerEvents: showButton ? "auto" : "none",
          }}
        >
          <button
            onClick={handleUnseal}
            className="w-full max-w-xs py-3 rounded-full bg-primary text-primary-foreground font-display text-lg tracking-wide hover:opacity-90 transition-opacity glow-soft"
          >
            Unseal Envelope
          </button>
        </div>

        <p
          className="text-center mt-6 font-body text-muted-foreground italic text-sm transition-all duration-500"
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? "translateY(0)" : "translateY(10px)",
          }}
        >
          Break the seal to reveal your letter...
        </p>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
