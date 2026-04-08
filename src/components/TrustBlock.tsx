import { motion } from 'framer-motion';
import { Users, MessageSquare, Building } from 'lucide-react';

export default function TrustBlock() {
  return (
    <div id="remerciements" className="w-full bg-[#F8FAFC] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#1B243B] mb-6"
          >
            Un projet construit par et pour la communauté.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Medvice est le fruit d'une collaboration de la communauté. Merci à tous ceux qui contribuent à éclairer l'avenir de nos futurs confrères.
          </motion.p>
        </div>

        {/* Impact Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-center items-center md:divide-x divide-gray-200 border-y border-gray-200 py-10 mb-20 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl gap-8 md:gap-0"
        >
          <div className="px-8 md:px-12 text-center w-full md:w-1/3 flex flex-col items-center">
            <div className="text-brand-blue mb-3 bg-brand-blue/10 p-4 rounded-full">
               <Users className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1B243B] mb-1">Collaborateurs</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              50+ Médecins impliqués
            </p>
          </div>

          <div className="px-8 md:px-12 text-center w-full md:w-1/3 flex flex-col items-center">
             <div className="text-brand-cyan mb-3 bg-brand-cyan/10 p-4 rounded-full">
               <MessageSquare className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1B243B] mb-1">Témoignages</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              200+ Avis recueillis
            </p>
          </div>

          <div className="px-8 md:px-12 text-center w-full md:w-1/3 flex flex-col items-center">
             <div className="text-brand-blue mb-3 bg-brand-blue/10 p-4 rounded-full">
               <Building className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1B243B] mb-1">Services Couverts</h3>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              À travers la communauté
            </p>
          </div>
        </motion.div>

        {/* Founder's Open Letter */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative bg-[#0B132B] rounded-[2rem] shadow-2xl overflow-hidden p-10 md:p-16 border border-[#232F4C]"
        >
          {/* Glassmorphism internal wrapper styling mapping closely to user's "bg-white/5 backdrop-blur-xl" */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl z-0 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
             <p className="text-white text-lg md:text-xl font-sans leading-relaxed mb-12 font-light">
                "Medvice n'aurait jamais pu voir le jour sans la générosité et le dévouement des médecins résidents, spécialistes et maîtres-assistants qui ont pris le temps de partager leur expérience. Merci à chaque collaborateur d'avoir cru en cette vision : centraliser l'information pour faciliter un choix de vie crucial. À tous les lauréats du concours de résidanat, je vous souhaite un immense succès dans cette nouvelle étape de votre noble carrière. Que ce choix de spécialité soit le début d'un parcours exceptionnel."
             </p>
             <div className="text-right">
                <p className="text-brand-cyan font-serif text-2xl italic tracking-wide">— Cherif Louazani Ahmed Nadir</p>
             </div>
          </div>
        </motion.div>

        {/* Islamic Dedication / Prayer (Duaa) */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6 }}
           className="mt-32 text-center"
        >
           <p 
             className="text-slate-400 text-xl md:text-2xl leading-loose font-medium" 
             dir="rtl" 
             style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
           >
              لا تنسوا الدعاء لوالديّ حفظهما الله، ولجدتي وديلمي امحمد رحمهما الله
           </p>
        </motion.div>

      </div>
    </div>
  );
}
