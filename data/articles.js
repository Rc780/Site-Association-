/* ==========================================================================
   BLOG : liste des articles
   --------------------------------------------------------------------------
   Pour écrire un article, le plus simple est d'utiliser la page
   « redaction.html » du site, qui prépare le bloc à coller ici.

   Champs d'un article :
     slug       identifiant dans l'adresse, sans espace ni accent
     titre      titre de l'article
     date       date de publication, au format AAAA-MM-JJ
     categorie  rubrique libre (ex. "Vie de l'association")
     auteur     signature
     resume     une ou deux phrases affichées dans la liste
     motif      (facultatif) mot ou lettres affichés sur la vignette
     image      (facultatif) chemin d'une photo, ex. "assets/img/photo.jpg"
     contenu    texte de l'article en Markdown :
                  ## Intertitre       **gras**      *italique*
                  - liste             [lien](https://...)
                  > citation          ![légende](assets/img/photo.jpg)

   Les articles ci-dessous sont des EXEMPLES à remplacer.
   ========================================================================== */

window.ARTICLES = [
  {
    slug: "bienvenue-sur-notre-site",
    titre: "Bienvenue sur notre nouveau site !",
    date: "2026-10-20",
    categorie: "Vie de l'association",
    auteur: "L'équipe de l'association",
    resume: "Agenda, ateliers, traduction, actualités : tout ce qui fait vivre l'association est désormais réuni au même endroit.",
    motif: "أهلاً وسهلاً",
    contenu: `Nous sommes heureux de vous présenter notre nouveau site. Il a été pensé pour vous permettre de suivre nos activités, de nous contacter facilement et de trouver rapidement la bonne information.

## Ce que vous y trouverez

- **L'agenda** de tous nos rendez-vous : ateliers, soirées culturelles, cafés des langues, permanences.
- **Nos activités** en détail : action culturelle, ateliers de langues, traduction officielle et interprétariat.
- **Le blog**, où nous partageons nos retours d'événements, des conseils et des découvertes.
- **Un formulaire de contact** pour une question, une adhésion ou une demande de devis.

## Et vous ?

Ce site est aussi le vôtre. Une idée d'article, une photo d'atelier à partager, une proposition de partenariat ? Écrivez-nous, nous serons ravis de vous lire.

> Rejoignez-nous et construisons des liens ensemble.`
  },
  {
    slug: "retour-journee-portes-ouvertes",
    titre: "Retour sur la journée portes ouvertes",
    date: "2026-10-13",
    categorie: "Retour sur",
    auteur: "L'équipe de l'association",
    resume: "Une journée de rencontres, d'inscriptions et de découvertes pour lancer la nouvelle saison.",
    motif: "ברוכים הבאים",
    contenu: `Samedi 10 octobre, les portes de l'association étaient grandes ouvertes. Merci à toutes celles et ceux qui sont venus nous rencontrer !

## Une journée bien remplie

Tout au long de la journée, les bénévoles ont présenté les ateliers de langues de la saison, répondu aux questions sur la traduction de documents et accueilli les nouveaux adhérents.

Les enfants ont pu s'essayer à l'écriture de leur prénom en alphabet arabe et hébreu, pendant que les plus grands découvraient le programme culturel de l'automne.

## Et maintenant ?

Les ateliers ont repris : il reste quelques places dans certains groupes. N'hésitez pas à consulter l'agenda et à nous contacter pour vous inscrire.

Un grand merci à nos partenaires et à l'équipe de bénévoles qui ont rendu cette journée possible.`
  },
  {
    slug: "langues-semitiques-une-grande-famille",
    titre: "Les langues sémitiques : une grande famille",
    date: "2026-10-02",
    categorie: "Savoirs",
    auteur: "L'équipe de l'association",
    resume: "Arabe, hébreu, araméen, amharique… Ces langues partagent bien plus qu'une région : un même système de racines.",
    motif: "كتب · כתב",
    contenu: `Les langues sémitiques forment l'une des plus anciennes familles de langues écrites. On y trouve notamment l'**arabe**, l'**hébreu**, l'**araméen**, l'**amharique** et le **tigrinya** (parlés en Éthiopie et en Érythrée), ou encore le **maltais**.

## Des racines de trois consonnes

Leur point commun le plus frappant : la plupart des mots sont construits à partir d'une **racine de trois consonnes**, qui porte un sens général. Les voyelles et les ajouts viennent ensuite préciser le mot.

Prenons la racine **K-T-B**, liée à l'idée d'écrire :

- en arabe : *kataba* (il a écrit), *kitāb* (livre), *maktab* (bureau) ;
- en hébreu : *katav* (il a écrit), *mikhtav* (lettre).

De la même façon, la racine **S-L-M** évoque la paix et l'intégrité : *salām* en arabe, *shalom* en hébreu.

## Des écritures variées

L'arabe, l'hébreu et le syriaque (une forme d'araméen) s'écrivent de droite à gauche et notent surtout les consonnes. L'amharique utilise l'écriture guèze, qui se lit de gauche à droite. Le maltais, lui, s'écrit en alphabet latin.

> Apprendre une langue sémitique, c'est souvent en découvrir un peu de plusieurs autres.

Envie d'aller plus loin ? Nos ateliers d'arabe et d'hébreu accueillent les débutants toute l'année.`
  },
  {
    slug: "faire-traduire-un-document-officiel",
    titre: "Faire traduire un document officiel : mode d'emploi",
    date: "2026-09-22",
    categorie: "Traduction",
    auteur: "L'équipe de l'association",
    resume: "Acte de naissance, diplôme, jugement : les bonnes questions à se poser avant de lancer une traduction.",
    motif: "ترجمة · תרגום",
    contenu: `Une démarche administrative, une inscription à l'université, un mariage ou une demande de titre de séjour nécessitent souvent la traduction de documents rédigés dans une autre langue. Voici comment nous procédons.

## 1. Identifier le besoin

Avant tout, vérifiez auprès de l'organisme destinataire **quel type de traduction il demande**. Pour la plupart des démarches officielles en France, une traduction réalisée par un traducteur expert près une cour d'appel (dit « assermenté ») est exigée. Nous vous indiquons dès le départ la solution adaptée à votre situation.

## 2. Nous envoyer le document

Une copie lisible suffit pour établir un devis : scan ou photo nette, toutes les pages, recto et verso. Gardez toujours vos originaux.

## 3. Recevoir un devis

Le devis précise le prix et le délai. Il dépend de la longueur du document, de la langue et de l'urgence.

## 4. Récupérer la traduction

La traduction vous est remise en main propre ou par courrier, selon ce que demande l'organisme.

## Nos conseils

- **Vérifiez l'orthographe des noms propres** : elle doit correspondre à celle de votre passeport ou titre d'identité.
- **Anticipez** : certaines démarches ont des délais stricts.
- **Demandez un interprète** si vous devez vous rendre à un rendez-vous administratif ou médical important.

Le saviez-vous ? *Tarjama* en arabe et *targoum* en hébreu, les deux mots qui désignent la traduction, viennent tous deux de l'araméen.`
  },
  {
    slug: "cinq-conseils-pour-progresser",
    titre: "Cinq conseils pour progresser dans une langue étrangère",
    date: "2026-09-08",
    categorie: "Ateliers de langues",
    auteur: "L'équipe pédagogique",
    resume: "Régularité, écoute, plaisir : nos animateurs partagent leurs astuces pour avancer pas à pas.",
    motif: "A · ا · א",
    contenu: `Apprendre une langue demande du temps, mais quelques habitudes simples font une vraie différence. Voici les conseils que nos animateurs donnent en début d'année.

1. **Un peu chaque jour plutôt que beaucoup une fois par semaine.** Dix minutes quotidiennes valent mieux qu'une longue séance isolée.
2. **Écoutez avant de parler.** Chansons, podcasts, radio : l'oreille s'habitue aux sons et à la musique de la langue.
3. **Osez vous tromper.** L'erreur fait partie de l'apprentissage. Au café des langues, personne ne juge !
4. **Apprenez des phrases, pas seulement des mots.** « Je voudrais un café, s'il vous plaît » est plus utile que « café » tout seul.
5. **Reliez la langue à ce que vous aimez.** Cuisine, football, cinéma : chacun sa porte d'entrée.

## Et à l'association ?

Nos ateliers fonctionnent en petits groupes, pour que chacun puisse parler et poser ses questions. Les niveaux sont adaptés et l'ambiance est conviviale : on apprend, on transmet et on progresse ensemble.`
  },
  {
    slug: "partenariats-ensemble-plus-loin",
    titre: "Partenariats : ensemble, on va plus loin",
    date: "2026-08-31",
    categorie: "Partenariats",
    auteur: "L'équipe de l'association",
    resume: "Notre force, ce sont nos partenaires. Pourquoi nous travaillons main dans la main avec d'autres acteurs du territoire.",
    motif: "شراكة · שותפות",
    contenu: `Depuis sa création, l'association avance avec d'autres. **Partenariats et partage** sont au cœur de notre façon de faire.

## Avec qui travaillons-nous ?

- les **collectivités** et services municipaux ;
- les **médiathèques** et lieux culturels ;
- les **établissements scolaires** et universitaires ;
- les **centres sociaux** et structures d'accompagnement ;
- d'autres **associations** culturelles et solidaires ;
- des **professionnels** de la traduction et de l'interprétariat.

## Pourquoi c'est important

Chaque partenaire apporte ses compétences, ses lieux, ses publics. Ensemble, nous pouvons proposer des projets plus riches et toucher davantage de personnes.

## Devenir partenaire

Vous représentez une structure et souhaitez construire un projet avec nous ? Contactez-nous en choisissant « Partenariat » dans le formulaire : nous serons heureux d'en discuter.`
  }
];
