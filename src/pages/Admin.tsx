import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'testimonials'>('hospitals');
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data: any) => {
    alert(`Données sauvegardées: ${JSON.stringify(data)}`);
    reset();
  };

  return (
    <div className="min-h-screen bg-content-bg py-16 px-4 sm:px-6 lg:px-8 text-text-main">
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="bg-hero-bg text-white p-10">
          <h1 className="text-4xl font-serif font-bold mb-2">Panel d'Administration</h1>
          <p className="text-gray-400 text-lg">Gérez les données de la plateforme Medvice.</p>
        </div>

        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-5 text-lg font-bold text-center transition-colors ${activeTab === 'hospitals' ? 'text-brand-cyan border-b-[3px] border-brand-cyan bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('hospitals')}
          >
            Hôpitaux
          </button>
          <button 
            className={`flex-1 py-5 text-lg font-bold text-center transition-colors ${activeTab === 'testimonials' ? 'text-brand-cyan border-b-[3px] border-brand-cyan bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('testimonials')}
          >
            Témoignages
          </button>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {activeTab === 'hospitals' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 text-hero-bg">Ajouter un Hôpital</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom de l'établissement</label>
                    <input {...register('name', { required: true })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-all" placeholder="Ex: CHU Blida" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ville</label>
                    <input {...register('city', { required: true })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-all" placeholder="Ex: Blida" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 text-hero-bg">Nouveau Témoignage</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Auteur</label>
                    <input {...register('author', { required: true })} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan outline-none transition-all" placeholder="Ex: Dr. Amine" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Spécialité</label>
                      <input {...register('specialty')} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan outline-none transition-all" placeholder="Ex: Cardiologie" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Hôpital</label>
                      <input {...register('hospital')} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan outline-none transition-all" placeholder="Ex: CHU Mustapha" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Citation</label>
                    <textarea {...register('quote', { required: true })} rows={4} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-cyan outline-none transition-all" placeholder="Son retour d'expérience..."></textarea>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 text-right border-t border-gray-100 mt-8">
              <button type="submit" className="bg-hero-bg hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
