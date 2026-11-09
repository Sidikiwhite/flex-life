# Checklist de QA visuelle

À exécuter avant de déclarer un template, une page ou un composant terminé. Cocher chaque ligne ou justifier explicitement pourquoi elle ne s'applique pas.

## 1. Direction artistique

- [ ] Le brief de direction artistique est rempli.
- [ ] Une seule émotion dominante est identifiable.
- [ ] La palette a des rôles, pas seulement des couleurs.
- [ ] La typographie a une hiérarchie claire.
- [ ] Une matière ou un traitement dominant est assumé.
- [ ] Le rendu ne coche pas 3 signes de « vibe code ».

## 2. Premier écran

- [ ] Le message principal est compris en moins de 3 secondes.
- [ ] Une action prioritaire est évidente.
- [ ] Le hero n'est pas une accumulation de badges, boutons et cartes.
- [ ] L'image principale est nette, bien cadrée et utile.
- [ ] Le texte reste lisible sur l'image (contraste, voile, zone calme).
- [ ] Le premier écran fonctionne à 320, 390 et 1440 px.

## 3. Layout et rythme

- [ ] La grille est identifiable.
- [ ] Les sections n'ont pas toutes la même structure.
- [ ] Les espacements suivent une échelle (4/8 px).
- [ ] Les alignements sont francs.
- [ ] Les largeurs de contenu sont cohérentes.
- [ ] Il n'y a pas de « card soup » (trop de cartes identiques).
- [ ] L'asymétrie, si présente, est intentionnelle.
- [ ] Le footer n'est pas un dépotoir de liens.

## 4. Typographie

- [ ] Maximum 2 familles principales + 1 accent décoratif optionnel.
- [ ] 5 à 7 niveaux hiérarchiques maximum.
- [ ] Les titres ne se cassent pas mal sur mobile.
- [ ] Les lignes de texte font 45 à 75 caractères.
- [ ] Les hauteurs de ligne sont adaptées (titres serrés, texte aéré).
- [ ] Les graisses sont utilisées avec parcimonie.
- [ ] Aucun texte en gris trop clair.
- [ ] Les majuscules et interlettrages ne nuisent pas à la lecture.

## 5. Couleurs et surfaces

- [ ] Un seul accent dominant.
- [ ] Les contrastes texte/fond sont AA.
- [ ] Les bordures, ombres et rayons sont cohérents.
- [ ] Les surfaces ne sont pas toutes transparentes ou floutées.
- [ ] Les dégradés, s'il y en a, ont une intention.
- [ ] Les états hover/focus ne reposent pas uniquement sur la couleur.

## 6. Contenu

- [ ] Pas de lorem ipsum.
- [ ] Pas de faux témoignages, faux logos ou faux chiffres non assumés.
- [ ] Les noms, dates, lieux et descriptions sont crédibles.
- [ ] La copy évite les clichés IA.
- [ ] Les microcopy d'erreur, succès et aide existent.
- [ ] Les états vides sont conçus.
- [ ] Le contenu fictif est clairement identifié comme démo si nécessaire.
- [ ] Un titre long, un nom long et une adresse longue tiennent.

## 7. Composants et interactions

- [ ] Les boutons ont une hiérarchie claire.
- [ ] Chaque élément interactif a un état focus visible.
- [ ] Les formulaires ont des labels visibles.
- [ ] La validation est compréhensible.
- [ ] Les messages de succès et d'erreur sont visibles.
- [ ] Les liens ressemblent à des liens.
- [ ] Les icônes sont cohérentes (pas d'emojis par défaut).
- [ ] Les états désactivés et chargements sont prévus si pertinent.

## 8. Responsive

- [ ] Testé à 320 px.
- [ ] Testé à 390 px.
- [ ] Testé à 768 px.
- [ ] Testé à 1024 px.
- [ ] Testé à 1440 px.
- [ ] Aucun débordement horizontal.
- [ ] Aucun texte coupé ou superposé.
- [ ] Les cibles tactiles font au moins 44 px.
- [ ] Le menu mobile s'ouvre, se ferme, se ferme au clic extérieur et avec Échap.
- [ ] Le viewport mobile utilise `svh`/`dvh` si nécessaire.

## 9. Accessibilité

- [ ] Structure sémantique correcte (`header`, `main`, `section`, `footer`).
- [ ] Ordre des titres logique.
- [ ] Images avec `alt` utile.
- [ ] Formulaires avec labels et `autocomplete` pertinent.
- [ ] Navigation clavier complète.
- [ ] Focus visible et contrasté.
- [ ] `prefers-reduced-motion` respecté.
- [ ] Pas de texte porteur d'information uniquement en image.

## 10. Performance et robustesse

- [ ] Images dimensionnées et optimisées.
- [ ] `aspect-ratio` ou dimensions pour éviter le layout shift.
- [ ] Chargement différé des images hors premier écran si pertinent.
- [ ] Pas de bibliothèque lourde pour un besoin trivial.
- [ ] Pas de `console.log` oublié.
- [ ] Pas de `!important` gratuit.
- [ ] Pas de `transition: all`.
- [ ] Pas de `z-index` absurde.
- [ ] Pas de code mort.
- [ ] `tsc`/build/tests passent si le projet en a.

## 11. Preuve de finition

- [ ] Capture desktop inspectée.
- [ ] Capture mobile inspectée.
- [ ] Section intérieure inspectée.
- [ ] Footer inspecté.
- [ ] Test fonctionnel des interactions principales effectué.
- [ ] Le résultat correspond au brief.
- [ ] Une section inutile a été supprimée ou fusionnée.

## Verdict

- [ ] **Prêt à livrer.**
- [ ] **À retravailler** : lister les 3 corrections prioritaires.
