---
name: Anti-Vibe-Coding
description: Garde-fou de direction artistique et de qualité visuelle pour tout template, démo, landing page, catalogue, page ou composant UI. À charger systématiquement avec les autres skills de design avant de créer, refondre ou valider une interface, pour éviter le rendu générique « site généré par IA ».
---

# Anti-Vibe-Coding

## Mission

Ce skill n'est pas un style. C'est une couche de qualité qui s'ajoute aux autres skills de design.

Objectif : produire des interfaces qui semblent avoir été **dirigées**, pas générées. Une interface doit ressembler à une décision de design, pas à un prompt.

## Contrat d'utilisation

- Charger ce skill pour **tout** travail de template, démo, landing page, catalogue, page de vente, formulaire ou composant UI.
- Le charger **en plus** du skill de design pertinent (`ui-ux-design-system`, `saas-product-ui-system`, `saas-ui-ux-designer-with-flex`, etc.).
- L'appliquer **avant** de coder, **pendant** la composition et **avant** de déclarer une tâche terminée.
- En cas de conflit, garder les objectifs du skill de design, mais appliquer les garde-fous de celui-ci.
- Ne jamais livrer une interface sans avoir fait la QA visuelle décrite plus bas.

## Règle d'or

> Si une section pourrait être remplacée par une autre sans que personne ne le remarque, elle n'a pas de direction artistique.

## Étape 0 — Reconnaître le « vibe code »

Un rendu est suspect dès qu'il cumule **trois signes ou plus** parmi les suivants. Il faut alors corriger la direction, pas juste changer une couleur.

| Signe | Correction |
|---|---|
| Dégradé violet/bleu, glow néon ou orbes flous sans intention | Revenir à une palette à rôles, avec une seule couleur d'accent |
| Glassmorphism, `backdrop-filter` et cartes translucides partout | Choisir une matière dominante : papier, photo, trait, grain ou ombre |
| Toutes les sections sont des grilles de cartes identiques | Varier les rythmes : éditorial, asymétrique, liste, pleine largeur |
| Tout est centré, tout est arrondi, tout flotte | Poser une grille, des alignements francs et une famille de rayons |
| Une seule police sans hiérarchie, ou 4 polices décoratives | Maximum 2 familles principales + 1 accent décoratif, avec une échelle claire |
| Emojis utilisés comme icônes | Icônes SVG cohérentes, ou aucun icône |
| Lorem ipsum, « John Doe », faux témoignages, faux logos | Contenu spécifique, crédible, vérifiable ou clairement fictif |
| Copy vague : « élevez votre expérience », « solution innovante » | Bénéfice concret, preuve, détail, lieu, date, chiffre |
| Animations sur chaque section, parallaxe, curseur custom | 1 à 3 mouvements utiles maximum, avec `prefers-reduced-motion` |
| Photos aléatoires, crops incohérents, aucune traitement | Une direction photo : même lumière, même cadrage, même traitement |
| Mobile débordant, texte coupé, cibles < 44 px | Tester 320, 390, 768, 1024 et 1440 px |
| Formulaire sans labels, sans états, sans validation | Labels visibles, aide, erreur, succès, focus clavier |
| `overflow-x: hidden` pour cacher un vrai bug de layout | Corriger la source du débordement |
| `transition: all`, `z-index: 9999`, `!important` | Transitions explicites, empilement maîtrisé, styles propres |
| `100vh` sur mobile sans fallback | `100svh` / `100dvh` avec fallback |
| `outline: none` sans focus visible | Focus visible et contrasté |
| Loader, badge « New » ou icône sparkles sans fonction | Supprimer ou justifier |

## Étape 1 — Brief de direction artistique

Avant d'écrire du code, produire un brief de 8 lignes maximum. Utiliser `references/art-direction-brief.md` si nécessaire.

1. **Sujet** : qui, quoi, où, pour qui ?
2. **Émotion** : une seule sensation dominante (calme, désir, confiance, fête, intime…).
3. **Ancrages** : 3 références concrètes hors concurrence (édition, hôtellerie, architecture, mode, print, cinéma).
4. **Palette** : fond, encre, accent, surface, bordure. Décrire les rôles, pas seulement les hex.
5. **Typographie** : 1 display + 1 texte + 1 accent optionnel maximum, avec graisses et échelle.
6. **Matière** : photo, papier, grain, trait, ombre, transparence. Une seule matière dominante.
7. **Mouvement** : ce qui bouge, pourquoi, et ce qui ne bouge pas.
8. **Refus** : 3 choses que l'interface ne fera pas (ex. pas de dégradé, pas de glass, pas de card soup).

Sans brief, ne pas coder.

## Étape 2 — Poser un système

### Couleurs

- 1 couleur dominante, 1 accent, 2 à 4 neutres. Pas 12 nuances de gris.
- Définir des tokens CSS : `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-strong`.
- Vérifier les contrastes AA. Le texte courant ne doit jamais être gris clair sur blanc.
- Utiliser l'accent pour guider l'action et le regard, pas pour décorer chaque bordure.

### Typographie

- 2 familles principales maximum (display + texte) + 1 accent décoratif optionnel.
- 5 à 7 niveaux maximum : display, h1, h2, h3, body, small, caption.
- Échelle fluide avec `clamp()` pour les grands titres.
- Hauteur de ligne : 1.05–1.2 pour les titres, 1.5–1.7 pour le texte.
- Largeur de lecture : 45–75 caractères.
- Éviter les titres sur 4 lignes par manque d'anticipation responsive.
- Une police script ou décorative reste un accent, jamais le texte courant.

### Espacement et grille

