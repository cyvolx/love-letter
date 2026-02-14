import { useState, useEffect } from "react";
import FloatingHearts from "./FloatingHearts";

const LoveLetter = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* More floating hearts for the final romantic reveal */}
      <FloatingHearts />
      <FloatingHearts /> {/* Double hearts for extra romance */}
      {/* Enhanced soft background glow with richer romantic tones */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, hsl(350 60% 85% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(40 65% 75% / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, hsl(340 55% 88% / 0.15) 0%, transparent 60%)",
        }}
      />
      {/* Additional dreamy sparkle overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, hsl(10 70% 85% / 0.4) 0%, transparent 25%), radial-gradient(circle at 85% 25%, hsl(345 65% 85% / 0.35) 0%, transparent 30%), radial-gradient(circle at 25% 85%, hsl(355 60% 88% / 0.3) 0%, transparent 25%), radial-gradient(circle at 75% 75%, hsl(20 65% 82% / 0.35) 0%, transparent 28%)",
        }}
      />
      <div
        className="relative z-20 max-w-2xl mx-auto px-6 py-12 md:py-20 transition-all duration-[1.5s] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Letter card with enhanced romantic glow */}
        {/* Letter card with enhanced romantic glow */}
        <div
          className="bg-parchment rounded-2xl shadow-2xl p-8 md:p-12 border border-gold-light/30 glow-soft relative overflow-hidden"
          style={{
            boxShadow:
              "0 20px 60px rgba(218, 165, 32, 0.15), 0 10px 30px rgba(255, 192, 203, 0.2), 0 0 80px rgba(255, 182, 193, 0.1)",
          }}
        >
          <div className="absolute top-8 right-8 text-rose-300 opacity-25 text-3xl -rotate-6">
            🌹
          </div>
          <div className="absolute bottom-12 left-12 text-rose-400 opacity-20 text-xl rotate-45">
            🌹
          </div>

          <div className="absolute top-1/3 right-4 text-rose-400 opacity-15 text-xl rotate-90">
            🌹
          </div>
          <div className="absolute top-2/3 left-8 text-rose-300 opacity-20 text-2xl -rotate-45">
            🌹
          </div>

          <div className="text-right mb-5">
            <p className="font-script text-lg text-muted-foreground italic">
              February 14th, 2026
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
              My Lovely Princess,
            </h2>
          </div>

          <div className="font-body text-foreground text-lg md:text-xl leading-relaxed space-y-6 italic relative z-10">
            <p>
              I want you to know how much I
              <span className="text-primary"> love </span>
              you, truly and deeply. You are always with me in my heart, in my
              thoughts, and in my duas. Even with the distance, my certainty
              about us has never changed. I have strong
              <span className="text-primary"> yaqin </span> in Allah that we
              will be
              <span className="text-primary"> reunited </span>
              very soon, and I feel it with calm confidence, not doubt. What
              Allah writes cannot be delayed or lost.
            </p>

            <p>
              I haven't stopped
              <span className="text-primary"> thinking </span>
              about you, not for a single moment. I carry you with me quietly in
              my thoughts and in my prayers. I'm still here still holding onto
              what we have. My
              <span className="text-primary"> heart </span>
              hasn't gone anywhere. It's yours, steady and patient,
              <span className="text-primary"> trusting </span>
              Allah until the day He brings us back together in a way that
              pleases Him.
            </p>

            <p>
              Never doubt for a moment that I don't
              <span className="text-primary"> miss </span> you you. I miss your
              presence, your warmth, your world. I even miss Ta Chedlia, and
              Snoopy Doopy too and I look forward, with
              <span className="text-primary"> sincere </span>
              intention, to meeting your father one day, in the way Allah loves
              and approves. I am still
              <span className="text-primary"> true </span> to my words and
              promises. When the timing is right, everything will fall into
              place.
            </p>

            <p>
              I cannot wait to be your
              <span className="text-primary"> devoted husband </span>
              to lead us in our prayers, provide you with everything you wished
              for, and give you all the love you deserve. I am
              <span className="text-primary"> grateful </span>
              for you in ways that words will always fall short of.
            </p>

            <p>
              I don't just want this life with you. I want
              <span className="text-primary"> every life after it</span>. I want
              to find you in every world, in every story, in every hereafter.
              Because a soul like yours so pure and beautiful is the only
              <span className="text-primary"> home </span>I have ever truly
              known.
            </p>

            <p>
              So here is my promise written not in ink but in every heartbeat
              that carries your name:
            </p>

            <p className="text-center not-italic font-display text-xl md:text-2xl text-primary py-4">
              I will love you beyond the last breath,
              <br />
              beyond the last prayer,
              <br />
              beyond the last star in the sky.
            </p>

            <p>
              You are my healing. My happiness. My answered prayer. And I will
              spend every remaining day making sure you never, ever doubt that.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 text-right relative z-10">
            <div className="w-16 h-px bg-gold/40 ml-auto mb-4" />
            <p className="font-script text-2xl md:text-3xl text-foreground">
              Forever Yours
            </p>
            <p className="font-body text-muted-foreground text-sm mt-1">
              Your husband, today and always
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="text-center mt-8">
            <span className="text-primary text-2xl animate-heart-beat">♥</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground font-body text-sm mt-8 italic">
          Made with love for my wife.
        </p>
      </div>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.1) rotate(90deg); }
        }
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-heart-beat {
          animation: heart-beat 2s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default LoveLetter;
