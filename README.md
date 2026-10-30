# Site de l'association « Prunus; Amygdalus »

Site vitrine d'une association culturelle : **aide, culture, savoirs et rencontres**.
Il comprend un agenda interactif, un blog et un espace de rédaction pour ajouter du contenu sans écrire de code.

> Les coordonnées, les événements et les articles sont des **exemples** à remplacer.

## Les pages

| Page | Fichier |
| --- | --- |
| Accueil | `index.html` |
| L'association (mission, partenariats) | `association.html` |
| Nos activités (culture, ateliers de langues, traduction) | `activites.html` |
| Agenda (calendrier, liste, filtres, ajout à son agenda) | `agenda.html` |
| Blog et articles | `blog.html`, `article.html?a=…` |
| Contact, adhésion, bénévolat, partenariat | `contact.html` |
| Espace rédaction (non référencé par les moteurs de recherche) | `redaction.html` |
| Mentions légales, page 404 | `mentions-legales.html`, `404.html` |

Le site fonctionne sans installation : il suffit d'ouvrir `index.html` dans un navigateur.
Un thème sombre s'active automatiquement selon le réglage de l'appareil (bouton lune/soleil dans l'en-tête).

## Personnaliser

**Nom, slogan, adresse, e-mail, téléphone, réseaux sociaux** : tout se trouve dans `assets/js/config.js`.
L'en-tête, le pied de page et la page contact se mettent à jour seuls.
Pensez aussi à changer le nom dans la balise `<title>` de chaque page.

**Couleurs et polices** : en haut de `assets/css/style.css` (variables `--sable`, `--cannelle`, `--noyer`…).

**Textes des pages** : directement dans les fichiers `.html`.

**Langues du mot de bienvenue** (carte de la page d'accueil) : liste `SALUTS` dans `assets/js/main.js`.

## Ajouter un événement ou un article

1. Ouvrez `redaction.html` sur le site.
2. Remplissez le formulaire « Nouvel événement » ou « Nouvel article » : l'aperçu s'affiche à côté.
3. Cliquez sur « Copier le texte », puis sur « Ouvrir le fichier sur GitHub ».
4. Collez le texte juste après `window.EVENEMENTS = [` (ou `window.ARTICLES = [`), puis « Commit changes ».

Les événements réguliers (atelier chaque mardi, permanence toutes les deux semaines…) se saisissent une seule fois,
avec une date de fin et d'éventuelles dates d'exception (vacances). Les articles s'écrivent en Markdown simple
(`## intertitre`, `**gras**`, `- liste`…). Les photos se déposent dans `assets/img/`.

## Recevoir les messages du formulaire

Par défaut, le formulaire de contact ouvre la messagerie du visiteur avec le message prérempli.
Pour recevoir les messages directement, créez un formulaire gratuit sur [Formspree](https://formspree.io),
puis collez son adresse dans `formulaire` (fichier `assets/js/config.js`).
Un lien d'adhésion en ligne (HelloAsso par exemple) peut aussi être ajouté dans `adhesionEnLigne`.

## Mettre en ligne avec GitHub Pages

1. Dans le dépôt GitHub : **Settings → Pages**.
2. Source : « Deploy from a branch », choisissez la branche principale et le dossier `/ (root)`.
3. Le site est publié à l'adresse indiquée, en général `https://<compte>.github.io/<dépôt>/`.

Vérifiez que `github.branche` dans `config.js` correspond à la branche publiée (utilisé par l'espace rédaction).
Un nom de domaine personnalisé peut être ajouté dans la même page des réglages.

## Organisation des fichiers

```
assets/css/style.css     styles (couleurs, mise en page, thèmes clair et sombre)
assets/js/config.js      réglages de l'association
assets/js/main.js        en-tête, pied de page, outils communs
assets/js/agenda.js      calendrier et fiches d'événements
assets/js/blog.js        liste des articles, filtres et recherche
assets/js/article.js     affichage d'un article
assets/js/contact.js     formulaire de contact
assets/js/redaction.js   espace rédaction
data/evenements.js       les événements de l'agenda
data/articles.js         les articles du blog
```
