import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Bookmark, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Specialty } from '../types/database';

// Map specific specialties to accurate PNG icons
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
  if (nameL.includes('pédiatrie') && !nameL.includes('chirurgie')) return '/icons/playtime.png'; // to avoid overriding chirurgie pédiatrique
  if (nameL.includes('parasito')) return '/icons/parasite.png';
  if (nameL.includes('rhumato')) return '/icons/pain-in-joints.png';
  
  return null;
};

// Fallback emoji map
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

export default function SpecialtiesSearch() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Toutes');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const { data, error } = await supabase
          .from('specialties')
          .select('*');
        if (error) throw error;
        setSpecialties(data || []);
      } catch (err) {
        console.error('Error fetching specialties:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSpecialties();
  }, []);
  
  const categories = [
    { id: 'Toutes', label: 'Toutes' },
    { id: 'medical', label: 'Médicales' },
    { id: 'surgical', label: 'Chirurgicales' },
    { id: 'biological', label: 'Biologiques' }
  ];

  const filteredSpecialties = specialties.filter(sp => {
    const matchesSearch = sp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Toutes' || sp.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayItems = showAll ? filteredSpecialties : filteredSpecialties.slice(0, 9);

  return (
    <div className="w-full bg-[#F8FAFC] py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-[#3A86FF] uppercase bg-[#3A86FF]/10 px-4 py-1.5 rounded-full mb-6"
          >
            Spécialités
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1B243B] max-w-4xl"
          >
            En une recherche <span className="text-[#3A86FF]">trouvez l'information</span> qui vous manque
          </motion.h2>
        </div>

        {/* Search Bar & Categories */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="relative flex items-center w-full h-16 rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden focus-within:ring-4 focus-within:ring-[#3A86FF]/20 focus-within:border-[#3A86FF] transition-all duration-300">
            <div className="grid place-items-center h-full w-16 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              className="peer h-full w-full outline-none text-gray-800 text-lg font-medium placeholder-gray-400 bg-transparent pr-6"
              type="text"
              id="search"
              placeholder="Rechercher une spécialité, domaine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                   setActiveCategory(cat.id);
                   setShowAll(false);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.id 
                  ? 'bg-brand-blue text-white shadow-[0_8px_25px_rgba(58,134,255,0.4)] -translate-y-1' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-blue animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Chargement des spécialités...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {displayItems.map((sp, i) => (
              <motion.div
                layout
                key={sp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="relative bg-white border border-gray-200/60 rounded-[1.5rem] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(58,134,255,0.12)] hover:border-brand-blue/30 hover:-translate-y-2 transition-all duration-500 flex flex-col group cursor-pointer overflow-hidden z-10"
                onClick={() => {
                  navigate(`/specialty/${encodeURIComponent(sp.name)}`);
                }}
              >
                {/* Subtle accent hover bar on top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-cyan transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-[1rem] bg-[#F8FAFC] flex items-center justify-center border border-gray-100 text-3xl group-hover:scale-110 group-hover:bg-brand-blue/5 group-hover:border-brand-blue/20 transition-all duration-300 shadow-sm">
                    {getIconUrl(sp.name) ? (
                      <img src={getIconUrl(sp.name) as string} alt={sp.name} className="w-9 h-9 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      getEmojiFallback(sp.name, sp.type)
                    )}
                  </div>
                  <div className="text-[0.7rem] font-bold tracking-widest uppercase text-brand-blue bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] px-4 py-2 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    {sp.type === 'medical' ? 'Médicale' : sp.type === 'surgical' ? 'Chirurgicale' : 'Biologique'}
                  </div>
                </div>

                <h3 className="font-sans font-extrabold text-[1.4rem] text-[#0B132B] mb-4 group-hover:text-brand-blue transition-colors leading-[1.3]">{sp.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-grow pr-4">
                  {sp.description || `Explorez les postes et les informations détaillées pour la spécialité de ${sp.name.toLowerCase()}.`}
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 mt-6 pt-4">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="flex items-center text-sm font-bold text-[#0B132B] group-hover:text-brand-blue transition-colors">
                    Découvrir les postes
                    <span className="flex items-center justify-center w-8 h-8 ml-2 rounded-full bg-[#0B132B] text-white group-hover:bg-brand-blue transition-colors group-hover:translate-x-1 duration-300">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Show More Logic - Only display if not showing all AND items exist > 9 */}
        {!showAll && !loading && filteredSpecialties.length > 9 && (
           <div className="mt-16 text-center">
             <button 
               onClick={() => setShowAll(true)}
               className="font-bold text-[#1E293B] hover:text-brand-blue hover:bg-gray-50 transition-all px-8 py-4 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-lg"
             >
               Afficher le reste ({filteredSpecialties.length - 9} spécialités)
             </button>
           </div>
        )}
        
        {!loading && filteredSpecialties.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium text-lg">
            Aucun résultat trouvé pour votre recherche "{searchTerm}"
          </div>
        )}

      </div>
    </div>
  );
}

