import { useState, useRef, useEffect } from "react";
import FloatingHearts from "./FloatingHearts";

interface PasswordScreenProps {
  onUnlock: () => void;
}

const PasswordScreen = ({ onUnlock }: PasswordScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const audioTriggeredRef = useRef(false);

  // Ensure audio starts on first user interaction (if autoplay was blocked)
  const handleFirstInteraction = () => {
    if (!audioTriggeredRef.current) {
      audioTriggeredRef.current = true;
      // This will be handled by the parent Index component
      // but we ensure user has interacted with the page
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === "forever") {
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Floating hearts for romantic atmosphere */}
      <FloatingHearts />

      {/* Enhanced soft radial glow with pink tones */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(350 60% 85% / 0.4) 0%, hsl(350 50% 90% / 0.2) 40%, transparent 70%)",
        }}
      />

      {/* Additional romantic glow layer */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, hsl(340 70% 85% / 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 20%, hsl(10 60% 85% / 0.25) 0%, transparent 40%)",
        }}
      />

      <div
        className={`relative z-10 text-center px-6 transition-all duration-300 ${
          shaking ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        style={{
          animation: shaking ? "shake 0.5s ease-in-out" : undefined,
        }}
      >
        <div className="mb-8">
          <span className="text-5xl md:text-6xl block mb-4 animate-pulse-soft">
            💌
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
            A Letter For You
          </h1>
          <p className="font-body text-lg text-muted-foreground italic">
            Only your heart knows the key…
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
              handleFirstInteraction();
            }}
            onFocus={handleFirstInteraction}
            placeholder="Enter the password"
            className="w-full px-6 py-3 rounded-full bg-cream border border-gold-light/50 text-center font-body text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
          {error && (
            <p className="text-primary text-sm font-body italic animate-fade-in">
              That's not it, my love. Try again…
            </p>
          )}
          <button
            type="submit"
            onClick={handleFirstInteraction}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground font-display text-lg tracking-wide hover:opacity-90 hover:scale-[1.02] transition-all glow-soft"
          >
            Open My Heart
          </button>
        </form>
        <p className="mt-6 text-xs text-muted-foreground font-body">
          Hint: What I promised you
        </p>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PasswordScreen;
