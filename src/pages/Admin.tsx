import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, CheckCircle2, AlertCircle, LogOut, 
  Building2, Stethoscope, User, GraduationCap, 
  Star, MessageSquare, PlusCircle, ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Hospital, Specialty, HospitalService } from '../types/database';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Data for dropdowns
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [services, setServices] = useState<HospitalService[]>([]);
  const [isLoweringService, setIsLoweringService] = useState(false);
  const [showNewServiceInput, setShowNewServiceInput] = useState(false);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      hospitalId: '',
      specialtyId: '',
      serviceId: '',
      newServiceName: '',
      author: 'Anonyme',
      year: '1ère année',
      rating: 5,
      quote: ''
    }
  });

  const selectedHospital = watch('hospitalId');
  const selectedSpecialty = watch('specialtyId');

  // Auth Listener
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const [hRes, sRes] = await Promise.all([
          supabase.from('hospitals').select('*').order('name'),
          supabase.from('specialties').select('*').order('name')
        ]);
        setHospitals(hRes.data || []);
        setSpecialties(sRes.data || []);
      };
      fetchData();
    }
  }, [user]);

  // Dependent Service Fetching
  useEffect(() => {
    if (selectedHospital && selectedSpecialty) {
      const fetchServices = async () => {
        setIsLoweringService(true);
        const { data } = await supabase
          .from('hospital_services')
          .select('*')
          .eq('hospitalId', selectedHospital)
          .eq('specialtyId', selectedSpecialty);
        
        setServices(data || []);
        setIsLoweringService(false);
        
        if (!data || data.length === 0) {
          setShowNewServiceInput(true);
        } else {
          setShowNewServiceInput(false);
        }
      };
      fetchServices();
    }
  }, [selectedHospital, selectedSpecialty]);

  const onLogin = async (data: any) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      if (error) throw error;
    } catch (err: any) {
      setStatus({ type: 'error', message: 'Identifiants invalides' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  const onSubmitTestimonial = async (data: any) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      let finalServiceName = '';
      let finalHospitalName = hospitals.find(h => h.id === data.hospitalId)?.name || '';
      let finalSpecialityName = specialties.find(s => s.id === data.specialtyId)?.name || '';

      // Create service if it doesn't exist
      if (showNewServiceInput || !data.serviceId) {
        const { data: newSrv, error: srvErr } = await supabase
          .from('hospital_services')
          .insert([{
            hospitalId: data.hospitalId,
            specialtyId: data.specialtyId,
            serviceName: data.newServiceName || finalSpecialityName,
            specialtyName: finalSpecialityName,
            type: specialties.find(s => s.id === data.specialtyId)?.type || 'medical',
            reviewCount: 1
          }])
          .select()
          .single();
        
        if (srvErr) throw srvErr;
        finalServiceName = newSrv.serviceName;
      } else {
        finalServiceName = services.find(s => s.id === data.serviceId)?.serviceName || '';
      }

      // Insert testimonial
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          content: data.quote,
          authorName: data.author,
          serviceName: finalServiceName,
          hospitalName: finalHospitalName,
          rating: parseInt(data.rating),
          year: data.year,
          hospital_id: data.hospitalId
        }]);

      if (error) throw error;

      setStatus({ type: 'success', message: 'Témoignage publié avec succès !' });
      reset({ 
        hospitalId: data.hospitalId, 
        specialtyId: data.specialtyId, 
        author: 'Anonyme', 
        year: '1ère année', 
        rating: 5, 
        quote: '' 
      });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B132B] relative overflow-hidden py-20 px-4">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-cyan/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!user ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-md mx-auto"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-cyan/10 text-brand-cyan mb-6">
                  <User className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Accès Admin</h1>
                <p className="text-gray-400">Connectez-vous pour gérer les témoignages</p>
              </div>

              <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input 
                    {...register('email', { required: true })}
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="admin@medvice.dz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
                  <input 
                    {...register('password', { required: true })}
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="••••••••"
                  />
                </div>

                {status?.type === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {status.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                  Se connecter
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Gestion des Témoignages</h1>
                  <p className="text-gray-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Connecté en tant que <span className="text-brand-cyan font-medium">{user.email}</span>
                  </p>
                </div>
                <button 
                  onClick={onSignOut}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all text-sm font-bold border border-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>

              {/* Form Body */}
              <div className="p-8 md:p-12">
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-10 p-5 rounded-2xl border flex items-center gap-4 ${
                      status.type === 'success' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    <span className="font-medium text-lg">{status.message}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmitTestimonial)} className="space-y-12">
                  
                  {/* Context Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Hospital Dropdown */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        <Building2 className="w-4 h-4" /> Hôpital
                      </label>
                      <select 
                        {...register('hospitalId', { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                      >
                        <option value="" className="bg-[#0B132B]">Sélectionner...</option>
                        {hospitals.map(h => (
                          <option key={h.id} value={h.id} className="bg-[#0B132B]">{h.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Specialty Dropdown */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        <Stethoscope className="w-4 h-4" /> Spécialité
                      </label>
                      <select 
                        {...register('specialtyId', { required: true })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                      >
                        <option value="" className="bg-[#0B132B]">Sélectionner...</option>
                        {specialties.map(s => (
                          <option key={s.id} value={s.id} className="bg-[#0B132B]">{s.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Service Selection */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        <PlusCircle className="w-4 h-4" /> Service
                      </label>
                      {isLoweringService ? (
                        <div className="h-[58px] flex items-center px-4 bg-white/5 rounded-2xl border border-white/10">
                          <Loader2 className="w-5 h-5 text-brand-cyan animate-spin" />
                        </div>
                      ) : showNewServiceInput ? (
                        <input 
                          {...register('newServiceName', { required: true })}
                          placeholder="Nom du nouveau service..."
                          className="w-full bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-brand-cyan animate-in fade-in"
                        />
                      ) : (
                        <select 
                          {...register('serviceId')}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                        >
                          <option value="" className="bg-[#0B132B]">Sélectionner un service...</option>
                          {services.map(s => (
                            <option key={s.id} value={s.id} className="bg-[#0B132B]">{s.serviceName}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Metadata Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        <User className="w-4 h-4" /> Auteur
                      </label>
                      <input 
                        {...register('author')}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        <GraduationCap className="w-4 h-4" /> Année
                      </label>
                      <select 
                        {...register('year')}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                      >
                        {['1ère année', '2ème année', '3ème année', '4ème année', '5ème année', 'Internat', 'Résident Fini'].map(y => (
                          <option key={y} value={y} className="bg-[#0B132B]">{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        <Star className="w-4 h-4" /> Note (1-5)
                      </label>
                      <input 
                        type="number"
                        min="1"
                        max="5"
                        {...register('rating')}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4" /> Témoignage
                    </label>
                    <textarea 
                      {...register('quote', { required: true })}
                      rows={6}
                      placeholder="Comment se passe le stage ? Les gardes ? L'ambiance ?"
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-white outline-none focus:ring-2 focus:ring-brand-cyan transition-all resize-none"
                    />
                  </div>

                  {/* Footer */}
                  <div className="pt-8 border-t border-white/5 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="group bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-bold py-5 px-12 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(58,134,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />}
                      {isSubmitting ? 'Publication...' : 'Publier le Témoignage'}
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


