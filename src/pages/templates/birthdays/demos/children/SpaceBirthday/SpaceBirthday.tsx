import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Message {
  from: string;
  emoji: string;
  place: string;
  icon: string;
  accent: 'cyan' | 'pink' | 'gold';
  btn: string;
  memory?: string;
  memorySub?: string;
  photoEmoji?: string;
  photo?: string;
  text: string;
}

const CONFIG = {
  childName: "Thomas",
  age: 8,
  party: "2026-11-14T16:00:00",
  messages: [
    { from: "Papa & Maman", emoji: "🪐", place: "Base Stellaire Terre", icon: "public", accent: "cyan", btn: "Activer l'Hologramme", memory: "Capsule Mémorielle #8", memorySub: "Fréquence du Cœur Stellaire", photoEmoji: "👨‍👩‍👦", photo: "https://lh3.googleusercontent.com/aida/AEtjO1VGtNSJthuflpz2sLyRz11tQlVxqyIjmxRnnklcZhb4e4YB47OZQOPUnlV49F7XNJzxSslxV6Yb7KV-5rVovci8ZnqGMoilSoItEojF0dT2_Ahz33qiVCC38hUb8lrhSyLwKIhwZ7IbRv6vP3HIuzleanKVxKwYhs1wuT5o22vzU0W15IJjfZCpQK1EQVqV-0enjg3Fwrm1xe9AD2R2ZNqMWATaAffVH5-jUsKy7RAhOh5Qsgd_YeaIp8", text: `À notre petit cosmonaute préféré ! 8 ans déjà que tu illumines notre galaxie avec tes rires et ton énergie de supernova. Que cette nouvelle année stellaire soit remplie de découvertes magiques et de grandes aventures ! On t'aime jusqu'aux confins de l'univers ! 🚀✨ Papa & Maman` },
    { from: "Mamie & Papy", emoji: "🌕", place: "Base Lunaire des Bisous", icon: "bedtime", accent: "pink", btn: "Décoder la transmission", text: `Grand voyageur de l'espace ! Mamie a préparé des biscuits en forme de constellations et Papy a réglé son télescope pour regarder briller ton étoile des 8 ans. Gros câlins lunaires ! 🍪🌙✨` },
    { from: "Tonton Lucas & Tata Émilie", emoji: "🛸", place: "Vaisseau Comète Rapide", icon: "qr_code_2", accent: "gold", btn: "Décoder la fréquence", text: `Alerte générale ! On a intercepté un signal : 8 bougies détectées sur le gâteau galactique ! Prépare tes moteurs de course, on débarque avec un cadeau venu tout droit de Jupiter ! 🛸⚡🎂` },
  ] as Message[],
};

const ACCENTS = {
  cyan: { icon: "text-primary-container", glow: "shadow-[0_0_12px_rgba(34,230,255,0.3)]", badge: "bg-primary-container/15 text-primary-container", btn: "bg-primary-container text-on-primary shadow-[0_0_18px_rgba(34,230,255,0.5)]", dot: "bg-primary-container" },
  pink: { icon: "text-tertiary-fixed-dim", glow: "shadow-[0_0_12px_rgba(255,173,227,0.3)]", badge: "bg-tertiary-container/20 text-tertiary-fixed", btn: "bg-tertiary text-on-tertiary shadow-[0_0_18px_rgba(255,191,231,0.5)]", dot: "bg-tertiary-fixed" },
  gold: { icon: "text-secondary", glow: "shadow-[0_0_12px_rgba(237,194,46,0.3)]", badge: "bg-secondary-container/20 text-secondary", btn: "bg-secondary text-on-secondary shadow-[0_0_18px_rgba(237,194,46,0.45)]", dot: "bg-secondary" },
};

