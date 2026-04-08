import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function FloatingParticles({ count = 30, className = "" }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      return {
        id: i,
        // Small, elegant dust particles
        size: Math.random() * 3 + 1, 
        left: Math.random() * 100,
        initialTop: Math.random() * 100,
        // Slow float
        duration: Math.random() * 20 + 20, 
        // Random start offset so they don't all spawn at once
        delay: Math.random() * -20,
        // Slight horizontal drift
        drift: Math.random() * 60 - 30,
      };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-cyan/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.initialTop}%`,
            boxShadow: `0 0 ${p.size * 2}px rgba(58,134,255,0.4)`,
          }}
          animate={{
            // Drift upward
            y: [0, -1000],
            // Drift horizontally
            x: [0, p.drift],
            // Pulse opacity slightly as they float
            opacity: [0, Math.random() * 0.5 + 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
