import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { specialtiesData } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setOpenMega(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMega = (menu: string) => {
    setOpenMega(openMega === menu ? null : menu);
  };

  return (
    <nav className="bg-hero-bg text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-white">Med<span className="text-brand-cyan">vice</span></span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Accueil</Link>
              <div className="relative group" ref={megaMenuRef}>
                <button onClick={() => toggleMega('specialties')} className="flex items-center hover:text-brand-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Spécialités
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <AnimatePresence>
                  {openMega === 'specialties' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }} 
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-screen max-w-4xl bg-white text-text-main shadow-xl rounded-b-lg overflow-hidden border-t-4 border-brand-cyan transform origin-top"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-h-[70vh] overflow-y-auto">
                        <div>
                          <h3 className="font-serif font-bold text-lg mb-4 text-hero-bg border-b border-gray-100 pb-2">Médicales</h3>
                          <ul className="space-y-2.5 text-sm text-gray-600">
                            {specialtiesData.filter(s => s.type === 'medical').map(s => (
                              <li key={s.id}><Link to={`/specialty/${encodeURIComponent(s.name)}`} onClick={() => setOpenMega(null)} className="hover:text-brand-cyan hover:pl-1 transition-all block">{s.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-lg mb-4 text-hero-bg border-b border-gray-100 pb-2">Chirurgicales</h3>
                          <ul className="space-y-2.5 text-sm text-gray-600">
                            {specialtiesData.filter(s => s.type === 'surgical').map(s => (
                              <li key={s.id}><Link to={`/specialty/${encodeURIComponent(s.name)}`} onClick={() => setOpenMega(null)} className="hover:text-brand-cyan hover:pl-1 transition-all block">{s.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-lg mb-4 text-hero-bg border-b border-gray-100 pb-2">Biologiques</h3>
                          <ul className="space-y-2.5 text-sm text-gray-600">
                            {specialtiesData.filter(s => s.type === 'biological').map(s => (
                              <li key={s.id}><Link to={`/specialty/${encodeURIComponent(s.name)}`} onClick={() => setOpenMega(null)} className="hover:text-brand-cyan hover:pl-1 transition-all block">{s.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="/#remerciements" className="hover:text-brand-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Remerciements</a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-brand-cyan hover:bg-gray-800 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-hero-bg border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-white hover:text-brand-cyan block px-3 py-2 rounded-md text-base font-medium transition-colors">Accueil</Link>
            <div className="text-white block px-3 py-2 rounded-md text-base font-medium">
              <button className="flex w-full justify-between items-center transition-colors hover:text-brand-cyan" onClick={() => toggleMega('mobile-sp')}>
                Spécialités <ChevronDown className={`h-4 w-4 transition-transform ${openMega === 'mobile-sp' ? 'rotate-180' : ''}`} />
              </button>
              {openMega === 'mobile-sp' && (
                <div className="pl-4 mt-3 space-y-6 border-l-2 border-brand-cyan ml-2 max-h-[50vh] overflow-y-auto">
                  <div>
                    <div className="text-sm font-bold text-gray-300 mb-2">Médicales</div>
                    <ul className="text-sm text-gray-400 space-y-2 pl-2">
                       {specialtiesData.filter(s => s.type === 'medical').map(s => (
                            <li key={s.id}><Link to={`/specialty/${encodeURIComponent(s.name)}`} onClick={() => setIsOpen(false)} className="hover:text-brand-cyan block">{s.name}</Link></li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-300 mb-2">Chirurgicales</div>
                    <ul className="text-sm text-gray-400 space-y-2 pl-2">
                       {specialtiesData.filter(s => s.type === 'surgical').map(s => (
                            <li key={s.id}><Link to={`/specialty/${encodeURIComponent(s.name)}`} onClick={() => setIsOpen(false)} className="hover:text-brand-cyan block">{s.name}</Link></li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-300 mb-2">Biologiques</div>
                    <ul className="text-sm text-gray-400 space-y-2 pl-2">
                       {specialtiesData.filter(s => s.type === 'biological').map(s => (
                            <li key={s.id}><Link to={`/specialty/${encodeURIComponent(s.name)}`} onClick={() => setIsOpen(false)} className="hover:text-brand-cyan block">{s.name}</Link></li>
                       ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <a href="/#remerciements" onClick={() => setIsOpen(false)} className="text-white hover:text-brand-cyan block px-3 py-2 rounded-md text-base font-medium transition-colors">Remerciements</a>
          </div>
        </div>
      )}
    </nav>
  );
}
