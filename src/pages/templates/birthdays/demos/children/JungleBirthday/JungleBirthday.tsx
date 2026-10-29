import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Egg {
  shell: string;
  spot: string;
  name: string;
  emoji: string;
  dino: string;
  activity: string;
  title: string;
  text: string;
  from: string;
}

interface GalleryItem {
  caption: string;
  rot: string;
  tape: string;
  emoji: string;
  bg: string;
  src: string;
}

const CONFIG = {
  childName: "Léo",
  birthday: "2026-11-14T15:00:00",
  eggs: [
    { shell: "#047857", spot: "#fea619", name: "Œuf Émeraude", emoji: "🎂", dino: "Bébé T-Rex", activity: "Épreuve des Lianes", title: "Joyeux anniversaire !", text: "Mon grand explorateur, 7 ans déjà ! Tu es courageux, curieux et plein de joie. Que cette année soit remplie d'aventures, de rires et de dinosaures rigolos.", from: "— Mamie Colette 💛" },
    { shell: "#fea619", spot: "#ffffff", name: "Œuf Mandarine", emoji: "🏆", dino: "Vélociraptor", activity: "Goûter Dino-Choc", title: "Bravo, champion !", text: "Chaque année tu deviens plus fort et plus malin. Je suis très fier de toi ! Prépare-toi, on part bientôt à la chasse aux fossiles ensemble.", from: "— Papi Jean 🦖" },
    { shell: "#007488", spot: "#acedff", name: "Œuf Turquoise", emoji: "🎁", dino: "Tricératops", activity: "Chasse aux Fossiles", title: "Une année de magie !", text: "Ton sourire illumine toutes nos journées. Je te souhaite un anniversaire extraordinaire, avec plein de gâteau, de câlins et de surprises !", from: "— Tata Awa 🌺" },
    { shell: "#ffddb8", spot: "#007488", name: "Œuf Solaire", emoji: "🌟", dino: "Ptérodactyle", activity: "Piñata Volcanique", title: "Rugis de bonheur !", text: "7 ans, ça se fête en rugissant ! Merci d'être un neveu aussi génial. Hâte de jouer avec toi, grand chef de la jungle !", from: "— Tonton Yves 🦕" },
  ] as Egg[],
  gallery: [
    { caption: "Léo dompteur de T-Rex", rot: "-3deg", tape: "bg-secondary-fixed/90", emoji: "🦖", bg: "linear-gradient(135deg,#97f5cc,#047857)", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu40_RWyPOlBMDV1RrsszgU2dhAqK_ZKn44K7tKQpAy2HtnjofNsdf1A3MnwJMLRmSmY1N-QzVuowGjSlQxp9jNVzdIrWjvRmwXhquS0eCHSvUe2sc81J1Vc7gLfbLiwFvEQVpJgjelFvp03efrXUjm2ciA8S8_E-C5i9jDPEdwbJpvvlEqmahPZY9fYG8m1ltV3sAYqL5X2OctmSyKVsX4D3-739JbzEJG1NZZRz6Nu4hUpkY7GL9" },
    { caption: "Entraînement au safari", rot: "2.5deg", tape: "bg-tertiary-fixed/90", emoji: "🔭", bg: "linear-gradient(135deg,#acedff,#007488)", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCt3HUCPfFIj1Mwcy1yqo4tU8hS1vQ32but4WOmWr7rr_BLwEy_FnOGbzjP-G29xyIsx-BKI8bzI-pG-9KUuDXpTuhr8JPPP7KgqJ5bwD2ujVp50V7-2EN6gasHxTgFOToXLrIPqS6Fiw7FgXpBZIf0SNB4HOfKG4gvhGmB1qT9CAX_l3f3k72u0RVk6_YayYUMNJ65c5lCmMp-GoxFWwB9BjNsHlckwM2-83HEFwgRfSixNq6QwDb" },
    { caption: "Le rugissement secret", rot: "-2deg", tape: "bg-primary-fixed/90", emoji: "🎂", bg: "linear-gradient(135deg,#ffddb8,#fea619)", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP2FuZpJtLoHZEb1fq_B5s2lR5yVsjmtJABOqDWhuyeA-Dlkz2hxsXdY3CBg0f8Zd4TR6Fjtv322I5PfDy6hTollvCdS_8_8ocxg07OWZrL9pFA44dnMh6reV0eSAWgzYCTIyZyecoMNYMurc-uzAWD4E-SR6SA50UEdRr7Myv5Q4XxUO2HSNlDVsr3x1C5tC6pErr93YIrWPZDT9or92JulNMOtE3GqwaBMT2MgqVc89ibcbtUNEx" },
    { caption: "L'équipe Jurassique", rot: "3deg", tape: "bg-secondary-container/90", emoji: "🎉", bg: "linear-gradient(135deg,#ffb95f,#855300)", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrqh35sHCX54LI5sVSDT3-3fs-ouoCpx_FWtX9TyGt1N0e02rrubzCpcWQT7X8sYZCzaoUfXhQrTXuuf0oYkY9I6r4zfP3Rbyv9OADcY1MI2-Mnwn0VeXsDIm7DmvstFZIJ2cKJ2pTAhm5XN4C1x_cLPpdzEMs7zLpB13SahMfztLLbSdWVYLupPMaHtsavnAHYNgEIUaPI5GhKw-0KHlDc4PZusy9G5BBstDlcSgDSJoQHBa0bFdB" },
  ] as GalleryItem[],
  secret: {
    text: "Félicitations aventurier Léo ! Tu as bravé la jungle préhistorique avec brio. Les billets d'or pour le grand parc Dino-Land et la méga fête jurassique t'attendent ! Prépare tes chaussures d'explorateur et ton sac à dos !",
    from: "Signé : Papa & Maman Dino"
  }
};

const JungleBirthday: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [foundDinos, setFoundDinos] = useState(new Set<number>());
  const [activeWish, setActiveWish] = useState<Egg | null>(null);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [brokenEggs, setBrokenEggs] = useState(new Set<number>());

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(CONFIG.birthday);
      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ d: '00', h: '00', m: '00', s: '00' });
      } else {
        const s = Math.floor(diff / 1000);
        setTimeLeft({
          d: String(Math.floor(s / 86400)).padStart(2, '0'),
          h: String(Math.floor((s % 86400) / 3600)).padStart(2, '0'),
          m: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
          s: String(s % 60).padStart(2, '0'),
        });
      }
    }, 1000);

    gsap.from(".hero-in", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.6)" });
    gsap.to(".egg-stage", { y: -6, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3 });

    return () => clearInterval(timer);
  }, []);

  const handleBreakEgg = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (brokenEggs.has(index)) {
      setActiveWish(CONFIG.eggs[index]);
      return;
    }

    setBrokenEggs(prev => new Set(prev).add(index));
    const egg = CONFIG.eggs[index];
    const stage = e.currentTarget.querySelector('.egg-stage');

    if (stage) {
      const tl = gsap.timeline({
        onComplete: () => {
          setActiveWish(egg);
        }
      });

      tl.to(stage, { rotation: 10, duration: 0.07, repeat: 7, yoyo: true, ease: "sine.inOut" })
        .to(stage, { rotation: 0, duration: 0.08 })
        .to(stage.querySelector('.egg-top'), { y: -46, x: -26, rotation: -28, duration: 0.6, ease: "back.out(2)" }, "<")
        .to(stage.querySelector('.egg-bottom'), { y: 10, x: 4, rotation: 5, duration: 0.6, ease: "back.out(2)" }, "<")
        .to(stage.querySelector('.egg-inside'), { scale: 1, rotation: 360, duration: 0.7, ease: "back.out(2)" }, "<.1");
    }
  };

  const handleFindDino = (id: number) => {
    if (foundDinos.has(id)) return;
    setFoundDinos(prev => {
      const next = new Set(prev).add(id);
      if (next.size === 3) setShowSecret(true);
      return next;
    });
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-sm">
        <div className="h-16 px-4 max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative flex items-center justify-center p-2 bg-secondary-fixed rounded-full shadow-sm">
              <span className="material-symbols-outlined text-primary text-lg">forest</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-headline-sm text-primary truncate">Programme Aventuriers</h1>
                <span className="bg-secondary-container text-on-secondary-fixed text-xs px-2 py-0.5 rounded-full">7 ANS !</span>
              </div>
              <span className="text-xs text-on-surface-variant truncate">L'Expédition Dino de {CONFIG.childName}</span>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1 bg-surface-container-lowest rounded-full px-3 py-1 shadow-sm text-primary text-sm">
            <span>🦖</span><span>{foundDinos.size}/3</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col relative w-full max-w-5xl mx-auto pt-16 pb-24">
        <div className="flex flex-col w-full px-4 gap-6 pb-10">

          <section className="relative w-full overflow-hidden rounded-lg bg-surface-container-low shadow-md p-6 md:p-12 flex flex-col items-center text-center mt-2">
            <div className="hero-in inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full shadow-sm mb-2 rotate-[-2deg]">
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="text-xs tracking-wider uppercase font-bold">Super Explorateur !</span>
            </div>

            <div className="hero-in relative w-28 h-28 my-1 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-fixed rounded-full shadow-sm animate-bounce" style={{ animationDuration: '3s' }}></div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS1Yh8ncsSrPliDSrkddXahi4zDP_Q6ns5c0yLtHAws_FAbS0_QsLvdSPEXmBZFGtmlkgjehAZzHcVFrC0oF_p67GOkN2gYnKvdTtf5beu1xa8UdQcJIhswmkHp-oF2bixXm0Pge9IXoiyjqjI90WEYHHpHCj-2k-bmgGfNQuuGVAvB-kg_Lg4DIzpLvWWApM06GO5kw-EYwA98NiFM78UsZnIe0-wuu7DSM9tnKCICcL7_QLdKl-Y"
                   className="relative z-10 w-24 h-24 object-contain drop-shadow-md" alt="Mascotte" />
            </div>

            <h2 className="hero-in text-3xl md:text-5xl text-primary tracking-tight mt-2 leading-tight">
              L’Aventure de {CONFIG.childName}
            </h2>
            <div className="hero-in inline-block bg-tertiary-fixed text-on-tertiary-fixed text-lg px-4 py-0.5 rounded-full shadow-sm mt-1 mb-2">7 ANS !</div>
            <p className="hero-in text-on-surface-variant max-w-xs md:max-w-md mb-4">
              Rejoins la brigade des aventuriers pour une journée pleine de rugissements et de mystères jurassiques ! 🦕🌿
            </p>

            <div className="hero-in w-full max-w-xl bg-surface-container rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center gap-1 mb-2 text-primary text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">alarm</span><span>Coup d'envoi de l'expédition</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-primary-container text-on-primary-container rounded-lg p-2 flex flex-col items-center shadow-sm">
                  <span className="text-xl font-black leading-none">{timeLeft.d}</span>
                  <span className="text-xs mt-1">Jours</span>
                </div>
                <div className="bg-secondary-container text-on-secondary-fixed rounded-lg p-2 flex flex-col items-center shadow-sm">
                  <span className="text-xl font-black leading-none">{timeLeft.h}</span>
                  <span className="text-xs mt-1">Heures</span>
                </div>
                <div className="bg-secondary-fixed-dim text-on-secondary-container rounded-lg p-2 flex flex-col items-center shadow-sm">
                  <span className="text-xl font-black leading-none">{timeLeft.m}</span>
                  <span className="text-xs mt-1">Min</span>
                </div>
                <div className="bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-lg p-2 flex flex-col items-center shadow-sm">
                  <span className="text-xl font-black leading-none">{timeLeft.s}</span>
                  <span className="text-xs mt-1">Sec</span>
                </div>
              </div>
            </div>
            <button onClick={() => handleFindDino(0)} className="absolute left-2 bottom-2 opacity-40 hover:opacity-100 transition-opacity text-2xl" aria-label="Dino caché">🦎</button>
          </section>

          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-lg">map</span>
                </div>
                <h3 className="text-lg text-primary font-bold">La Carte aux Trésors</h3>
              </div>
              <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant shadow-sm">Touche les œufs ! 🥚</span>
            </div>
            <div className="relative bg-surface-container-lowest rounded-lg p-6 shadow-sm overflow-hidden">
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 z-10">
                {CONFIG.eggs.map((egg, i) => (
                  <div
                    key={i}
                    onClick={(e) => handleBreakEgg(i, e)}
                    className="flex flex-col items-center justify-center p-4 pt-6 bg-surface-container rounded-lg shadow-sm cursor-pointer select-none group"
                  >
                    <div className="egg-stage relative w-20 h-24 mx-auto">
                      <div className="egg-glow absolute inset-0 bg-orange-200 rounded-full opacity-0 pointer-events-none"></div>
                      <div className="egg-inside absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 text-4xl z-10">{egg.emoji}</div>
                      <div className="egg-bottom absolute inset-0 rounded-full bg-current" style={{ background: `radial-gradient(circle at 24% 26%,${egg.spot} 0 9%,transparent 10%), ${egg.shell}` }}></div>
                      <div className="egg-top absolute inset-0 rounded-full bg-current" style={{ background: `radial-gradient(circle at 24% 26%,${egg.spot} 0 9%,transparent 10%), ${egg.shell}` }}></div>
                      <div className="egg-q absolute inset-0 flex items-center justify-center z-20 text-2xl font-bold text-white">?</div>
                    </div>
                    <span className="text-xs text-primary mt-2 font-bold text-center">{brokenEggs.has(i) ? egg.dino : egg.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => handleFindDino(1)} className="absolute right-4 top-44 opacity-40 hover:opacity-100 transition-opacity text-2xl" aria-label="Dino caché">🦖</button>
          </section>

          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                </div>
                <h3 className="text-lg text-primary font-bold">Les Souvenirs de l'Explorateur</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2 pb-4">
              {CONFIG.gallery.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setActivePhoto(p)}
                  className="polaroid relative bg-surface-container-lowest p-2 pb-3 rounded-lg shadow-sm cursor-zoom-in transition-transform hover:scale-110"
                  style={{ transform: `rotate(${p.rot})` }}
                >
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 ${p.tape} rounded-sm z-20`}></div>
                  <div className="w-full aspect-square rounded overflow-hidden mb-1.5 shadow-sm">
                    <img src={p.src} alt={p.caption} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-primary text-center">{p.caption}</p>
                </div>
              ))}
            </div>
            <button onClick={() => handleFindDino(2)} className="absolute left-2 bottom-2 opacity-40 hover:opacity-100 transition-opacity text-2xl" aria-label="Dino caché">🦕</button>
          </section>

          <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed shadow-sm">
                <span className="material-symbols-outlined text-lg">travel_explore</span>
              </div>
              <h3 className="text-lg text-primary font-bold">Mission Secrète des Aventuriers</h3>
            </div>
            <div className="bg-surface-container-low rounded-lg p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
              <div className="flex items-center justify-between bg-surface-container p-3 rounded-lg shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase">Avancement de piste</span>
                  <span className="text-base text-primary font-bold">Dinosaures trouvés : {foundDinos.size} / 3 {foundDinos.size === 3 ? '✨' : ''}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0,1,2].map(id => (
                    <div key={id} className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${foundDinos.has(id) ? 'bg-primary-fixed' : 'bg-surface-container-highest grayscale opacity-60'}`}>
                      {['🦎','🦖','🦕'][id]}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-on-surface-variant">
                Trois petits dinosaures se cachent sur cette page : un tout en haut, un au milieu, un en bas. Retrouve-les tous pour débloquer la surprise ! 👀
              </p>
              {showSecret && (
                <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm mt-2 animate-bounce">
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <span className="material-symbols-outlined text-xl">celebration</span>
                    <span className="text-lg font-bold">MESSAGE CODÉ DÉCRYPTÉ !</span>
                  </div>
                  <p className="text-base text-on-surface leading-relaxed">« {CONFIG.secret.text} »</p>
                  <div className="flex items-center justify-end gap-2 mt-2 text-primary font-bold">
                    <span>{CONFIG.secret.from}</span>
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {activeWish && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveWish(null)}>
          <div className="relative bg-surface-container-lowest rounded-lg shadow-lg max-w-md w-full p-8 text-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center" onClick={() => setActiveWish(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-6xl mb-2">{activeWish.emoji}</div>
            <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed text-xs px-3 py-0.5 rounded-full shadow-sm mb-2">
              🦕 {activeWish.dino} · {activeWish.activity}
            </span>
            <h3 className="text-xl text-primary font-bold mb-2">{activeWish.title}</h3>
            <p className="text-lg text-on-surface leading-relaxed">{activeWish.text}</p>
            <p className="mt-4 text-lg text-secondary font-bold">{activeWish.from}</p>
          </div>
        </div>
      )}

      {activePhoto && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActivePhoto(null)}>
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button className="absolute -top-3 -right-1 z-10 w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center" onClick={() => setActivePhoto(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="bg-surface-container-lowest p-3 rounded-lg shadow-lg">
              <img src={activePhoto.src} alt={activePhoto.caption} className="w-full max-h-[70vh] object-contain rounded overflow-hidden" />
              <p className="text-lg text-primary text-center mt-2 font-bold">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JungleBirthday;
