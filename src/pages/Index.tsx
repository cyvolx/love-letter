import { useState, useCallback, useEffect, useRef } from "react";
import PasswordScreen from "@/components/PasswordScreen";
import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import LoveLetter from "@/components/LoveLetter";

type Phase = "locked" | "envelope" | "letter";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("locked");

  // Audio references for centralized control
  const lockScreenAudioRef = useRef<HTMLAudioElement | null>(null);
  const envelopeAudioRef = useRef<HTMLAudioElement | null>(null);
  const letterAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize lock screen ambient audio
  useEffect(() => {
    if (phase === "locked") {
      // Create lock screen ambient audio
      lockScreenAudioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/03/10/audio_4a465279bd.mp3",
      ); // Soft romantic piano
      lockScreenAudioRef.current.loop = true;
      lockScreenAudioRef.current.volume = 0.15; // Very soft

      // Attempt autoplay with fallback to user interaction
      const playPromise = lockScreenAudioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked - will play on first user interaction
          console.log("Autoplay blocked - audio will start on interaction");
        });
      }
    }

    return () => {
      // Cleanup lock screen audio when leaving phase
      if (lockScreenAudioRef.current) {
        lockScreenAudioRef.current.pause();
        lockScreenAudioRef.current = null;
      }
    };
  }, [phase]);

  const handleUnlock = useCallback(() => {
    // Play magical success sound
    const successSound = new Audio(
      "https://cdn.pixabay.com/audio/2022/03/24/audio_13a91f2903.mp3",
    ); // Magical chime
    successSound.volume = 0.4;
    successSound.play();

    // Fade out lock screen audio
    if (lockScreenAudioRef.current) {
      const fadeOut = setInterval(() => {
        if (
          lockScreenAudioRef.current &&
          lockScreenAudioRef.current.volume > 0.02
        ) {
          lockScreenAudioRef.current.volume -= 0.02;
        } else {
          clearInterval(fadeOut);
          if (lockScreenAudioRef.current) {
            lockScreenAudioRef.current.pause();
          }
        }
      }, 50);
    }

    // Transition to envelope phase
    setTimeout(() => {
      setPhase("envelope");

      // Start envelope opening cinematic music
      envelopeAudioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2023/02/28/audio_115016f245.mp3",
      ); // Emotional cinematic
      envelopeAudioRef.current.volume = 0.3;
      envelopeAudioRef.current.play();
    }, 500);
  }, []);

  const handleEnvelopeDone = useCallback(() => {
    // Fade out envelope audio
    if (envelopeAudioRef.current) {
      const fadeOut = setInterval(() => {
        if (
          envelopeAudioRef.current &&
          envelopeAudioRef.current.volume > 0.02
        ) {
          envelopeAudioRef.current.volume -= 0.02;
        } else {
          clearInterval(fadeOut);
          if (envelopeAudioRef.current) {
            envelopeAudioRef.current.pause();
          }
        }
      }, 100);
    }

    // Transition to letter
    setTimeout(() => {
      setPhase("letter");

      // Start intimate reading music
      letterAudioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/05/13/audio_67b95e6b60.mp3",
      ); // Soft romantic strings
      letterAudioRef.current.loop = true;
      letterAudioRef.current.volume = 0.2; // Very soft for reading
      letterAudioRef.current.play();
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
    <>
      {phase === "locked" && <PasswordScreen onUnlock={handleUnlock} />}
      {phase === "envelope" && (
        <EnvelopeAnimation onComplete={handleEnvelopeDone} />
      )}
      {phase === "letter" && <LoveLetter />}
    </>
  );
};

export default Index;
