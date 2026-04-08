import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ChevronLeft, ChevronRight, User, MapPin, Building, ChevronDown, Activity, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Testimonial, Hospital, Specialty } from '../types/database';
import FloatingParticles from '../components/FloatingParticles';

// Re-using Icon mapping for consistency inside the card
const getIconUrl = (name: string) => {
  const nameL = name.toLowerCase();
  if (nameL.includes('maxillo')) return '/icons/skull.png';
  if (nameL.includes('chirurgie pédiatrique')) return '/icons/children.png';
  if (nameL.includes('urologique')) return '/icons/kidney-surgery.png';
  if (nameL.includes('vasculaire')) return '/icons/biology.png';
  if (nameL.includes('viscérale')) return '/icons/abs.png';
  if (nameL.includes('epidémiologie') || nameL.includes('épidemiologie')) return '/icons/search.png';
  if (nameL.includes('gyneco') || nameL.includes('gynéco')) return '/icons/gynecology.png';
  if (nameL.includes('hématologie') || nameL.includes('hematologie')) return '/icons/blood.png';
  if (nameL.includes('hémobiologie') || nameL.includes('hemobiologie')) return '/icons/blood.png';
  if (nameL.includes('hépato') || nameL.includes('gastro')) return '/icons/intestine.png';
  if (nameL.includes('immuno')) return '/icons/antibodies.png';
  if (nameL.includes('urgence')) return '/icons/emergency-call.png';
  if (nameL.includes('légal') || nameL.includes('legal')) return '/icons/balance.png';
  if (nameL.includes('nephro') || nameL.includes('néphro')) return '/icons/nephrology.png';
  if (nameL.includes('oto-rhino') || nameL.includes('orl')) return '/icons/ear.png';
  if (nameL.includes('pédiatrie') && !nameL.includes('chirurgie')) return '/icons/playtime.png'; 
  if (nameL.includes('parasito')) return '/icons/parasite.png';
  if (nameL.includes('rhumato')) return '/icons/pain-in-joints.png';
  return null;
};

