import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MessageSquare, ChevronRight } from 'lucide-react';
import DNABackground from '../components/DNABackground';
import { hospitalsData, testimonialsData, servicesData } from '../data/mockData';

// Re-using Icon mapping for consistency
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

const getEmojiFallback = (name: string, type: string) => {
  const nameL = name.toLowerCase();
  if (nameL.includes('cardio') || nameL.includes('cardiaque')) return '🫀';
  if (nameL.includes('neuro') || nameL.includes('psy')) return '🧠';
  if (nameL.includes('ophtalmo')) return '👁️';
  if (nameL.includes('pneumo')) return '🫁';
  if (nameL.includes('ortho')) return '🦴';
  if (nameL.includes('anesthésie')) return '⚡';
  if (nameL.includes('radio') || nameL.includes('imagerie')) return '☢️';
  if (nameL.includes('onco')) return '🎗️';
  if (nameL.includes('pharmaco')) return '💊';
  if (type === 'surgical') return '🔪';
  if (type === 'biological') return '🧪';
  return '🩺';
};

export default function HospitalDetails() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();

  const hospital = hospitalsData.find(h => h.id === hospitalId);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center text-white text-2xl font-serif">
        <ArrowLeft className="mr-4 cursor-pointer" onClick={() => navigate(-1)} />
        CHU introuvable
      </div>
    );
  }

  // Dashboard Data Aggregation
  const hospitalReviews = testimonialsData.filter(t => t.hospitalName === hospital.name);
  const avgRating = hospitalReviews.length > 0 
      ? (hospitalReviews.reduce((acc, curr) => acc + curr.rating, 0) / hospitalReviews.length).toFixed(1)
      : '0.0';

  const localServices = servicesData.filter(s => s.hospitalId === hospital.id);

  const medCount = localServices.filter(s => s.type === 'medical').length;
  const surgCount = localServices.filter(s => s.type === 'surgical').length;
  const bioCount = localServices.filter(s => s.type === 'biological').length;
  const totalSpecs = medCount + surgCount + bioCount;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      
      {/* Dark Atmospheric Hero */}
      <section className="relative w-full bg-[#0B132B] overflow-hidden rounded-b-[3rem] shadow-xl">
        
        {/* DNA Animation & Lights - Correctly Contained */}
        <div className="absolute inset-0 z-0 opacity-60 overflow-hidden pointer-events-none w-full h-full">
           <DNABackground />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-cyan/20 via-transparent to-transparent pointer-events-none z-10" />

        {/* Content Wrapper for exact positioning without overlaps */}
        <div className="relative z-30 flex flex-col items-center justify-center min-h-[45vh] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
          
          {/* Top Navigation Row */}
          <div className="w-full flex justify-start mb-12">
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Retour aux établissements</span>
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[0.65rem] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
               Profil de l'établissement
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.2] max-w-4xl mx-auto">
              Explorer les Services de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#80FFDB] to-[#3A86FF]">
                {hospital.name}
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-40">
        
        {/* Immediate Dashboard Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            
            {/* Avg Rating */}
            <div className="flex flex-col justify-center items-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
              <span className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-2">Note Globale</span>
              <div className="text-5xl font-sans font-extrabold text-[#0B132B] mb-3">{avgRating}</div>
              <div className="flex space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star 
                     key={star} 
                     className={`w-5 h-5 ${parseFloat(avgRating) >= star ? 'text-[#3A86FF] fill-[#3A86FF]' : 'text-gray-200'}`} 
                   />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-500">{hospitalReviews.length} témoignages vérifiés</span>
            </div>

            {/* Metrics */}
            <div className="flex flex-col space-y-4">
               <div className="flex justify-between items-center bg-[#F8FAFC] p-5 rounded-xl border border-gray-100">
                 <span className="text-sm font-semibold text-gray-500">Ville</span>
                 <span className="font-bold text-[#0B132B]">{hospital.city}</span>
               </div>
               <div className="flex justify-between items-center bg-brand-cyan/10 p-5 rounded-xl border border-brand-cyan/20">
                 <span className="text-sm font-bold text-brand-blue">Total Services Différents</span>
                 <span className="text-xl font-extrabold text-brand-blue">{totalSpecs}</span>
               </div>
            </div>

            {/* Distribution Chart */}
            <div className="space-y-4 flex flex-col justify-center pl-4 border-l border-gray-100">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500 uppercase tracking-wider">Médical</span>
                  <span className="text-[#3A86FF]">{Math.round((medCount / totalSpecs) * 100) || 0}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3A86FF] rounded-full" style={{ width: `${(medCount / totalSpecs) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500 uppercase tracking-wider">Chirurgical</span>
                  <span className="text-[#0B132B]">{Math.round((surgCount / totalSpecs) * 100) || 0}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0B132B] rounded-full" style={{ width: `${(surgCount / totalSpecs) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500 uppercase tracking-wider">Biologique</span>
                  <span className="text-[#80FFDB]">{Math.round((bioCount / totalSpecs) * 100) || 0}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#80FFDB] rounded-full" style={{ width: `${(bioCount / totalSpecs) * 100}%` }} />
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>

        {/* Clean Vertical List of Specialties */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0B132B] mb-6">Répertoire des Services</h2>
          
          <div className="flex flex-col space-y-3">
            {localServices.map((sp, i) => {
              if (!sp) return null;
              
              const spReviews = hospitalReviews.filter(r => r.serviceName === sp.serviceName);

              return (
                <motion.div
                  key={sp.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/hospital/${hospital.id}/service/${encodeURIComponent(sp.serviceName)}`);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="bg-white border border-gray-200/60 rounded-2xl p-4 sm:p-5 flex items-center justify-between group cursor-pointer hover:border-[#3A86FF]/40 hover:shadow-[0_10px_20px_rgba(58,134,255,0.06)] transition-all duration-300"
                >
                  
                  {/* Icon & Name */}
                  <div className="flex items-center flex-1 space-x-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center group-hover:bg-brand-cyan/5 transition-colors">
                       {getIconUrl(sp.specialtyName) ? (
                         <img src={getIconUrl(sp.specialtyName) as string} alt={sp.specialtyName} className="w-6 h-6 object-contain" />
                       ) : (
                         <span className="text-xl">{getEmojiFallback(sp.specialtyName, sp.type)}</span>
                       )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B132B] text-lg leading-none mb-1.5 group-hover:text-[#3A86FF] transition-colors">{sp.serviceName}</h3>
                      <div className="text-[0.65rem] font-bold tracking-widest uppercase text-gray-400">
                        {sp.specialtyName} • {sp.type === 'medical' ? 'Médicale' : sp.type === 'surgical' ? 'Chirurgicale' : 'Biologique'}
                      </div>
                    </div>
                  </div>

                  {/* Right Side Logic */}
                  <div className="flex items-center space-x-6">
                    <div className="hidden sm:flex items-center px-4 py-1.5 bg-[#F8FAFC] border border-gray-100 rounded-full">
                      <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-semibold text-gray-600">{spReviews.length} avis recueillis</span>
                    </div>
                    
                    <button className="flex items-center text-sm font-bold text-gray-400 group-hover:text-[#3A86FF] transition-colors">
                      <span className="hidden sm:inline">Consulter</span>
                      <div className="w-8 h-8 ml-3 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#3A86FF] group-hover:text-white transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