const SpaceBirthday: React.FC = () => {
  const [view, setView] = useState<'capitaine' | 'journal' | 'lancement'>('capitaine');
  const [openedMsgs, setOpenedMsgs] = useState(new Set<number>());
  const [partyCountdown, setPartyCountdown] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStage, setLaunchStage] = useState<'idle' | 'counting' | 'flying' | 'done'>('idle');
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(CONFIG.party).getTime() - new Date().getTime();
      if (diff <= 0) {
        setPartyCountdown("C'est le jour J ! 🎉");
      } else {
        const s = Math.floor(diff / 1000);
        const d = Math.floor(s / 86400);
        setPartyCountdown(`${d > 0 ? d + 'j ' : ''}${String(Math.floor((s % 86400) / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDecode = (i: number) => {
    setOpenedMsgs(prev => new Set(prev).add(i));
  };

  const startLaunch = async () => {
    setIsLaunching(true);
    setLaunchStage('counting');
    for (let i = 3; i >= 1; i--) {
      setCount(i);
      await new Promise(r => setTimeout(r, 1000));
    }
    setCount('🚀');
    setLaunchStage('flying');
    await new Promise(r => setTimeout(r, 3000));
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setLaunchStage('done');
    setIsLaunching(false);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* Star Background Simulation */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-60px] left-[-90px] w-80 h-80 bg-primary-container/10 blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 right-[-110px] w-96 h-96 bg-tertiary-container/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-secondary/10 blur-3xl rounded-full"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe shadow-sm">
        <div className="h-16 px-4 max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-primary-container">rocket_launch</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-headline-sm text-primary uppercase truncate">VAISSEAU ALPHA-{CONFIG.age}</span>
                <div className="flex items-center gap-1 bg-surface-container-high px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-300 font-bold uppercase">EN LIGNE</span>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant">MISSION {CONFIG.age} ANS • Capitaine</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-container">
              <img src="https://lh3.googleusercontent.com/aida/AEtjO1VGtNSJthuflpz2sLyRz11tQlVxqyIjmxRnnklcZhb4e4YB47OZQOPUnlV49F7XfNJzxSslxV6Yb7KV-5rVovci8ZnqGMoilSoItEojF0dT2_Ahz33qiVCC38hUb8lrhSyLwKIhwZ7IbRv6vP3HIuzleanKVxKwYhs1wuT5o22vzU0W15IJjfZCpQK1EQVqV-0enjg3Fwrm1xe9AD2R2ZNqMWATaAffVH5-jUsKy7RAhOh5Qsgd_YeaIp8" alt="Capitaine" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative w-full max-w-3xl mx-auto pt-16 pb-24 min-h-screen">
        {view === 'capitaine' && (
          <section className="flex flex-col w-full px-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center mt-6 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/90 shadow-sm mb-4 backdrop-blur-md">
                <span className="material-symbols-outlined text-secondary animate-spin" style={{ animationDuration: '9s' }}>hotel_class</span>
                <span className="text-xs font-bold tracking-widest bg-gradient-to-r from-secondary via-tertiary-fixed-dim to-primary-container bg-clip-text text-transparent uppercase">MISSION {CONFIG.age} ANS !</span>
                <span className="material-symbols-outlined text-tertiary-container">auto_awesome</span>
              </div>
              <h1 className="text-3xl md:text-4xl text-on-surface font-extrabold max-w-xl tracking-tight leading-tight mb-6">
                Transmissions pour le <span className="text-primary-container drop-shadow-sm">Capitaine {CONFIG.childName}</span>
              </h1>
              <div className="relative w-44 h-44 group cursor-pointer" onClick={() => alert(`🌟 « Bienvenue à bord de mon vaisseau Alpha-${CONFIG.age} ! » – ${CONFIG.childName}`)}>
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary-container via-on-tertiary-container to-secondary opacity-40 blur-xl group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-b from-primary-container via-surface-container-high to-tertiary-fixed-dim shadow-lg flex items-center justify-center">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-surface-container-lowest flex items-center justify-center">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnhP7Y0z47F8TAsQtwHFwUBZoq9WnnB32ZQrs4phkrQgLhdetb0kM_P_Z4jZuqzaVr5H3ldALywL-qi5ZpBcE7J3jP3DQKeBPdaU1IgaBhTldzYMiEWyEi99rLwbXmRvWSyV_X8ZyEo0YLn_EACmRAO835hpdqXhazZTl8Y5D7eijXPqG7jpHKh0veY7q9ErvGQlFWyu6z-JO9wHOI9kyuDqaz-Gm8XUCmXdYMG0E6ym7CrIspwfpB" alt="Capitaine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="absolute -bottom-2 bg-secondary text-on-secondary px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-sm">verified</span>GRADE : COMMANDANT EN CHEF
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container/90 rounded-3xl p-6 shadow-lg backdrop-blur-xl relative overflow-hidden mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container"><span className="material-symbols-outlined">equalizer</span></div>
                  <span className="text-sm text-primary tracking-wider uppercase font-bold">STATUT DE LA MISSION</span>
                </div>
                <span className="text-lg font-bold text-secondary-fixed">100%</span>
              </div>
              <div className="h-4 w-full bg-surface-container-lowest rounded-full p-0.5 overflow-hidden mb-4">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-container via-tertiary-container to-secondary shadow-sm w-full transition-all duration-1000"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: 'groups', label: 'Équipage', status: 'Au complet ✅', color: 'text-emerald-400' },
                  { icon: 'cake', label: 'Gâteau', status: 'Paré & doré 🎂', color: 'text-secondary-fixed' },
                  { icon: 'featured_seasonal_and_gifts', label: 'Cadeaux', status: 'Prêts 🎁', color: 'text-tertiary-fixed-dim' },
                  { icon: 'bolt', label: 'Propulseur', status: 'Vitesse Lumière ⚡', color: 'text-primary-fixed-dim' },
                ].map((item, i) => (
                  <div key={i} className="bg-surface-container-high/80 rounded-2xl p-3 flex items-center gap-2 transition-all hover:bg-surface-bright">
                    <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-sm">{item.icon}</span></div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-on-surface font-bold truncate">{item.label}</span>
                      <span className={`text-xs font-semibold truncate ${item.color}`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface-container/90 rounded-3xl p-6 shadow-lg backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-tertiary-fixed-dim text-xl">satellite_alt</span><span className="font-bold text-on-surface">Transmissions</span></div>
                  <span className="bg-on-tertiary-container text-tertiary-fixed text-xs font-bold px-2.5 py-0.5 rounded-full">{CONFIG.messages.length - openedMsgs.size} EN ATTENTE</span>
                </div>
                <p className="text-sm text-on-surface-variant">Des messages secrets venus de la galaxie ont été captés pour les {CONFIG.age} ans de {CONFIG.childName} !</p>
                <button onClick={() => setView('journal')} className="w-full py-3 rounded-full bg-surface-container-high hover:bg-surface-bright text-primary-container font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all">
                  Ouvrir le Journal de bord <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="bg-surface-container/90 rounded-3xl p-6 shadow-lg backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">rocket_launch</span><span className="font-bold text-on-surface">Compte à Rebours</span></div>
                  <span className="text-xs text-secondary-fixed font-bold bg-secondary-container/40 px-2.5 py-0.5 rounded-full">DÉCOLLAGE PROCHE</span>
                </div>
                <div className="relative rounded-2xl overflow-hidden h-36 bg-surface-container-lowest flex items-center justify-center">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkluriF5rxXt3GoO59YZaowwjtdzAA6MWwWZws3e8QpYtai8SFOako-KY1KyFmuzXtpFWiL la la" alt="Rocket" className="w-full h-full object-cover opacity-85" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] text-primary font-bold uppercase">FUSÉE SATURNE-{CONFIG.age}</span>
                    <span className="text-[10px] text-secondary font-bold uppercase">PAS DE TIR #{CONFIG.age}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 bg-surface-container-high/60 px-4 py-2 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-medium">Début de la fête dans</span>
                    <span className="text-sm text-on-surface font-extrabold tracking-wider">{partyCountdown}</span>
                  </div>
                  <button onClick={() => setView('lancement')} className="py-2 px-4 rounded-full bg-secondary hover:bg-secondary-fixed text-on-secondary font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1.5 text-sm">
                    <span className="material-symbols-outlined text-sm">local_fire_department</span>PROPULSION
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'journal' && (
          <section className="flex flex-col w-full px-4 pb-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center gap-2 mt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping"></span>
                <span className="text-[10px] text-tertiary-fixed uppercase font-bold tracking-wider">CANAL CODÉ · {openedMsgs.size}/{CONFIG.messages.length} DÉCODÉES</span>
              </div>
              <h1 className="text-2xl text-primary tracking-tight">Journal de Bord – Transmissions Holographiques</h1>
              <p className="text-sm text-on-surface-variant max-w-sm">Les explorateurs de ta galaxie t'ont envoyé des messages secrets pour célébrer tes {CONFIG.age} ans !</p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {CONFIG.messages.map((m, i) => {
                const a = ACCENTS[m.accent];
                const isOpened = openedMsgs.has(i);
                return (
                  <div
                    key={i}
                    onClick={() => handleDecode(i)}
                    className={`relative overflow-hidden rounded-lg p-4 flex flex-col gap-3 transition-all ${isOpened ? 'bg-surface-container shadow-lg ring-1 ring-primary-container/30' : 'bg-surface-container-high/80 shadow-md cursor-pointer hover:translate-y-[-2px]'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-12 h-12 rounded-full bg-surface-container flex items-center justify-center ${a.glow}`}>
                          <span className={`material-symbols-outlined text-xl ${a.icon}`}>{m.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className={`font-bold text-sm ${isOpened ? 'text-primary' : 'text-primary'}`}>{m.emoji} Transmission de {m.from}</span>
                          <span className={`text-xs ${isOpened ? 'text-emerald-300 font-semibold' : 'text-on-surface-variant'}`}>
                            {isOpened ? '✓ Reçu avec succès' : m.place}
                          </span>
                        </div>
                      </div>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${a.badge}`}>
                        {isOpened ? 'Décodé' : 'NOUVEAU'}
                      </span>
                    </div>

                    <div className={`relative rounded p-4 flex items-center justify-between gap-4 overflow-hidden min-h-[84px] ${isOpened ? 'bg-surface-container/80 shadow-inner' : 'bg-surface-container/60'}`}>
                      {isOpened ? (
                        <div className="flex flex-col gap-3 w-full">
                          {m.photo && (
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-secondary to-primary-container shadow-sm">
                                <img src={m.photo} alt="Souvenir" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-secondary uppercase font-bold">{m.memory}</span>
                                <span className="text-[10px] text-on-surface-variant">{m.memorySub}</span>
                              </div>
                            </div>
                          )}
                          <p className="text-sm text-primary leading-relaxed">{m.text}</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center p-4 bg-surface-container-lowest/40 backdrop-blur-[2px]">
                          <span className={`px-4 py-2 rounded-full ${a.btn} text-xs font-bold flex items-center gap-2`}>
                            <span className="material-symbols-outlined text-sm">lock_open</span>{m.btn}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setView('capitaine')} className="w-full py-3 rounded-full bg-surface-container-high text-primary-container font-bold flex items-center justify-center gap-2 shadow-sm">
              Retour au Vaisseau <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
          </section>
        )}

        {view === 'lancement' && (
          <section className="flex flex-col w-full px-4 pb-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col items-center text-center gap-2 mt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
                <span className="text-xs text-primary tracking-widest font-bold uppercase">PAS DE TIR NUMÉRO {CONFIG.age} · PRÊT</span>
              </div>
              <h1 className="text-3xl text-primary tracking-tight drop-shadow-sm">Centre de Lancement Spatial</h1>
              <p className="text-sm text-on-surface-variant max-w-xs">Paré pour la propulsion d'anniversaire vers la vitesse lumière !</p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-low shadow-2xl">
              <div className="relative w-full h-80 md:h-96 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKVVGnH_b1mkbZux_mPLS Tf7THbQx3TAMskDpBlsbXt0AGUZSZUQHlHKFL-4Y5c7fBq_YZuDUtfDh3ib6QIeCQiegElC7Vurej6ZWFOCuNgFaIk3mzuRM-RXwQAfTX-1CDeLbJ8qtuc0JRi2n3zSkG31tOGOKobsNklRDBvUvL-SQcMziSpTmdc6-JoTxjYhrn-XPm67iZebfMVYN3Os-Km-gItWPoTKcVtYhaW4PBs18tDQnXPss" alt="Rocket" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-dim/80 backdrop-blur-md text-[10px] text-primary">
                  <span className="material-symbols-outlined text-sm text-secondary">explore</span>SECTEUR GALAXY-{CONFIG.age}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-4 w-full">
              <button
                disabled={isLaunching}
                onClick={startLaunch}
                className="relative group w-full py-4 px-6 rounded-full bg-gradient-to-r from-secondary via-secondary-fixed to-secondary text-on-secondary font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <span className="material-symbols-outlined animate-bounce">rocket_launch</span>
                <span>{isLaunching ? (launchStage === 'counting' ? `T-minus ${count}...` : 'DÉCOLLAGE EN COURS...') : 'Lancer la fusée d\'anniversaire !'}</span>
              </button>

              {launchStage === 'done' && (
                <div className="w-full p-6 rounded-2xl bg-surface-container-high shadow-xl animate-in zoom-in duration-500 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-lg animate-pulse">
                    <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xl text-primary font-bold">ALLUMAGE RÉUSSI ! 🎉</span>
                    <p className="text-sm text-on-surface-variant">La fusée a traversé la voûte céleste vers la Fête des {CONFIG.age} Ans ! Joyeux anniversaire, Capitaine {CONFIG.childName} !</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-around h-20 px-4 max-w-3xl mx-auto">
          {[
            { id: 'capitaine', label: 'Capitaine', icon: 'badge' },
            { id: 'journal', label: 'Journal', icon: 'satellite_alt' },
            { id: 'lancement', label: 'Lancement', icon: 'rocket' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`flex flex-col items-center justify-center min-w-[72px] h-14 rounded-2xl gap-1 transition-all ${view === item.id ? 'bg-surface-container-high text-primary shadow-sm scale-105' : 'text-on-surface-variant hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-xs font-semibold tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SpaceBirthday;
