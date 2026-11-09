# Instructions projet

## Templates et interfaces

- Pour **toute** tâche de template, démo, landing page, catalogue, page, formulaire ou composant UI, charger le skill `anti-vibe-coding` avec l'outil `skill` **avant** de coder.
- Le charger **en plus** du skill de design pertinent (`ui-ux-design-system`, `saas-product-ui-system`, `saas-ui-ux-designer-with-flex`, etc.).
- Ne pas attendre que l'utilisateur le demande : c'est une étape obligatoire du workflow.
- Appliquer sa direction artistique, son système de tokens et sa checklist de QA visuelle.
- Si le skill n'est pas disponible dans la session, lire directement `.opencode/skills/anti-vibe-coding/SKILL.md` et appliquer son contenu.

## Règles non négociables

- Pas de dégradé décoratif, de glow néon, de glassmorphism ou d'orbes flous par défaut.
- Pas de « card soup » : éviter les grilles de cartes identiques comme solution par défaut.
- Pas d'emoji utilisé comme icône, sauf choix assumé et cohérent.
- Pas de lorem ipsum, de faux témoignages, de faux logos ou de copy générique.
- Pas d'animation sur chaque section ; respecter `prefers-reduced-motion`.
- Toujours tester 320, 390, 768, 1024 et 1440 px.
- Aucun débordement horizontal, aucun texte coupé, cibles tactiles ≥ 44 px.
- Focus clavier visible, formulaires avec labels, contrastes AA.
- Ne pas utiliser `overflow-x: hidden` pour masquer un bug de layout.
- Ne pas livrer une interface sans captures desktop/mobile inspectées.

## Vérification

- Lancer `npx tsc --noEmit` et le build avant de déclarer une tâche terminée.
- Pour les templates autonomes, vérifier aussi l'accès aux fichiers statiques (HTML, CSS, JS, images, vignette).
- Résumer les contrôles effectués dans la réponse finale.
