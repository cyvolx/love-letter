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
        <div
          className="bg-parchment rounded-2xl shadow-2xl p-8 md:p-12 border border-gold-light/30 glow-soft"
          style={{
            boxShadow:
              "0 20px 60px rgba(218, 165, 32, 0.15), 0 10px 30px rgba(255, 192, 203, 0.2), 0 0 80px rgba(255, 182, 193, 0.1)",
          }}
        >
          {/* Header ornament */}
          <div className="text-center mb-8">
            <span className="text-gold text-3xl animate-twinkle">✦</span>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mt-2 mb-1">
              My Dearest Love
            </h2>
            <div className="w-24 h-px bg-gold/40 mx-auto mt-3" />
          </div>

          {/* Letter body */}
          <div className="font-body text-foreground text-lg md:text-xl leading-relaxed space-y-6 italic">
            <p>
              If I could gather every star that ever lit our darkest nights and
              weave them into words, they still would not be bright enough to
              tell you what you mean to me.
            </p>

            <p>
              You came into my life like a quiet dawn — not with thunder or
              noise, but with a warmth so steady it melted away every wall I had
              built. And when I thought I had lost you, the world turned grey,
              as if the sun itself forgot how to rise.
            </p>

            <p>
              But here we are. Together again. And I want you to know — every
              scar, every silence, every tear we've shared has only deepened the
              roots of what we are. We are not fragile. We are a love that chose
              to stay.
            </p>

            <p>
              Thank you for your patience — the kind that held my hand when I
              didn't know how to hold my own. Thank you for seeing the best in
              me even when I couldn't see it myself. Thank you for coming back,
              not because it was easy, but because your heart still recognized
              mine.
            </p>

            <p>
              I am grateful for you in ways that words will always fall short
              of. For your laughter that turns an ordinary room into the safest
              place on earth. For your eyes that say everything your lips
              sometimes cannot. For the way you love — fully, fiercely, and
              without condition.
            </p>

            <p>
              I don't just want this life with you. I want every life after it.
              I want to find you in every world, in every story, in every
              hereafter. Because a soul like yours — so tender, so luminous, so
              endlessly beautiful — is the only home I have ever truly known.
            </p>

            <p>
              So here is my promise, written not in ink but in every heartbeat
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
          <div className="mt-10 text-right">
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
          Made with love, just for you.
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
