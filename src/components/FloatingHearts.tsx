import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
  color: string;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  // Romantic color palette - soft pinks, blush, pastel reds
  const heartColors = [
    "hsl(350, 80%, 85%)", // Soft pink
    "hsl(0, 70%, 80%)", // Blush pink
    "hsl(340, 75%, 88%)", // Pale rose
    "hsl(355, 85%, 90%)", // Light pink
    "hsl(0, 60%, 85%)", // Pastel red
    "hsl(345, 70%, 82%)", // Rose blush
    "hsl(350, 90%, 92%)", // Very light pink
    "hsl(0, 65%, 88%)", // Soft coral pink
  ];

  useEffect(() => {
    // Create 35 hearts instead of just a few - significantly more romantic atmosphere
    const newHearts: Heart[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 12, // 8-20 seconds (varied speeds)
      animationDelay: Math.random() * 8, // Stagger the start times
      size: 12 + Math.random() * 20, // 12-32px (varied sizes)
      opacity: 0.15 + Math.random() * 0.35, // 0.15-0.5 (soft, gentle presence)
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.animationDelay}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            color: heart.color,
            filter: "blur(0.5px)", // Soft glow effect
            textShadow: `0 0 8px ${heart.color}, 0 0 12px ${heart.color}`,
          }}
        >
          ♥
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--heart-opacity, 0.3);
          }
          90% {
            opacity: var(--heart-opacity, 0.3);
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? "" : "-"}${20 + Math.random() * 30}px) rotate(${-15 + Math.random() * 30}deg);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
