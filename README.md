# Fonte

Web app (PWA) de suivi de musculation pour iPhone, pensée pour être utilisée **pendant la séance**, à une main, même sans réseau.

Aucune dépendance externe, aucun serveur, aucun compte : tout tient dans une page HTML et les données restent sur le téléphone.

## Fonctionnalités

**Pendant la séance**
- Démarrage depuis un modèle de séance, date et heure enregistrées automatiquement.
- Pour chaque exercice : réglages machine (modifiables d'un tap) et performance de la dernière fois.
- Chaque série est pré-remplie avec le poids et les reps de la même série la fois précédente.
- Ajustement par gros boutons +/− (poids au pas de l'exercice, reps ±1), ou saisie directe en touchant le chiffre.
- Bouton « ✓ Série » : enregistre la série et lance le minuteur de repos (grand compte à rebours, bip et flash à la fin, ±15 s, bouton Passer).
- Ajout de séries, de dégressives (plusieurs paliers), rep partielle (aucune / début / presque) et note d'exécution.
- Exercices « durée » (ex. suspension à la barre) avec chrono intégré.
- **Variantes** : un créneau du modèle peut proposer plusieurs exercices (ex. Tirage vertical ou Tractions). On choisit en séance ; chaque variante a son propre historique. Par défaut, l'app propose la dernière faite.
- « Faire un autre exercice à la place » : remplace l'exercice du jour et l'ajoute aux variantes du modèle.
- Renommer un exercice qui a un historique : l'app demande s'il s'agit du même exercice ou d'un nouveau (historique séparé).
- Badge 🏆 immédiat en cas de record : poids max, reps à un poids donné, 1RM estimé (formule d'Epley, reps complètes uniquement).
- Écran maintenu allumé (Wake Lock API).
- Reprise automatique si l'app est fermée en cours de séance, minuteur compris.

- **EMOM** : un exercice peut être réglé en EMOM (nombre de tours, durée d'un tour). Décompte de 5 s, bip à chaque tour, saisie des reps tour par tour ; chaque tour est enregistré comme une série.
- **Suggestion de charge** (double progression) : fourchette de reps par exercice (8-12 par défaut). Si toutes les séries de la dernière fois ont atteint le max, la séance suivante est pré-remplie avec +1 pas de poids et les reps au bas de la fourchette.
- **Résumé de fin de séance** comparé à la dernière séance du même modèle : volume, reps, progression ou recul par exercice.

**Historique et progrès**
- Liste des séances passées, détail consultable et modifiable : séries, date, ajout ou retrait d'un exercice, et « ⇄ Changer » pour rattacher des séries à un autre exercice (les records sont recalculés).
- Par exercice : courbe du poids max et du 1RM estimé, volume par séance (poids × reps), meilleures reps par poids, chronologie des records.
- Séries par muscle : 7 derniers jours comparés à la moyenne hebdomadaire des 4 semaines précédentes (muscle principal choisi pour chaque exercice).
- Fréquence : séances par semaine (12 dernières semaines) et calendrier type heatmap (18 semaines).

**Alerte de fin de repos** (Réglages → Alerte de fin de repos)
- **Minuteur iOS** (par défaut) : chaque série validée lance le Raccourci « Repos Fonte », qui démarre le minuteur natif de l'iPhone. Il sonne app fermée ou écran verrouillé, par-dessus la musique. Guide de création du raccourci et bouton « Tester » dans les réglages. Tant que le test n'a pas été fait, Fonte bipe seulement quand elle est ouverte.
- **Audio** (expérimental) : piste générée de la durée du repos (silence puis bip), mixée avec la musique via `navigator.audioSession.type = "ambient"` quand c'est disponible.
- **Dans l'app** : bip uniquement quand Fonte est à l'écran.

**Séances libres**
- « + Séance libre » (accueil ou historique) : date, groupes musculaires, durée et note facultatives, sans séries ni poids.
- Comptées dans la fréquence (barres hebdo et calendrier, en vert), exclues des records et des courbes par exercice. Modifiables et supprimables depuis l'historique.
- Chaque modèle de séance a ses groupes musculaires (devinés depuis son nom, modifiables). Stat « Séances par groupe musculaire » sur 4 semaines, 3 mois ou tout.

**Bilan pour Claude** (onglet Progrès)
- Résumé texte compact sur 2, 4 ou 8 semaines : nombre de séances, groupes travaillés, meilleure série par exercice comparée à la période précédente, tendance, records, reps partielles et dégressives, notes. Boutons Copier et Partager.

**Sauvegarde**
- « Sauvegarder » exporte un fichier JSON via le menu Partager d'iOS (choisir « Enregistrer dans Fichiers » puis iCloud Drive).
- « Restaurer » réimporte ce fichier et remplace les données actuelles.
- Bandeau de rappel si la dernière sauvegarde date de plus de 7 jours.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application : HTML, CSS et JavaScript |
| `sw.js` | Service worker : met l'app en cache pour le hors ligne |
| `manifest.json` | Nom, couleurs et icônes de l'app installée |
| `apple-touch-icon.png` | Icône de l'écran d'accueil iPhone (180 px) |
| `icon-192.png`, `icon-512.png` | Icônes du manifest |

## Publier sur GitHub Pages

1. Sur [github.com](https://github.com), créer un dépôt **public** nommé `fonte`.
2. Cliquer sur **uploading an existing file** et glisser tous les fichiers de ce dossier (les fichiers, pas le dossier), puis **Commit changes**.
3. Aller dans **Settings → Pages**, choisir la branche `main` et le dossier `/ (root)`, puis **Save**.
4. Après 1 à 2 minutes, l'app est en ligne à l'adresse `https://<ton-pseudo>.github.io/fonte/`.

## Installer sur iPhone

1. Ouvrir l'adresse dans **Safari** (obligatoire, pas Chrome).
2. Bouton Partager → **Sur l'écran d'accueil** → **Ajouter**.
3. Lancer l'app une première fois depuis l'icône avec du réseau. Ensuite elle fonctionne entièrement hors ligne.

## Mettre à jour l'app

1. Modifier le fichier voulu et le renvoyer sur GitHub (glisser-déposer au même endroit, il remplace l'ancien).
2. Sur l'iPhone, ouvrir l'app avec du réseau : la nouvelle version est téléchargée en arrière-plan et s'affiche au lancement suivant.

Si une mise à jour semble bloquée, augmenter le numéro de `CACHE` en haut de `sw.js` (par exemple `fonte-v3` → `fonte-v4`) force le renouvellement du cache.

Les données ne sont pas touchées par une mise à jour.

## Données

Stockées en **IndexedDB**, uniquement sur le téléphone, dans l'app installée.

⚠️ **Supprimer l'icône de l'écran d'accueil efface les données.** D'où la sauvegarde régulière.

Structure :

- **Exercice** : nom, type (`load` = charge / `time` = durée), kg par bras (oui/non), pas d'incrément (défaut 1,25 kg), repos (défaut 90 s), séries prévues, durée cible, réglages machine, note.
- **Modèle de séance** : nom et liste ordonnée d'exercices.
- **Séance** : modèle d'origine, début, fin, et pour chaque exercice ses séries.
- **Série** : poids (`w`), reps complètes (`r`), durée (`s`), rep partielle (`p` : `none` / `start` / `almost`), dégressives (`d` : liste de `{w, r}`), note (`n`), records battus (`pr`).

Le fichier de sauvegarde JSON contient `exercises`, `templates` et `sessions`.

## Calculs

- **1RM estimé (Epley)** : `poids × (1 + reps / 30)`, et simplement le poids si 1 rep. Reps complètes uniquement.
- **Volume** : somme de `poids × reps` des séries et des dégressives, multipliée par 2 pour les exercices en kg/bras (charge totale déplacée).
- **Records** : comparés à toutes les séries précédentes du même exercice (séances passées et séries précédentes de la séance en cours). Pas de badge lors de la toute première séance d'un exercice.
- **Par bras / ensemble** : choix obligatoire à la création d'un exercice à charge.

## Limites connues

- Le bip respecte l'interrupteur silencieux de l'iPhone ; le flash visuel fonctionne toujours.
- Si l'app passe en arrière-plan, le bip de fin de repos ne sonne pas, mais le compte à rebours reste juste au retour.
- L'écran maintenu allumé fonctionne dans l'app installée à partir d'iOS 18.4. Sur une version antérieure, régler le verrouillage automatique sur 5 minutes.
