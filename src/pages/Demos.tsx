import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Rocket, Palette } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

// Types for our demo data
interface DemoTemplate {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  icon: React.ElementType;
}

interface ServiceDemoCategory {
  id: string;
  title: string;
  hasDemos: boolean;
  templates: DemoTemplate[];
}

const DEMO_DATA: ServiceDemoCategory[] = [
  {
    id: 'weddings',
    title: 'Mariages',
    hasDemos: false,
    templates: [],
  },
  {
    id: 'birthdays',
    title: 'Anniversaires',
    hasDemos: true,
    templates: [
      {
        id: 'jungle',
        title: 'Expédition Jungle',
        description: 'Un voyage sauvage avec dinosaures et jungle luxuriante.',
        image: 'https://images.pexels.com/photos/13872219/pexels-photo-13872219.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        path: '/demos/birthdays/jungle',
        icon: Palette,
      },
      {
        id: 'space',
        title: 'Aventure Spatiale',
        description: 'Un voyage interstellaire avec fusées et étoiles filantes.',
        image: 'https://images.pexels.com/photos/13872225/pexels-photo-13872225.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        path: '/demos/birthdays/space',
        icon: Rocket,
      },
      {
        id: 'grimoire',
        title: 'Grimoire Magique',
        description: 'Un livre enchanté rempli de vœux de fées et de sortilèges.',
        image: 'https://images.pexels.com/photos/7100317/pexels-photo-7100317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        path: '/demos/birthdays/grimoire',
        icon: Sparkles,
      },
    ],
  },
  {
    id: 'baptisms',
    title: 'Baptêmes & Naissances',
    hasDemos: false,
    templates: [],
  },
  {
    id: 'commemorations',
    title: 'Commémorations',
    hasDemos: false,
    templates: [],
  },
  {
    id: 'special',
    title: 'Événements Spéciaux',
    hasDemos: false,
    templates: [],
  },
];

const Demos: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [notification, setNotification] = useState<string | null>(null);
  const serviceFilter = searchParams.get('service');

  const showComingSoon = () => {
    setNotification("Les démos de ce service seront disponibles très prochainement ✨");
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredData = serviceFilter
    ? DEMO_DATA.filter(cat => cat.id === serviceFilter)
    : DEMO_DATA;

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">L'Atelier des <span className="text-secondary">Démos</span></h1>
            <p className="text-on-surface-variant mt-2">Explorez nos univers et choisissez l'expérience qui vous ressemble.</p>
          </div>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((category) => (
            <div
              key={category.id}
              className="bg-surface-container rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col"
            >
              <div className="p-6 border-b border-white/5 bg-white/5">
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>

              <div className="p-6 flex-1">
                {category.hasDemos ? (
                  <div className="grid grid-cols-1 gap-4">
                    {category.templates.map((template) => (
                      <Link
                        key={template.id}
                        to={template.path}
                        className="group relative block rounded-2xl overflow-hidden bg-surface-container-lowest border border-white/5 transition-all hover:scale-[1.02] hover:shadow-lg"
                      >
                        <img src={template.image} alt={template.title} className="w-full h-32 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <template.icon size={16} className="text-primary" />
                            <h3 className="font-bold text-white">{template.title}</h3>
                          </div>
                          <p className="text-xs text-on-surface-variant">{template.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 opacity-50">
                      <Sparkles size={32} className="text-on-surface-variant" />
                    </div>
                    <p className="text-sm text-on-surface-variant mb-4">Aucune démo disponible pour le moment.</p>
                    <button
                      onClick={showComingSoon}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
                    >
                      Vérifier la disponibilité
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-surface-container-high border border-gold/30 px-6 py-3 rounded-full shadow-2xl text-gold font-bold flex items-center gap-3 backdrop-blur-xl">
            <Sparkles size={18} />
            <span>{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demos;
