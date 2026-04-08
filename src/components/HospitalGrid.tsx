import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Hospital } from '../types/database';

export default function HospitalGrid() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*');
        
        if (error) throw error;
        setHospitals(data || []);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-brand-cyan animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Chargement des établissements...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {hospitals.map((hospital, i) => (
          <motion.div
            key={hospital.id}
            onClick={() => navigate(`/hospital/${hospital.id}`)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            className={`relative z-10 bg-[#0B132B]/80 backdrop-blur-xl border border-brand-blue/20 rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_0_0_rgba(58,134,255,0)] hover:shadow-[0_20px_50px_rgba(58,134,255,0.2)] hover:border-brand-cyan/50 ${
              i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 via-transparent to-brand-blue/0 group-hover:from-brand-cyan/10 group-hover:to-brand-blue/10 transition-colors duration-500 z-0 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-[#11163A] to-[#1E293B] flex items-center justify-center rounded-2xl border border-white/10 group-hover:border-brand-cyan/40 shadow-inner transition-all duration-500">
                  <MapPin className="w-7 h-7 text-white group-hover:text-brand-cyan group-hover:scale-110 transition-all duration-300" />
                </div>
                <div className="p-2 border border-brand-blue/20 rounded-full group-hover:bg-brand-cyan group-hover:border-brand-cyan transition-colors duration-300">
                  <ArrowUpRight className="text-brand-blue group-hover:text-[#0B132B] w-5 h-5 transition-colors" />
                </div>
              </div>
              <h3 className="font-serif text-[2.1rem] leading-tight font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all">
                {hospital.name}
              </h3>
              <p className="text-brand-cyan/80 text-lg font-medium">{hospital.city}</p>
            </div>
            
            <div className="mt-10 relative z-10 pt-6 border-t border-white/10 group-hover:border-brand-blue/30 transition-colors duration-500">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-brand-cyan" />
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">Services Majeurs</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {hospital.specialties?.slice(0, 4).map(sp => (
                  <span key={sp} className="px-4 py-2 bg-[#11163A]/80 text-slate-200 text-xs font-bold rounded-lg border border-brand-blue/10 group-hover:border-brand-cyan/20 transition-colors shadow-sm">
                    {sp.charAt(0).toUpperCase() + sp.slice(1)}
                  </span>
                ))}
                {hospital.specialties?.length > 4 && (
                  <span className="px-4 py-2 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 text-brand-cyan border border-brand-blue/30 text-xs font-extrabold rounded-lg shadow-[0_0_15px_rgba(58,134,255,0.2)]">
                    +{hospital.specialties.length - 4} domaines
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