- Base 4 ou 8 px. Ne pas inventer 13, 27, 43 px.
- Grille 12 colonnes desktop, 4 mobile, ou grille éditoriale assumée.
- Une section = un rythme. Toutes les sections ne doivent pas avoir la même hauteur, le même padding et le même titre centré.
- Utiliser l'asymétrie avec intention : image large + texte étroit, numérotation, filets, marges décalées.
- Éviter les `max-width` différents sur chaque bloc sans raison.

### Rayons, bordures, ombres

- Choisir une famille de rayons : 0, 2, 4, 8 px. Les mélanger donne un rendu amateur.
- 0 à 2 niveaux d'ombre maximum. Si tout flotte, rien ne flotte.
- Une bordure fine + un fond légèrement différent suffisent souvent à créer une surface.
- Ne pas mettre une ombre, une bordure et un rayon sur chaque carte par réflexe.

### Images

- Une direction photo cohérente : même température, même contraste, même cadrage.
- Définir des ratios stables (`aspect-ratio`) et des `object-fit: cover`.
- Prévoir `width`/`height` ou `aspect-ratio` pour éviter le layout shift.
- Ajouter des `alt` utiles, pas des descriptions décoratives inutiles.
- Ne pas utiliser une photo générique si elle ne raconte rien.

## Étape 3 — Composer

### Hero

- Un seul message principal, une seule action prioritaire.
- Le hero ne doit pas être automatiquement centré avec deux boutons et trois badges.
- Vérifier le premier écran à 320, 390 et 1440 px : le message principal et l'action doivent rester lisibles.
- Si une image porte l'émotion, la laisser respirer ; ne pas la recouvrir de trois calques.

### Sections

- Alterner les échelles : pleine largeur, contenu étroit, deux colonnes, liste éditoriale.
- Une section = une idée. Pas de section « fonctionnalités » avec 6 cartes si 3 suffisent.
- Éviter les grilles de 3 cartes identiques comme solution par défaut.
- Utiliser des filets, numéros, légendes, citations et marges pour créer de la structure sans ajouter de composants.

### Composants

- Chaque composant interactif a : repos, survol, focus, actif, désactivé, chargement, erreur si pertinent.
- Les boutons ont une hiérarchie : primaire, secondaire, tertiaire. Pas 5 boutons primaires.
- Les formulaires ont des labels visibles, une aide, une validation et un message de succès.
- Les états vides et les erreurs sont conçus, pas laissés au hasard.

### Responsive

- Concevoir mobile d'abord, puis élargir.
- Tester au minimum : 320, 390, 768, 1024, 1440 px.
- Aucun débordement horizontal. Ne pas masquer un bug avec `overflow-x: hidden`.
- Cibles tactiles ≥ 44 px.
- Pas de `height: 100vh` sans `100svh`/`100dvh`.
- Les textes longs, les noms longs et les traductions doivent tenir.

## Étape 4 — Écrire du vrai contenu

- Utiliser des noms, dates, lieux, prix, descriptions et contraintes crédibles.
- Éviter les clichés IA : « élevez », « libérez », « révolutionnez », « expérience immersive », « solution sur mesure » sans preuve.
- Une promesse doit être suivie d'une preuve ou d'un détail concret.
- Écrire les microcopy : erreurs, succès, aide, état vide, confirmation.
- Ne pas inventer de faux témoignages, faux logos ou faux chiffres.
- Si le contenu est fictif, l'assumer clairement dans la démo.

## Étape 5 — Mouvement

- 1 à 3 mouvements utiles maximum : entrée de section, transition de menu, feedback de formulaire.
- Pas de parallaxe, de scroll-jacking, de curseur custom ou de rotation infinie par défaut.
- Durées : 150–300 ms pour le feedback, 400–800 ms pour les entrées.
- Respecter `prefers-reduced-motion`.
- Ne jamais retarder l'accès au contenu pour une animation.

## Étape 6 — QA visuelle obligatoire

Avant de déclarer terminé :

1. Capturer le premier écran desktop (1440) et mobile (390).
2. Capturer au moins une section intérieure et le footer.
3. Vérifier 320 px : pas de débordement, pas de texte coupé.
4. Vérifier la hiérarchie : le regard sait où aller en moins de 3 secondes.
5. Vérifier les contrastes, le focus clavier, les labels et les états de formulaire.
6. Vérifier le rendu avec un titre long, un nom long et un texte vide.
7. Vérifier que le menu mobile s'ouvre, se ferme, se ferme au clic extérieur et avec Échap.
8. Vérifier `prefers-reduced-motion`.
9. Relire le code : pas de `transition: all`, pas de `!important` gratuit, pas de `z-index` absurde, pas de code mort.
10. Comparer avec le brief : si une section ne sert pas l'émotion ou la promesse, la supprimer.

Utiliser `references/visual-qa-checklist.md` pour la version détaillée.

## Definition of done

Une interface est terminée seulement si :

- [ ] Le brief de direction artistique existe.
- [ ] Le système de tokens est posé.
- [ ] Le contenu est spécifique et crédible.
- [ ] Les états interactifs sont conçus.
- [ ] Le responsive est testé à 320, 390, 768, 1024 et 1440 px.
- [ ] Aucun débordement horizontal.
- [ ] Les contrastes et le focus clavier sont valides.
- [ ] Le mouvement est limité et `prefers-reduced-motion` est géré.
- [ ] Les captures desktop/mobile ont été inspectées.
- [ ] Le rendu ne coche pas 3 signes de « vibe code ».

## Fichiers de référence

- `references/art-direction-brief.md` : brief à remplir avant de coder.
- `references/visual-qa-checklist.md` : checklist détaillée de fin de tâche.
