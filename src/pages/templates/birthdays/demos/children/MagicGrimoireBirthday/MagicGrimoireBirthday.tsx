import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Wish {
  id: string;
  fairy: string;
  role: string;
  seal: 'rose' | 'or' | 'violet';
  initial: string;
  title: string;
  body: string;
  gift: string;
}

interface Photo {
  src: string;
  cap: string;
}

const CONFIG = {
  name: "Lina",
  age: 7,
  wishes: [
    { id: 'aurore', fairy: 'Fée Aurore', role: 'gardienne des matins dorés', seal: 'rose', initial: 'A', title: 'Le vœu des matins qui chantent', body: "Chère {NAME},\n\nJe suis celle qui allume le soleil avant ton réveil. Pour tes {AGE} ans, j'ai cousu un rire dans chaque poche de ton manteau, et une chanson dans chaque flaque d'eau.\n\nQue tes matinées sentent le gâteau tout juste sorti du four, et que jamais, jamais tu ne te lèves du pied gauche.", gift: '✦ Don : un rire qui ne s\'épuise jamais' },
    { id: 'mirabelle', fairy: 'Fée Mirabelle', role: 'chevalière des petites aventures', seal: 'or', initial: 'M', title: 'Le vœu du courage minuscule', body: "Petite aventurière,\n\nJe t'offre un dragon de la taille d'un dé à coudre. Il dort dans ta poche gauche et il se réveille seulement quand tu as un peu peur — alors il souffle des étincelles et tout redevient facile.\n\nN'aie pas peur des grands mots, des grands sauts et des grands rêves : ils sont faits pour les enfants de {AGE} ans.", gift: '✦ Don : un dragon de poche, taille XS' },
    { id: 'seraphine', fairy: 'Fée Séraphine', role: 'tisserande de rêves', seal: 'violet', initial: 'S', title: 'Le vœu des nuits étoilées', body: "Douce rêveuse,\n\nChaque soir, je verse une pincée de poussière d'étoiles sur ton oreiller. Cette nuit, elle sera deux fois plus généreuse : c'est ton anniversaire, même les étoiles le savent.\n\nRêve de forêts qui parlent, de baleines qui volent et de châteaux en sucre. Au matin, j'aurai tout rangé — sauf la magie.", gift: '✦ Don : trois rêves brillants par nuit' },
  ] as Wish[],
  photos: [
    { src: 'https://images.pexels.com/photos/13872219/pexels-photo-13872219.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'La nuit où l\'on a attrapé des lucioles' },
    { src: 'https://images.pexels.com/photos/7100317/pexels-photo-7100317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'Le grand souffle des bougies' },
    { src: 'https://images.pexels.com/photos/9065454/pexels-photo-9065454.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'Le bocal plein d\'étincelles' },
    { src: 'https://images.pexels.com/photos/7155966/pexels-photo-7155966.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'La cour des petits chevaliers' },
    { src: 'https://images.pexels.com/photos/13872225/pexels-photo-13872225.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'La fée des guirlandes' },
    { src: 'https://images.pexels.com/photos/7423774/pexels-photo-7423774.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'Le festin enchanté' },
    { src: 'https://images.pexels.com/photos/13871119/pexels-photo-13871119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', cap: 'Et la lumière fut… magique' },
  ] as Photo[],
};

const MagicGrimoireBirthday: React.FC = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [chapter, setChapter] = useState<'wishes' | 'album'>('wishes');
  const [name, setName] = useState(CONFIG.name);
  const [age, setAge] = useState(CONFIG.age);
  const [readWishes, setReadWishes] = useState(new Set<string>());
  const [activeWish, setActiveWish] = useState<Wish | null>(null);
  const [slide, setSlide] = useState(0);
  const [spellsCast, setSpellsCast] = useState(0);
  const [blownCandles, setBlownCandles] = useState(new Set<number>());

  const fillText = (text: string) => text.replace(/\\{NAME\\}/g, name).replace(/\\{AGE\\}/g, String(age));

  const handleCastSpell = () => {
    setSpellsCast(prev => prev + 1);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ffe9ae', '#f2a2c6', '#c8a6ff'] });
  };

  const handleBlowCandle = (i: number) => {
    setBlownCandles(prev => {
      const next = new Set(prev).add(i);
      if (next.size === age) {
        setTimeout(() => handleCastSpell(), 500);
      }
      return next;
    });
  };

  return (
    <div className="bg-[#120722] text-[#f2a2c6] min-h-screen font-serif overflow-x-hidden selection:bg-rose-300/30">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-rose-400/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-violet-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#100620]/80 backdrop-blur-md border-b border-gold/20">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-br from-gold-bright to-gold-deep rounded-full flex items-center justify-center text-brown-900 font-bold shadow-lg animate-spin-slow">✦</span>
          <span className="font-serif text-xs tracking-widest uppercase text-gold">Royaume de Féeria</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full border border-gold/40 text-[10px] uppercase tracking-tighter text-gold hover:bg-gold/10 transition-all">🔔 Carillon</button>
          <button className="px-3 py-1 rounded-full border border-gold/40 text-[10px] uppercase tracking-tighter text-gold hover:bg-gold/10 transition-all">✨ Poussière</button>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ${isBookOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex-1 text-center md:text-left">
            <p className="text-gold uppercase tracking-[0.4em] text-xs mb-4">Lettre enchantée</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              <span className="bg-gradient-to-b from-white to-gold bg-clip-text text-transparent">Le Grimoire</span>
              <br />
              <span className="italic text-rose-300">des Merveilles</span>
            </h1>
            <p className="text-rose-100/80 text-lg max-w-md mb-8 font-light">
              Un livre fermé à double tour par un sceau de cire. À l'intérieur : trois vœux de fées, un album de souvenirs et un sortilège.
            </p>

            <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
              <div className="relative">
                <label className="absolute -top-5 left-2 text-[10px] uppercase text-gold tracking-widest">Prénom</label>
                <input value={name} onChange={e => setName(e.target.value)} className="bg-violet-900/50 border border-gold/30 rounded-lg px-4 py-2 text-white focus:ring-2 ring-gold/50 outline-none" />
              </div>
              <div className="relative">
                <label className="absolute -top-5 left-2 text-[10px] uppercase text-gold tracking-widest">Âge</label>
                <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value) || 1)} className="bg-violet-900/50 border border-gold/30 rounded-lg px-4 py-2 text-white focus:ring-2 ring-gold/50 outline-none w-20" />
              </div>
            </div>

            <button onClick={() => setIsBookOpen(true)} className="bg-gradient-to-b from-gold-bright to-gold text-brown-900 font-bold px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm">
              🗝️ Ouvrir le grimoire
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <div
              onClick={() => setIsBookOpen(true)}
              className={`relative w-64 h-80 bg-violet-800 rounded-r-xl rounded-l-md shadow-2xl cursor-pointer transition-all duration-1000 transform-gpu ${isBookOpen ? 'rotate-y-[-160deg] opacity-0' : 'hover:scale-105'}`}
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 border-4 border-gold/30 rounded-r-xl rounded-l-md p-8 flex flex-col items-center justify-center text-center">
                <p className="text-gold text-xs uppercase tracking-widest mb-2">Livre des Anniversaires</p>
                <h2 className="text-2xl font-bold text-white mb-4">Grimoire<br/>des Merveilles</h2>
                <div className="w-24 h-px bg-gold/50 mb-4"></div>
                <p className="text-gold/70 text-xs uppercase mb-1">appartient à</p>
                <p className="text-3xl font-serif text-gold-bright italic mb-2">{name}</p>
                <p className="text-xs text-white/60">aujourd'hui <b>{age}</b> ans</p>
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-rose-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold border-2 border-rose-300 animate-pulse">✦</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Open Book */}
        {isBookOpen && (
          <section className="animate-in fade-in zoom-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#f8eff7] rounded-xl shadow-2xl text-brown-900 overflow-hidden min-h-[600px]">
              {/* Left Page: TOC */}
              <div className="p-8 border-r border-gray-300 bg-[#fdfafb]">
                <div className="mb-8">
                  <p className="text-rose-600 uppercase tracking-widest text-xs font-bold mb-1">Sommaire</p>
                  <h2 className="text-3xl font-bold text-violet-900">Il était une fois…</h2>
                  <p className="italic text-violet-700/70 mt-1">…une enfant nommée {name}</p>
                  <div className="h-px bg-gradient-to-r from-gold to-transparent mt-4"></div>
                </div>

                <ul className="flex flex-col gap-4 mb-12">
                  {[
                    { id: 'wishes', title: 'Les Vœux des Fées', sub: 'trois enveloppes scellées', num: 'I' },
                    { id: 'album', title: 'L\'Album des Souvenirs', sub: 'images qui scintillent', num: 'II' },
                  ].map(item => (
                    <li key={item.id}>
                      <button
                        onClick={() => setChapter(item.id as any)}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-all ${chapter === item.id ? 'bg-gold/20 border-gold shadow-inner' : 'bg-white/50 border-gray-200 hover:border-rose-300'}`}
                      >
                        <span className="text-xl font-bold text-gold-deep">{item.num}</span>
                        <div className="text-left">
                          <div className="font-bold text-violet-900">{item.title}</div>
                          <div className="text-xs text-violet-700/60 italic">{item.sub}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-12">
                  <p className="text-rose-600 font-serif italic mb-2">✒️ La plume enchantée</p>
                  <div className="flex gap-2">
                    <input value={name} onChange={e => setName(e.target.value)} className="bg-white/50 border border-gray-300 rounded px-2 py-1 text-sm w-full" />
                    <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value) || 1)} className="bg-white/50 border border-gray-300 rounded px-2 py-1 text-sm w-16" />
                  </div>
                </div>
              </div>

              {/* Right Page: Content */}
              <div className="p-8 relative">
                {chapter === 'wishes' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                    <div className="mb-8">
                      <p className="text-rose-600 uppercase tracking-widest text-xs font-bold mb-1">Chapitre I</p>
                      <h2 className="text-3xl font-bold text-violet-900">Les Vœux des Fées</h2>
                      <p className="italic text-violet-700/70 mt-1">Brise la cire pour libérer le vœu</p>
                      <div className="h-px bg-gradient-to-r from-gold to-transparent mt-4"></div>
                    </div>

                    <div className="flex flex-col gap-6">
                      {CONFIG.wishes.map((w, i) => (
                        <div
                          key={w.id}
                          onClick={() => setActiveWish(w)}
                          className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${readWishes.has(w.id) ? 'opacity-60 bg-gray-100' : 'bg-white hover:shadow-md hover:border-rose-300'}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${w.seal === 'rose' ? 'bg-rose-500' : w.seal === 'or' ? 'bg-yellow-600' : 'bg-violet-600'}`}>
                            {w.initial}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-violet-900">{w.fairy}</div>
                            <div className="text-xs text-violet-700/60">{w.role}</div>
                          </div>
                          <span className="text-xs text-rose-500 uppercase font-bold">Ouvrir</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {chapter === 'album' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                    <div className="mb-8">
                      <p className="text-rose-600 uppercase tracking-widest text-xs font-bold mb-1">Chapitre II</p>
                      <h2 className="text-3xl font-bold text-violet-900">L'Album des Souvenirs</h2>
                      <p className="italic text-violet-700/70 mt-1">Images qui scintillent</p>
                      <div className="h-px bg-gradient-to-r from-gold to-transparent mt-4"></div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-6">
                      <div className="relative w-full aspect-video bg-white rounded-lg shadow-xl overflow-hidden border-8 border-white">
                        <img src={CONFIG.photos[slide].src} alt="Souvenir" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-center italic">
                          {CONFIG.photos[slide].cap}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setSlide(s => (s - 1 + CONFIG.photos.length) % CONFIG.photos.length)} className="p-2 rounded-full bg-white shadow-md hover:bg-gold/20">❮</button>
                        <span className="text-sm font-bold text-violet-900">{slide + 1} / {CONFIG.photos.length}</span>
                        <button onClick={() => setSlide(s => (s + 1) % CONFIG.photos.length)} className="p-2 rounded-full bg-white shadow-md hover:bg-gold/20">❯</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setIsBookOpen(false)} className="mt-8 mx-auto block text-gold hover:text-white transition-colors text-xs uppercase tracking-widest"> Refermer le Grimoire </button>
          </section>
        )}

        {/* Spell Section */}
        <section className="mt-24 p-8 rounded-3xl bg-violet-900/40 border border-gold/30 backdrop-blur-xl shadow-2xl text-center">
          <p className="text-gold uppercase tracking-widest text-xs mb-4">Chapitre III</p>
          <h2 className="text-4xl font-bold text-white mb-4">Le Sortilège <span className="text-gold">d'Or</span></h2>
          <p className="text-rose-100/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Prononce la formule à voix haute — <em className="text-gold-bright italic">« Stellae, pluere ! »</em> — puis appuie sur le médaillon.
          </p>

          <div className="flex flex-col items-center gap-8">
            <button
              onClick={handleCastSpell}
              className="bg-gradient-to-b from-gold-bright to-gold text-brown-900 font-bold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm"
            >
              🪄 Lancer un sort magique
            </button>

            <div className="flex gap-8 text-center">
              <div>
                <b className="text-2xl text-gold block">{spellsCast}</b>
                <span className="text-[10px] uppercase text-rose-200/50 tracking-widest">Sorts lancés</span>
              </div>
              <div>
                <b className="text-2xl text-gold block">{readWishes.size}/3</b>
                <span className="text-[10px] uppercase text-rose-200/50 tracking-widest">Vœux libérés</span>
              </div>
            </div>

            {/* Cake Simulation */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2 items-end h-16">
                {Array.from({ length: age }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleBlowCandle(i)}
                    className={`w-3 h-12 rounded-t-sm transition-all ${blownCandles.has(i) ? 'bg-gray-400 opacity-50' : 'bg-gradient-to-b from-rose-200 to-rose-400 shadow-sm'}`}
                  >
                    {!blownCandles.has(i) && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-5 bg-yellow-400 rounded-full animate-pulse blur-[2px]"></div>}
                  </button>
                ))}
              </div>
              <div className="w-48 h-16 bg-gradient-to-b from-rose-100 via-pink-300 to-brown-600 rounded-t-xl rounded-b-md shadow-xl relative">
                <div className="absolute top-0 left-0 right-0 h-4 bg-white/50 rounded-t-xl"></div>
              </div>
              <p className="text-gold italic font-serif">{blownCandles.size === age ? '🎂 Vœu exaucé !' : `${age - blownCandles.size} bougie${age - blownCandles.size > 1 ? 's' : ''} à souffler…`}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Wish Overlay */}
      {activeWish && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveWish(null)}>
          <div className="relative bg-[#f8eff7] text-brown-900 p-12 rounded-lg shadow-2xl max-w-md w-full text-center animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-violet-900" onClick={() => setActiveWish(null)}>✕</button>
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold mb-4 ${activeWish.seal === 'rose' ? 'bg-rose-500' : activeWish.seal === 'or' ? 'bg-yellow-600' : 'bg-violet-600'}`}>
              {activeWish.initial}
            </div>
            <p className="text-rose-600 uppercase text-[10px] tracking-widest mb-2">{activeWish.fairy} · {activeWish.role}</p>
            <h3 className="text-2xl font-bold text-violet-900 mb-4">{activeWish.title}</h3>
            <p className="text-lg italic leading-relaxed mb-6 text-left">{fillText(activeWish.body)}</p>
            <span className="inline-block px-4 py-2 rounded-full bg-gold/20 border border-gold text-brown-800 text-xs font-bold uppercase">
              {activeWish.gift}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicGrimoireBirthday;
