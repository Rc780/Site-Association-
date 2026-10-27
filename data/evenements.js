/* ==========================================================================
   AGENDA : liste des événements
   --------------------------------------------------------------------------
   Pour ajouter un événement, le plus simple est d'utiliser la page
   « redaction.html » du site, qui prépare le bloc à coller ici.

   Champs d'un événement :
     id           identifiant unique, sans espace ni accent (ex. "soiree-contes")
     titre        titre affiché
     categorie    culture | langues | traduction | rencontre | vie-asso
     date         date de début, au format AAAA-MM-JJ
     dateFin      (facultatif) date de fin pour un événement sur plusieurs jours
     debut, fin   (facultatif) heures au format HH:MM
     lieu         adresse ou nom du lieu
     prix         (facultatif) ex. "Entrée libre", "5 €", "Gratuit pour les adhérents"
     inscription  (facultatif) lien d'inscription (ou "contact.html")
     description  texte de présentation
     repetition   (facultatif) pour un rendez-vous régulier :
                  { semaines: 1, jusquau: "AAAA-MM-JJ", sauf: ["AAAA-MM-JJ"] }
                  semaines: 1 = chaque semaine, 2 = toutes les deux semaines

   Les événements ci-dessous sont des EXEMPLES à remplacer.
   ========================================================================== */