export default function TestimonialsPage() {
  const { specialtyName, hospitalId, serviceName } = useParams();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left
  
  // Data States
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  // Custom Fast Travel Dropdown State
  const [showFastTravel, setShowFastTravel] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFastTravel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine Entry Point Context
  const isGlobalMode = !!specialtyName;
  const decodeSpecialty = specialtyName ? decodeURIComponent(specialtyName) : "";
  const decodeService = serviceName ? decodeURIComponent(serviceName) : "";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch specialties for dropdown and hospitals for lookup
        const [specRes, hospRes] = await Promise.all([
          supabase.from('specialties').select('*'),
          supabase.from('hospitals').select('*')
        ]);

        if (specRes.error) throw specRes.error;
        if (hospRes.error) throw hospRes.error;

        setSpecialties(specRes.data || []);
        setHospitals(hospRes.data || []);

        // Fetch filtered testimonials
        let query = supabase.from('testimonials').select('*');

        if (isGlobalMode) {
          query = query.ilike('serviceName', decodeSpecialty);
        } else if (hospitalId && decodeService) {
          query = query.eq('hospital_id', hospitalId).ilike('serviceName', decodeService);
        }

        const { data: tData, error: tErr } = await query;
        if (tErr) throw tErr;

        setTestimonials(tData || []);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Error fetching testimonials data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isGlobalMode, decodeSpecialty, hospitalId, decodeService]);

  const currentHospital = hospitalId ? hospitals.find(h => h.id === hospitalId) : null;
  const activeModeTitle = isGlobalMode ? decodeSpecialty : decodeService;
  const backText = isGlobalMode ? "Retour aux spécialités" : `Retour au ${currentHospital?.name || 'CHU'}`;
  const backRoute = isGlobalMode ? '/' : `/hospital/${hospitalId}`;

  // Framer Motion Carousel Variants
  const slideVariants = {
    hiddenRight: { x: 50, opacity: 0 },
    hiddenLeft: { x: -50, opacity: 0 },
    visible: { 
      x: 0, opacity: 1, 
      transition: { type: "tween" as const, ease: "circOut" as const, duration: 0.6 } 
    },
    exit: { opacity: 0, transition: { duration: 0.3 } } // Crossfade exit
  };

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 text-brand-cyan animate-spin mb-4" />
        <p className="text-slate-400 font-medium text-center px-4">Récupération des témoignages en cours...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B] flex flex-col font-sans overflow-x-hidden pt-24 pb-16 relative">
      
      {/* Immersive background glow and particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[70vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-cyan/10 via-[#0B132B]/0 to-transparent pointer-events-none z-0" />
      <FloatingParticles count={60} className="z-0 mix-blend-screen opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 flex-grow flex flex-col">
        
        {/* Navigation & Header Space */}
        <div className="flex flex-col items-start mb-10 w-full relative z-30">
          
          <button 
            onClick={() => navigate(backRoute)}
            className="group flex items-center space-x-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-slate-300 text-sm font-medium transition-all mb-8 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-brand-cyan group-hover:-translate-x-1 transition-transform" />
            <span>{backText}</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between w-full space-y-6 md:space-y-0 relative">
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
                Témoignages : <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#80FFDB]">{activeModeTitle}</span>
              </h1>
              <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-slate-400">
                L'EXPÉRIENCE VÉCUE AU CŒUR DE L'ÉLITE MÉDICALE ALGÉRIENNE
              </p>
            </div>

            {/* Fast Travel Quick Switch */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowFastTravel(!showFastTravel)}
                className="flex items-center space-x-3 px-6 py-3.5 bg-[#11163A]/80 hover:bg-[#1E293B]/80 backdrop-blur-md border border-brand-cyan/20 rounded-xl shadow-lg transition-all"
              >
                <Activity className="w-4 h-4 text-brand-cyan" />
                <span className="text-sm font-bold text-white">Changer de Service / CHU</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              <AnimatePresence>
                {showFastTravel && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-3 w-72 bg-[#11163A] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 flex flex-col max-h-80 custom-scrollbar overflow-y-auto"
                  >
                    <div className="px-4 py-3 bg-white/5 border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 backdrop-blur-md">
                      Toutes les Spécialités
                    </div>
                    {specialties.map(sp => (
                      <button 
                        key={sp.id}
                        onClick={() => {
                          setShowFastTravel(false);
                          navigate(`/specialty/${encodeURIComponent(sp.name)}`);
                        }}
                        className="w-full text-left px-5 py-3.5 hover:bg-white/5 text-slate-300 font-medium transition-colors border-b border-white/5 last:border-0"
                      >
                        {sp.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {testimonials.length === 0 ? (
          <div className="flex-grow flex items-center justify-center min-h-[40vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
            <div className="text-center">
              <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-white mb-2">Aucun témoignage disponible</h2>
              <p className="text-slate-400">Pour l'instant, aucun retour n'a été déposé pour ce service.</p>
            </div>
          </div>
        ) : (
          
          /* Carousel Layout Structure */
          <div className="flex-grow flex flex-col items-center justify-center w-full relative z-20 min-h-[50vh]">
            
            {/* Left Prev Control (Absolute to overall container) */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 md:-left-12 xl:-left-24 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg z-40 hidden sm:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Control */}
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 md:-right-12 xl:-right-24 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg z-40 hidden sm:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Cinematic Card Container */}
            <div className="w-full max-w-4xl relative min-h-[400px]">
              <AnimatePresence mode="wait" custom={direction}>
                 <motion.div
                   key={currentIndex}
                   custom={direction}
                   variants={slideVariants}
                   initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
                   animate="visible"
                   exit="exit"
                   className="w-full bg-[#11163A]/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-[2rem] overflow-hidden flex flex-col"
                 >
                    {/* Card Dual-Header Segment */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between bg-white/5 border-b border-white/10 p-6 sm:p-8 space-y-6 md:space-y-0 relative">
                       
                       {/* Left Header: Author Profile */}
                       <div className="flex items-center space-x-4">
                         <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-inner">
                            {getIconUrl(currentTestimonial.serviceName) ? (
                               <img src={getIconUrl(currentTestimonial.serviceName) as string} alt="Icon" className="w-7 h-7 object-contain opacity-90" />
                            ) : (
                               <User className="w-6 h-6 text-slate-300" />
                            )}
                         </div>
                         <div>
                           <h3 className="font-bold text-xl text-white tracking-wide">
                             {currentTestimonial.authorName || 'Anonyme'}
                           </h3>
                           <p className="text-sm font-medium text-slate-400">
                             Résident de {currentTestimonial.year || '?'} Année
                           </p>
                         </div>
                       </div>

                       {/* Right Header: Verified Layout (Mandatory Schema) */}
                       <div className="flex flex-col items-start md:items-end space-y-3">
                          <div className="inline-flex items-center px-4 py-1.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg text-xs font-bold text-brand-cyan shadow-[0_0_15px_rgba(128,255,219,0.15)]">
                            Service: {currentTestimonial.serviceName}
                          </div>
                          <div className="flex items-center space-x-2 text-white">
                            <Building className="w-4 h-4 text-brand-blue" />
                            <span className="font-sans font-bold text-[0.95rem] tracking-wide">{currentTestimonial.hospitalName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-400">
                             <MapPin className="w-3.5 h-3.5" />
                             <span className="text-xs font-bold uppercase tracking-wider">
                               { (hospitals.find(h => h.name === currentTestimonial.hospitalName)?.city || currentHospital?.city || "Algérie") + ", Algérie" }
                             </span>
                          </div>
                          
                          {/* 5-Star Cyan Visualizer */}
                          <div className="flex space-x-1 pt-1 opacity-90">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= currentTestimonial.rating ? 'fill-brand-cyan text-brand-cyan shadow-[0_0_10px_rgba(128,255,219,0.5)]' : 'text-white/20'}`} />
                            ))}
                          </div>
                       </div>
                    </div>

                    {/* Card Long-Form Body Area */}
                    <div className="p-6 sm:p-10 md:p-12 text-slate-300 font-sans text-lg leading-[1.8] font-medium custom-scrollbar max-h-[50vh] overflow-y-auto">
                       {currentTestimonial.content}
                    </div>

                 </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Dash Pagination Tracker */}
            <div className="mt-12 flex flex-col items-center justify-center space-y-4">
              <div className="flex space-x-2.5">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                       setDirection(idx > currentIndex ? 1 : -1);
                       setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-brand-cyan shadow-[0_0_8px_rgba(128,255,219,0.6)]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
              <div className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-slate-400">
                {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')} TÉMOIGNAGES
              </div>
              
              {/* Mobile Only Controls */}
              <div className="flex space-x-6 mt-4 sm:hidden">
                 <button onClick={prevTestimonial} className="p-3 bg-white/10 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
                 <button onClick={nextTestimonial} className="p-3 bg-white/10 rounded-full text-white"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

