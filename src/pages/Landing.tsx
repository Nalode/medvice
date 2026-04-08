import { motion } from 'framer-motion';
import DNABackground from '../components/DNABackground';
import FloatingParticles from '../components/FloatingParticles';
import HospitalGrid from '../components/HospitalGrid';
import SpecialtiesSearch from '../components/SpecialtiesSearch';
import TrustBlock from '../components/TrustBlock';
import { ArrowRight } from 'lucide-react';


export default function Landing() {
  
  // Staggered text animation logic
  const headingText = "L'information médicale en Algérie était éparpillée. Nous l'avons enfin rassemblée.";
  const headingWords = headingText.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans bg-[#0B132B]">
      
      {/* Top Center God-Rays / Light Spill Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-cyan/20 via-brand-cyan/5 to-transparent mix-blend-screen pointer-events-none z-10" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
        
        {/* Typography & CTA */}
        <div className="z-30 max-w-[1000px] mx-auto flex flex-col items-center mt-[-10vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md text-brand-cyan border border-brand-cyan/20 rounded-full text-[0.65rem] font-bold tracking-widest uppercase mb-8 shadow-xl"
          >
            PLATEFORME D'ORIENTATION MÉDICALE
          </motion.div>
          
          {/* Staggered Heading */}
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white text-center leading-[1.2] mb-8"
          >
            {headingWords.map((word, index) => {
              // Special gradient logic for the last word
              if(word.includes("rassemblée")) {
                return (
                  <motion.span key={index} variants={wordVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan drop-shadow-[0_0_15px_rgba(128,255,219,0.4)] mr-3">
                    {word}
                  </motion.span>
                );
              }
              return (
                <motion.span key={index} variants={wordVariants} className="inline-block mr-3">
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-[#E0E1E6] font-sans text-center text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-[1.6]"
          >
            Entre les groupes Facebook saturés, les rumeurs de couloir et les appels anonymes, choisir sa spécialité était un parcours du combattant. Medvice change la donne en centralisant les témoignages, les réalités de terrain et les conditions de garde de chaque CHU sur une plateforme unique, transparente et accessible à chaque futur résident.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2, type: "spring" }}
            className="flex justify-center w-full relative z-40"
          >
            <a href="#specialties" onClick={(e) => { e.preventDefault(); document.getElementById('specialties')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <button className="bg-brand-blue hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full flex items-center transition-all group shadow-[0_0_30px_rgba(58,134,255,0.4)] hover:shadow-[0_0_40px_rgba(128,255,219,0.7)] hover:-translate-y-1">
                Explorez les spécialités
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </a>
          </motion.div>
        </div>

        {/* Motion DNA Background & Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
           <DNABackground />
           <FloatingParticles count={45} className="z-20 mix-blend-screen" />
           {/* Dark gradient overlay to blend into the grid below */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B132B]/50 to-[#0B132B] pointer-events-none z-30" />
        </div>

      </section>

      {/* Hospital Bento Grid Section */}
      <section className="relative z-30 pb-32 pt-16 bg-[#0B132B] overflow-hidden">
        
        {/* Deep blue background particles for ambiance */}
        <FloatingParticles count={60} className="z-0 mix-blend-screen opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md mb-6"
          >
            Explorez les Établissements
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 max-w-2xl mx-auto text-xl"
          >
            Découvrez tous les centres hospitaliers universitaires affilié à la faculté de médecine Blida.
          </motion.p>
        </div>
        
        <div className="relative z-10">
          <HospitalGrid />
        </div>
      </section>

      {/* No transition gradient - hard cut to clear aesthetic */}

      {/* Specialties Search Section */}
      <div id="specialties" className="relative z-40 bg-[#F8FAFC]">
         <SpecialtiesSearch />
      </div>

      {/* Trust & Testimonial Footer Section */}
      <div className="relative z-40 bg-[#F8FAFC]">
         <TrustBlock />
      </div>
      
    </div>
  );
}