window.EVENEMENTS = [
  {
    id: "atelier-arabe",
    titre: "Atelier d'arabe : débutants",
    categorie: "langues",
    date: "2026-10-06",
    debut: "18:30",
    fin: "20:00",
    lieu: "Maison des associations, salle 2",
    prix: "Réservé aux adhérents",
    inscription: "contact.html",
    description: "Découvrir l'alphabet, les sons et les premières phrases du quotidien, en petit groupe et dans la bonne humeur. Aucun prérequis : on commence ensemble, au rythme de chacun.",
    repetition: { semaines: 1, jusquau: "2027-01-26", sauf: ["2026-12-22", "2026-12-29"] }
  },
  {
    id: "atelier-hebreu",
    titre: "Atelier d'hébreu moderne",
    categorie: "langues",
    date: "2026-10-08",
    debut: "18:30",
    fin: "20:00",
    lieu: "Maison des associations, salle 2",
    prix: "Réservé aux adhérents",
    inscription: "contact.html",
    description: "Lecture, conversation et vocabulaire pratique. Le groupe accueille les grands débutants comme celles et ceux qui veulent reprendre après une pause.",
    repetition: { semaines: 1, jusquau: "2027-01-28", sauf: ["2026-12-24", "2026-12-31"] }
  },
  {
    id: "permanence-traduction",
    titre: "Permanence traduction et démarches",
    categorie: "traduction",
    date: "2026-10-17",
    debut: "10:00",
    fin: "12:00",
    lieu: "Local de l'association",
    prix: "Gratuit, sans rendez-vous",
    description: "Une question sur la traduction d'un acte, d'un diplôme ou d'un jugement ? Besoin d'un coup de main pour un dossier administratif ? Venez avec vos documents : nous vous orientons et établissons un devis si nécessaire.",
    repetition: { semaines: 2, jusquau: "2027-01-23", sauf: ["2026-12-26"] }
  },
  {
    id: "portes-ouvertes-2026",
    titre: "Journée portes ouvertes",
    categorie: "vie-asso",
    date: "2026-10-10",
    debut: "10:00",
    fin: "17:00",
    lieu: "Local de l'association",
    prix: "Entrée libre",
    description: "Rencontrer l'équipe, découvrir les ateliers de l'année, s'inscrire et partager un goûter. Toute la famille est la bienvenue."
  },
  {
    id: "conference-langues-semitiques",
    titre: "Conférence : les langues sémitiques, une famille millénaire",
    categorie: "culture",
    date: "2026-10-24",
    debut: "18:30",
    fin: "20:00",
    lieu: "Médiathèque municipale, auditorium",
    prix: "Entrée libre",
    description: "De l'akkadien à l'arabe, de l'araméen à l'hébreu et à l'amharique : un voyage dans l'histoire d'une famille de langues qui partage racines, sons et écritures."
  },
  {
    id: "soiree-contes-mediterranee",
    titre: "Soirée contes et musiques de Méditerranée",
    categorie: "culture",
    date: "2026-11-07",
    debut: "19:00",
    fin: "21:30",
    lieu: "Salle polyvalente, 4 place du Marché",
    prix: "Entrée libre, participation au chapeau",
    description: "Des contes en français, en arabe et en hébreu, accompagnés au oud et aux percussions. Une soirée pour petits et grands, suivie d'un buffet partagé."
  },
  {
    id: "cafe-des-langues-novembre",
    titre: "Café des langues",
    categorie: "rencontre",
    date: "2026-11-14",
    debut: "15:00",
    fin: "17:30",
    lieu: "Café associatif Le Comptoir",
    prix: "Gratuit (consommation à votre charge)",
    description: "Une table par langue, un drapeau sur chaque table : on s'assoit, on écoute, on ose. Arabe, hébreu, anglais, espagnol, italien… et français pour celles et ceux qui l'apprennent."
  },
  {
    id: "atelier-calligraphie",
    titre: "Initiation à la calligraphie arabe et hébraïque",
    categorie: "culture",
    date: "2026-11-21",
    debut: "14:00",
    fin: "17:00",
    lieu: "Maison des associations, grande salle",
    prix: "10 € · 5 € pour les adhérents",
    inscription: "contact.html",
    description: "Calame, encre et papier : découvrez les gestes de base de deux traditions calligraphiques. Matériel fourni, places limitées à 15 personnes."
  },
  {
    id: "cine-debat-novembre",
    titre: "Ciné-débat : voix d'ailleurs",
    categorie: "culture",
    date: "2026-11-28",
    debut: "18:00",
    fin: "21:00",
    lieu: "Cinéma Le Familial",
    prix: "Tarif réduit pour les adhérents",
    description: "Projection d'un film en version originale sous-titrée, suivie d'un échange avec une traductrice de sous-titres sur le passage d'une langue à l'autre."
  },
  {
    id: "semaine-langues-cultures",
    titre: "Semaine des langues et des cultures",
    categorie: "culture",
    date: "2026-12-01",
    dateFin: "2026-12-05",
    lieu: "Médiathèque municipale et Maison des associations",
    prix: "Entrée libre",
    description: "Cinq jours d'expositions, de lectures bilingues, d'ateliers d'écriture et de découvertes culinaires, préparés avec nos partenaires. Programme détaillé disponible à l'accueil."
  },
  {
    id: "repas-partage-fin-annee",
    titre: "Repas partagé de fin d'année",
    categorie: "rencontre",
    date: "2026-12-12",
    debut: "12:00",
    fin: "16:00",
    lieu: "Salle polyvalente, 4 place du Marché",
    prix: "Chacun apporte un plat à partager",
    description: "Le grand rendez-vous convivial de l'année : adhérents, bénévoles, partenaires, familles et voisins autour d'une même table."
  },
  {
    id: "cafe-des-langues-janvier",
    titre: "Café des langues",
    categorie: "rencontre",
    date: "2027-01-09",
    debut: "15:00",
    fin: "17:30",
    lieu: "Café associatif Le Comptoir",
    prix: "Gratuit (consommation à votre charge)",
    description: "Premier café des langues de l'année : venez pratiquer, rencontrer et partager vos bonnes résolutions… dans la langue de votre choix."
  },
  {
    id: "assemblee-generale-2027",
    titre: "Assemblée générale",
    categorie: "vie-asso",
    date: "2027-01-16",
    debut: "14:00",
    fin: "16:30",
    lieu: "Maison des associations, grande salle",
    prix: "Ouverte à toutes et tous, vote réservé aux adhérents",
    description: "Bilan de l'année, projets à venir, élection du bureau. Un moment important pour faire vivre l'association : votre voix compte."
  },
  {
    id: "info-documents-officiels",
    titre: "Réunion d'information : traduire ses documents officiels",
    categorie: "traduction",
    date: "2027-01-30",
    debut: "10:00",
    fin: "12:00",
    lieu: "Local de l'association",
    prix: "Gratuit",
    inscription: "contact.html",
    description: "Quels documents faire traduire, auprès de qui, dans quels délais ? Nous répondons à vos questions sur la traduction de documents officiels et l'interprétariat."
  },
  {
    id: "soiree-poesie-bilingue",
    titre: "Soirée poésie bilingue",
    categorie: "culture",
    date: "2027-02-06",
    debut: "19:00",
    fin: "21:00",
    lieu: "Médiathèque municipale, auditorium",
    prix: "Entrée libre",
    description: "Des poèmes lus dans leur langue d'origine puis en français, par les participants des ateliers et des invités. Micro ouvert en fin de soirée."
  }
];
