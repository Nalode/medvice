import { motion } from 'framer-motion';
import { Stethoscope, Heart, Activity, Brain, Syringe, Pill, Dna, Microscope, Eye, Bone, Baby, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OrbitalAnimation() {
  // 12 Medical Icons Spread Across 4 Distinct Rings
  const orbits = [
    // Ring 1 (Inner) - Radius 250
    { radius: 250, duration: 40, icon: Heart, size: 24, initialRotation: 0 },
    { radius: 250, duration: 40, icon: Brain, size: 24, initialRotation: 120 },
    { radius: 250, duration: 40, icon: Dna, size: 24, initialRotation: 240 },
    
    // Ring 2 - Radius 400
    { radius: 400, duration: 55, icon: Pill, size: 28, initialRotation: 45 },
    { radius: 400, duration: 55, icon: Syringe, size: 28, initialRotation: 165 },
    { radius: 400, duration: 55, icon: Shield, size: 28, initialRotation: 285 },
    
    // Ring 3 - Radius 550
    { radius: 550, duration: 75, icon: Microscope, size: 30, initialRotation: 90 },
    { radius: 550, duration: 75, icon: Eye, size: 30, initialRotation: 210 },
    { radius: 550, duration: 75, icon: Bone, size: 30, initialRotation: 330 },
    
    // Ring 4 (Outer) - Radius 700
    { radius: 700, duration: 100, icon: Activity, size: 32, initialRotation: 30 },
    { radius: 700, duration: 100, icon: Baby, size: 32, initialRotation: 150 },
    { radius: 700, duration: 100, icon: Stethoscope, size: 32, initialRotation: 270 },
  ];

  const ringRadii = [250, 400, 550, 700];
  
  // High density dust particles based on inspo 2
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, duration: number, delay: number, size: number}>>([]);
  
  useEffect(() => {
    const p = [];
    // 150 tiny dust particles for a dense, starry SaaS background
    for(let i=0; i<150; i++) {
       p.push({
         id: i,
         x: Math.random() * 100,
         y: Math.random() * 100,
         duration: 20 + Math.random() * 40,
         delay: Math.random() * 10,
         size: Math.random() * 2 + 0.5 // Very small speckles
       });
    }
    setParticles(p);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} 
      className="relative w-full h-full flex items-center justify-center pt-[5vh] overflow-visible"
      style={{
        // Linear gradient mask to blend seamlessly into the bottom sections
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
      }}
    >
      
      {/* High Density Speckle Particles */}
      <div className="absolute inset-0 z-0 opacity-60">
         {particles.map(p => (
           <motion.div 
             key={p.id}
             className="absolute bg-brand-cyan/80 rounded-full mix-blend-screen shadow-[0_0_5px_rgba(128,255,219,0.5)]"
             style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
             animate={{
               y: ["0%", "-30vh", "10vh"],
               x: ["0%", "10px", "-10px"],
               opacity: [0, 1, 0]
             }}
             transition={{
               duration: p.duration,
               repeat: Infinity,
               ease: "linear",
               delay: p.delay
             }}
           />
         ))}
      </div>

      {/* Central Core Identity */}
      <div className="relative z-30 flex items-center justify-center w-40 h-40 rounded-[2rem] bg-[#11163A]/80 border border-brand-blue/50 shadow-[0_0_80px_rgba(58,134,255,0.5)] backdrop-blur-3xl">
        <Stethoscope className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
      </div>

      {/* Pulsing Concentric Rings */}
      {ringRadii.map((radius, index) => (
        <motion.div 
          key={`ring-${radius}`}
          className="absolute top-1/2 left-1/2 rounded-[40%] border border-brand-blue/40 mix-blend-screen shadow-[inset_0_0_20px_rgba(58,134,255,0.1)]"
          style={{ width: radius * 2, height: radius * 2, transform: 'translate(-50%, -50%)' }}
          animate={{
             opacity: index === 0 ? [0.6, 1, 0.6] : index === 1 ? [0.4, 0.8, 0.4] : index === 2 ? [0.2, 0.5, 0.2] : [0.1, 0.3, 0.1],
             scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Orbiting Icons */}
      {orbits.map((orbit, i) => (
        <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)', width: orbit.radius * 2, height: orbit.radius * 2 }}>
          {/* Group wrapper handling the rotation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ rotate: orbit.initialRotation }}
            animate={{ rotate: orbit.initialRotation + 360 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* The icon container holding its upright orientation */}
            <motion.div 
              className="absolute flex flex-col items-center justify-center"
              style={{
                top: 0, 
                left: '50%',
                transform: `translate(-50%, -50%)`,
                width: orbit.size * 2.5,
                height: orbit.size * 2.5,
              }}
              animate={{ rotate: -(orbit.initialRotation + 360) }}
              transition={{
                duration: orbit.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Glow Trail Element */}
              <div className="absolute top-1/2 left-1/2 w-full h-full bg-brand-cyan/20 blur-[15px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Actual Icon Container */}
              <div className="relative bg-[#11163A]/80 border border-brand-cyan/50 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(128,255,219,0.4)] backdrop-blur-xl w-full h-full hover:scale-110 hover:border-white transition-all">
                <orbit.icon 
                  className="text-brand-cyan drop-shadow-[0_0_10px_rgba(128,255,219,0.8)]"
                  size={orbit.size} 
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
