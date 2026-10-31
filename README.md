# Site de l'association « Prunus amygdalus »

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
| Administration (événements, articles, réglages) | `admin/` |
| Mentions légales, page 404 | `mentions-legales.html`, `404.html` |

Le site est construit automatiquement par GitHub Pages (Jekyll) à chaque modification.
Un thème sombre s'active automatiquement selon le réglage de l'appareil (bouton lune/soleil dans l'en-tête).

## Gérer le contenu : l'administration

Adresse : **https://rc780.github.io/Site-Association-/admin/**

On y gère, avec des formulaires, sans toucher au code :

- **Agenda** : ajouter, modifier ou supprimer un événement (ponctuel, sur plusieurs jours ou régulier) ;
- **Blog** : écrire un article, y ajouter des photos ;
- **Réglages du site** : nom, slogan, adresse, e-mail, téléphone, réseaux sociaux.

Après « Publier », le site est à jour en une à deux minutes.

### Se connecter (une seule fois par appareil)

L'administration se connecte au dépôt GitHub avec une **clé d'accès personnelle** :

1. Sur GitHub, ouvrez **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
   (lien direct : https://github.com/settings/personal-access-tokens/new).
2. Donnez-lui un nom (« Administration du site »), une date d'expiration,
   et choisissez **Only select repositories → Site-Association-**.
3. Dans **Repository permissions**, réglez **Contents** sur **Read and write**.
4. Cliquez sur **Generate token** et copiez la clé (elle ne s'affiche qu'une fois).
5. Sur la page d'administration, choisissez la connexion par clé (« token ») et collez-la.

Pour qu'une autre personne gère le site, ajoutez-la comme collaboratrice du dépôt
(**Settings → Collaborators**) : elle crée ensuite sa propre clé de la même façon.

### Où sont les données ?

| Contenu | Dossier |
| --- | --- |
| Événements (un fichier par événement) | `_data/evenements/` |
| Articles (un fichier par article) | `_data/articles/` |
| Nom, coordonnées, liens | `_data/reglages.json` |
| Photos | `assets/img/` |

Les fichiers `data/evenements.js`, `data/articles.js` et `assets/js/config.js` sont générés
automatiquement à partir de `_data/` : il ne faut pas les modifier à la main.

## Personnaliser l'apparence

**Logo** : dossier `logo/` (SVG pour l'impression, PNG pour le web et les réseaux sociaux).
Le site utilise `assets/img/logo.svg` (fond clair), `assets/img/logo-negatif.svg` (fond sombre)
et `assets/img/favicon.svg` (icône d'onglet).

**Couleurs et polices** : en haut de `assets/css/style.css` (variables `--sable`, `--cannelle`, `--noyer`…).

**Textes des pages** (missions, activités, association) : directement dans les fichiers `.html`.

**Langues du mot de bienvenue** (carte de la page d'accueil) : liste `SALUTS` dans `assets/js/main.js`.

**Catégories de l'agenda** : dans `assets/js/config.js` et `admin/config.yml`.

## Recevoir les messages du formulaire

Par défaut, le formulaire de contact ouvre la messagerie du visiteur avec le message prérempli.
Pour recevoir les messages directement, créez un formulaire gratuit sur [Formspree](https://formspree.io),
puis collez son adresse dans l'administration, rubrique **Réglages du site**.
Un lien d'adhésion en ligne (HelloAsso par exemple) se renseigne au même endroit.

## Voir le site sur son ordinateur

Le site étant construit par Jekyll, ouvrir directement `index.html` ne suffit plus.
Avec Ruby installé : `gem install jekyll -v 3.10.0`, puis `jekyll serve` dans le dossier du site,
et ouvrez http://localhost:4000.

## Mettre en ligne avec GitHub Pages

1. Dans le dépôt GitHub : **Settings → Pages**.
2. Source : « Deploy from a branch », choisissez la branche principale et le dossier `/ (root)`.
3. Le site est publié à l'adresse indiquée, en général `https://<compte>.github.io/<dépôt>/`.

Un nom de domaine personnalisé peut être ajouté dans la même page des réglages.

## Organisation des fichiers

```
assets/css/style.css     styles (couleurs, mise en page, thèmes clair et sombre)
assets/js/config.js      réglages (généré à partir de _data/reglages.json)
assets/js/main.js        en-tête, pied de page, outils communs
assets/js/agenda.js      calendrier et fiches d'événements
assets/js/blog.js        liste des articles, filtres et recherche
assets/js/article.js     affichage d'un article
assets/js/contact.js     formulaire de contact
data/evenements.js       agenda (généré à partir de _data/evenements/)
data/articles.js         blog (généré à partir de _data/articles/)
_data/                   les contenus modifiables depuis l'administration
admin/                   l'administration (Sveltia CMS) et sa configuration
logo/                    le logo, en SVG et PNG
```
