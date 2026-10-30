---
layout: null
# Fichier généré par GitHub Pages.
# Le nom, le slogan, les coordonnées et les liens se modifient dans l'administration
# du site (/admin/, rubrique « Réglages du site ») ou dans _data/reglages.json.
---
window.SITE = Object.assign({{ site.data.reglages | jsonify }}, {
  // Fuseau horaire des événements (pour l'ajout à Google Agenda)
  fuseauHoraire: "Europe/Paris",

  // Dépôt GitHub du site
  github: { depot: "Rc780/Site-Association-", branche: "main" },

  // Catégories de l'agenda (la clé est celle choisie dans l'administration)
  categories: {
    culture: "Action culturelle",
    langues: "Ateliers de langues",
    traduction: "Traduction & accompagnement",
    rencontre: "Rencontres",
    "vie-asso": "Vie associative"
  }
});
