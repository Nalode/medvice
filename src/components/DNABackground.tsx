import { motion } from 'framer-motion';

export default function DNABackground() {
  const segments = Array.from({ length: 45 });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none transform -rotate-[15deg] scale-150 opacity-40">
      <svg className="w-full h-full min-w-[1200px]" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dnaGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#3A86FF" stopOpacity="0.8" />
             <stop offset="100%" stopColor="#80FFDB" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Floating background particles for additional motion */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            r={Math.random() * 2 + 1}
            fill="#80FFDB"
            opacity={0.5}
            initial={{ 
              cx: Math.random() * 1000, 
              cy: Math.random() * 400 
            }}
            animate={{ 
              cy: [Math.random() * 400, Math.random() * 400 - 100, Math.random() * 400] 
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        <g stroke="url(#dnaGrad1)">
          {segments.map((_, i) => {
             const x = (i / 45) * 1000;
             const delay = i * 0.12;
             const amplitude = 90;
             const yCenter = 200;
             
             return (
               <g key={`strand-${i}`}>
                 {/* Connecting Hydrogen Bonds */}
                 <motion.line 
                   x1={x} x2={x}
                   strokeDasharray="2 2"
                   initial={{ y1: yCenter, y2: yCenter }}
                   animate={{
                     y1: [yCenter - amplitude, yCenter + amplitude, yCenter - amplitude],
                     y2: [yCenter + amplitude, yCenter - amplitude, yCenter + amplitude]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
                   strokeWidth="1"
                   opacity={0.4}
                 />
                 
                 {/* Strand 1 */}
                 <motion.circle 
                   cx={x}
                   r="4"
                   fill="#80FFDB"
                   initial={{ cy: yCenter }}
                   animate={{ 
                     cy: [yCenter - amplitude, yCenter + amplitude, yCenter - amplitude],
                     scale: [1, 0.6, 1], // Pseudo-3D depth effect
                     opacity: [1, 0.5, 1]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
                   style={{ originX: "50%", originY: "50%" }}
                 />
                 
                 {/* Strand 2 */}
                 <motion.circle 
                   cx={x}
                   r="4.5"
                   fill="#3A86FF"
                   initial={{ cy: yCenter }}
                   animate={{ 
                     cy: [yCenter + amplitude, yCenter - amplitude, yCenter + amplitude],
                     scale: [0.6, 1, 0.6], // Opposing depth effect
                     opacity: [0.5, 1, 0.5]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
                   style={{ originX: "50%", originY: "50%" }}
                 />
               </g>
             );
          })}
        </g>
      </svg>
    </div>
  );
}
