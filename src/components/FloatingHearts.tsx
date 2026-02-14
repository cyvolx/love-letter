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

  // Beautiful romantic heart colors - soft pinks, blush, rose
  const heartColors = [
    "rgba(255, 182, 193, 0.7)", // Light pink
    "rgba(255, 192, 203, 0.8)", // Pink
    "rgba(255, 160, 180, 0.7)", // Soft rose
    "rgba(255, 218, 224, 0.6)", // Blush
    "rgba(255, 105, 135, 0.5)", // Deep rose
    "rgba(253, 185, 200, 0.7)", // Pastel pink
    "rgba(255, 228, 225, 0.8)", // Misty rose
    "rgba(255, 209, 220, 0.6)", // Cotton candy
  ];

  useEffect(() => {
    // Generate significantly more hearts (60 total for rich romantic atmosphere)
    const generatedHearts: Heart[] = [];
    for (let i = 0; i < 60; i++) {
      generatedHearts.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position
        animationDuration: 8 + Math.random() * 12, // 8-20 seconds (varied speeds)
        animationDelay: Math.random() * 8, // Staggered start
        size: 12 + Math.random() * 20, // 12-32px variety
        opacity: 0.3 + Math.random() * 0.5, // 0.3-0.8 opacity
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
      });
    }
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.animationDelay}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            color: heart.color,
            filter: "drop-shadow(0 0 8px rgba(255, 192, 203, 0.4))", // Soft glow
            textShadow: "0 0 10px rgba(255, 192, 203, 0.5)", // Additional glow
          }}
        >
          ♥
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 60 - 30}px) rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4});
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
          --opacity: ${0.3 + Math.random() * 0.5};
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
