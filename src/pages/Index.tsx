import { useState, useCallback } from "react";
import PasswordScreen from "@/components/PasswordScreen";
import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import LoveLetter from "@/components/LoveLetter";

type Phase = "locked" | "envelope" | "letter";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("locked");

  const handleUnlock = useCallback(() => setPhase("envelope"), []);
  const handleEnvelopeDone = useCallback(() => setPhase("letter"), []);

  return (
    <>
      {phase === "locked" && <PasswordScreen onUnlock={handleUnlock} />}
      {phase === "envelope" && <EnvelopeAnimation onComplete={handleEnvelopeDone} />}
      {phase === "letter" && <LoveLetter />}
    </>
  );
};

export default Index;
