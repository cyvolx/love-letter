import { useState, useCallback, useEffect, useRef } from "react";
import PasswordScreen from "@/components/PasswordScreen";
import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import LoveLetter from "@/components/LoveLetter";

type Phase = "locked" | "envelope" | "letter";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("locked");
  const [fadeOut, setFadeOut] = useState(false);

  // Audio references for centralized control
  const lockScreenAudioRef = useRef<HTMLAudioElement | null>(null);
  const envelopeAudioRef = useRef<HTMLAudioElement | null>(null);
  const letterAudioRef = useRef<HTMLAudioElement | null>(null);

  // Helper function to play audio with graceful error handling
  const playAudioSafe = (audio: HTMLAudioElement, onError?: () => void) => {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log(
          "Audio playback blocked - will start on user interaction:",
          error,
        );
        if (onError) onError();

        // Add click listener to start audio on user interaction
        const startAudio = () => {
          audio.play().catch(() => console.log("Still blocked"));
          document.removeEventListener("click", startAudio);
        };
        document.addEventListener("click", startAudio, { once: true });
      });
    }
  };

  // Initialize lock screen piano melody
  useEffect(() => {
    if (phase === "locked") {
      // AUDIO: Gentle piano melody - soft and romantic
      lockScreenAudioRef.current = new Audio("/audio/lock-screen-piano.mp3");
      lockScreenAudioRef.current.loop = true;
      lockScreenAudioRef.current.volume = 0.6; // Louder and clearer

      // Try to play with fallback
      playAudioSafe(lockScreenAudioRef.current);
    }

    return () => {
      if (lockScreenAudioRef.current) {
        lockScreenAudioRef.current.pause();
        lockScreenAudioRef.current = null;
      }
    };
  }, [phase]);

  const handleUnlock = useCallback(() => {
    // AUDIO: Magical sparkle - cascading fairy dust sound
    const successSound = new Audio("/audio/magical-sparkle.mp3");
    successSound.volume = 1.0; // Full volume for magical moment
    playAudioSafe(successSound);

    // Fade out lock screen audio smoothly
    if (lockScreenAudioRef.current) {
      const fadeOut = setInterval(() => {
        if (
          lockScreenAudioRef.current &&
          lockScreenAudioRef.current.volume > 0.05
        ) {
          lockScreenAudioRef.current.volume = Math.max(
            0,
            lockScreenAudioRef.current.volume - 0.05,
          );
        } else {
          clearInterval(fadeOut);
          if (lockScreenAudioRef.current) {
            lockScreenAudioRef.current.pause();
          }
        }
      }, 50);
    }

    // Fade out current component
    setFadeOut(true);

    // Transition to envelope phase after fade
    setTimeout(() => {
      setPhase("envelope");
      setFadeOut(false);

      // AUDIO: Romantic string orchestra - warm and flowing
      envelopeAudioRef.current = new Audio("/audio/envelope-strings.mp3");
      envelopeAudioRef.current.volume = 0.8; // Nice and present
      playAudioSafe(envelopeAudioRef.current);
    }, 800); // Wait for fade out
  }, []);

  const handleEnvelopeDone = useCallback(() => {
    // Fade out envelope audio smoothly
    if (envelopeAudioRef.current) {
      const fadeOut = setInterval(() => {
        if (
          envelopeAudioRef.current &&
          envelopeAudioRef.current.volume > 0.05
        ) {
          envelopeAudioRef.current.volume = Math.max(
            0,
            envelopeAudioRef.current.volume - 0.05,
          );
        } else {
          clearInterval(fadeOut);
          if (envelopeAudioRef.current) {
            envelopeAudioRef.current.pause();
          }
        }
      }, 100);
    }

    // Switch immediately - no fade
    setPhase("letter");

    // Transition to letter reading after fade
    setTimeout(() => {
      setPhase("letter");
      setFadeOut(false);

      // AUDIO: Soft ambient pad - LOUDER and richer
      letterAudioRef.current = new Audio("/audio/letter-piano-ambient.mp3");
      letterAudioRef.current.loop = true;
      letterAudioRef.current.volume = 0.008; // Much more present
      playAudioSafe(letterAudioRef.current);
    }, 300);
  }, []);

  // Cleanup all audio on unmount
  useEffect(() => {
    return () => {
      [lockScreenAudioRef, envelopeAudioRef, letterAudioRef].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  return (
    <div
      className="transition-opacity duration-700 ease-in-out"
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      {phase === "locked" && <PasswordScreen onUnlock={handleUnlock} />}
      {phase === "envelope" && (
        <EnvelopeAnimation onComplete={handleEnvelopeDone} />
      )}
      {phase === "letter" && <LoveLetter />}
    </div>
  );
};

export default Index;
