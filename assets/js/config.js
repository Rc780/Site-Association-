/* ==========================================================================
   RÉGLAGES DU SITE
   Modifiez ici le nom, les coordonnées et les liens de l'association.
   Tout le site (en-tête, pied de page, pages) se met à jour automatiquement.
   ========================================================================== */

window.SITE = {
  // Identité
  nom: "Liens & Savoirs",
  sousTitre: "Association culturelle",
  devise: "Aide, culture, savoirs et rencontres",
  slogan: "Rejoignez-nous et construisons des liens ensemble.",
  accroche: "Un soutien concret et varié, au plus près des besoins de chacun.",
  force: "Partenariats et partage",

  // Coordonnées (à remplacer par les vraies)
  contact: {
    email: "contact@example.org",
    telephone: "01 99 00 12 34",
    adresse: "12 rue de l'Exemple",
    codePostalVille: "75000 Votre ville",
    permanences: "Mardi et jeudi, 17 h – 19 h · Samedi, 10 h – 12 h"
  },

  // Réseaux sociaux : laissez "" pour masquer un réseau
  reseaux: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  },

  // Formulaire de contact.
  // Laissez "" : le formulaire ouvre la messagerie du visiteur avec le message pré-rempli.
  // Ou collez l'adresse d'un service comme Formspree (https://formspree.io/f/xxxx)
  // pour recevoir les messages directement par e-mail.
  formulaire: "",

  // Lien d'adhésion / de don en ligne (HelloAsso par exemple). Laissez "" si aucun.
  adhesionEnLigne: "",

  // Dépôt GitHub du site (utilisé par l'espace de rédaction pour ouvrir les bons fichiers)
  github: {
    depot: "Rc780/Site-Association-",
    branche: "main"
  },

  // Fuseau horaire des événements (pour l'ajout à Google Agenda)
  fuseauHoraire: "Europe/Paris",

  // Catégories de l'agenda (la clé sert dans data/evenements.js)
  categories: {
    culture: "Action culturelle",
    langues: "Ateliers de langues",
    traduction: "Traduction & accompagnement",
    rencontre: "Rencontres",
    "vie-asso": "Vie associative"
  }
};
