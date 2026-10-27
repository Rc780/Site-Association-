/* ==========================================================================
   Espace rédaction : prépare le texte d'un événement ou d'un article
   à coller dans data/evenements.js ou data/articles.js.
   Rien n'est envoyé : tout se passe dans le navigateur.
   ========================================================================== */

(function () {
  "use strict";

  const S = window.Site;
  const SITE = S.config;
  const { esc } = S;
  const $ = (id) => document.getElementById(id);

  const slugifier = (s) => String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

  const valeurs = (form) => Object.fromEntries([...form.elements]
    .filter((el) => el.name)
    .map((el) => [el.name, el.type === "checkbox" ? el.checked : el.value.trim()]));

  /* ---------------- Onglets ---------------- */

  const onglets = [...document.querySelectorAll('[role="tab"]')];
  function activer(onglet) {
    onglets.forEach((o) => {
      const actif = o === onglet;
      o.setAttribute("aria-selected", String(actif));
      o.tabIndex = actif ? 0 : -1;
      $(o.getAttribute("aria-controls")).hidden = !actif;
    });
  }
  onglets.forEach((o, i) => {
    o.addEventListener("click", () => activer(o));
    o.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const suivant = onglets[(i + (e.key === "ArrowRight" ? 1 : onglets.length - 1)) % onglets.length];
      activer(suivant);
      suivant.focus();
    });
  });
  if (location.hash === "#article") activer($("onglet-article"));

  /* ---------------- Liens GitHub et copie ---------------- */

  const github = SITE.github || {};
  document.querySelectorAll("[data-github]").forEach((a) => {
    if (!github.depot) return;
    a.href = `https://github.com/${github.depot}/edit/${github.branche || "main"}/${a.dataset.github}`;
    a.hidden = false;
  });
  document.querySelectorAll("[data-copier]").forEach((b) =>
    b.addEventListener("click", () => S.copier($(b.dataset.copier).textContent, b)));

  /* ---------------- Brouillons (gardés dans ce navigateur) ---------------- */

  function charger(cle) {
    try { return JSON.parse(localStorage.getItem(cle) || "null"); } catch (e) { return null; }
  }
  function sauver(cle, donnees) {
    try { localStorage.setItem(cle, JSON.stringify(donnees)); } catch (e) { /* stockage indisponible */ }
  }
  function remplir(form, donnees) {
    Object.entries(donnees || {}).forEach(([nom, v]) => {
      const el = form.elements[nom];
      if (!el) return;
      if (el.type === "checkbox") el.checked = Boolean(v);
      else el.value = v;
    });
  }

  /* ---------------- Événement ---------------- */

  const formEvt = $("form-evenement");
  $("e-categorie").innerHTML = Object.entries(SITE.categories || {})
    .map(([cle, nom]) => `<option value="${esc(cle)}">${esc(nom)}</option>`).join("");

  const EXEMPLE_EVT = {
    titre: "Atelier cuisine et langues du monde",
    categorie: "rencontre",
    lieu: "Maison des associations, grande salle",
    date: S.versISO(S.ajouterJours(S.aujourdhui(), 21)),
    debut: "14:30",
    fin: "17:00",
    prix: "Gratuit pour les adhérents",
    inscription: "contact.html",
    description: "Exemple prérempli : remplacez ce texte par la présentation de votre événement."
  };

  function lireEvenement() {
    const v = valeurs(formEvt);
    const e = {
      id: slugifier(v.titre) + (v.date ? "-" + v.date : ""),
      titre: v.titre,
      categorie: v.categorie,
      date: v.date,
      dateFin: v.dateFin && v.dateFin > v.date ? v.dateFin : "",
      debut: v.debut,
      fin: v.fin,
      lieu: v.lieu,
      prix: v.prix,
      inscription: v.inscription,
      description: v.description
    };
    if (v.regulier && v.jusquau) {
      e.repetition = {
        semaines: Number(v.semaines) || 1,
        jusquau: v.jusquau,
        sauf: v.sauf.split(/[,;\s]+/).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      };
    }
    return e;
  }

  function codeEvenement(e) {
    const lignes = [];
    ["id", "titre", "categorie", "date", "dateFin", "debut", "fin", "lieu", "prix", "inscription", "description"].forEach((k) => {
      if (e[k]) lignes.push(`    ${k}: ${JSON.stringify(e[k])}`);
    });
    if (e.repetition) {
      const r = e.repetition;
      lignes.push(`    repetition: { semaines: ${r.semaines}, jusquau: ${JSON.stringify(r.jusquau)}${r.sauf.length ? `, sauf: ${JSON.stringify(r.sauf)}` : ""} }`);
    }
    return `  {\n${lignes.join(",\n")}\n  },`;
  }

  function majEvenement() {
    const v = valeurs(formEvt);
    document.querySelectorAll("[data-regulier]").forEach((el) => { el.hidden = !v.regulier; });
    const e = lireEvenement();
    if (e.titre && e.date) {
      const jour = S.versDate(e.date);
      const occurrence = Object.assign({}, e, {
        cle: "apercu",
        jour,
        jourFin: e.dateFin ? S.versDate(e.dateFin) : jour
      });
      $("apercu-evenement").innerHTML = `<ul class="liste-evenements">${S.ligneEvenement(occurrence)}</ul>`;
    } else {
      $("apercu-evenement").innerHTML = `<p class="vide">Indiquez au moins un titre et une date.</p>`;
    }
    $("code-evenement").textContent = codeEvenement(e);
    sauver("redaction-evenement", v);
  }

  remplir(formEvt, charger("redaction-evenement") || EXEMPLE_EVT);
  formEvt.addEventListener("input", majEvenement);
  formEvt.addEventListener("change", majEvenement);
  $("apercu-evenement").addEventListener("click", (e) => e.preventDefault());

  /* ---------------- Article ---------------- */

  const formArt = $("form-article");
  const rubriques = [...new Set((window.ARTICLES || []).map((a) => a.categorie).filter(Boolean))];
  $("rubriques-existantes").innerHTML = rubriques.map((r) => `<option value="${esc(r)}"></option>`).join("");

  const EXEMPLE_ART = {
    titre: "Mon premier article",
    date: S.versISO(S.aujourdhui()),
    categorie: "Vie de l'association",
    auteur: "L'équipe de l'association",
    resume: "Exemple prérempli : une ou deux phrases qui donnent envie de lire la suite.",
    motif: "",
    image: "",
    contenu: "Écrivez ici votre premier paragraphe.\n\n## Un intertitre\n\nUn deuxième paragraphe, avec un mot en **gras** et un autre en *italique*.\n\n- un premier point\n- un second point\n\n> Une citation pour conclure."
  };

  let slugManuel = false;
  $("a-slug").addEventListener("input", () => { slugManuel = $("a-slug").value.trim() !== ""; });

  const pourGabarit = (s) => String(s).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

  function codeArticle(a) {
    const lignes = [];
    ["slug", "titre", "date", "categorie", "auteur", "resume", "motif", "image"].forEach((k) => {
      if (a[k]) lignes.push(`    ${k}: ${JSON.stringify(a[k])}`);
    });
    lignes.push("    contenu: `" + pourGabarit(a.contenu || "") + "`");
    return `  {\n${lignes.join(",\n")}\n  },`;
  }

  function majArticle() {
    if (!slugManuel) $("a-slug").value = slugifier($("a-titre").value);
    const a = valeurs(formArt);
    a.slug = slugifier(a.slug);
    $("apercu-article").innerHTML = a.titre
      ? S.carteArticle(Object.assign({ date: S.versISO(S.aujourdhui()) }, a))
      : `<p class="vide">Indiquez au moins un titre.</p>`;
    $("apercu-texte").innerHTML = S.markdown(a.contenu) || `<p class="muted">Le texte de l'article apparaîtra ici.</p>`;
    $("code-article").textContent = codeArticle(a);
    sauver("redaction-article", a);
  }

  const brouillon = charger("redaction-article");
  remplir(formArt, brouillon || EXEMPLE_ART);
  slugManuel = Boolean(brouillon && brouillon.slug && brouillon.slug !== slugifier(brouillon.titre));
  formArt.addEventListener("input", majArticle);
  $("apercu-article").addEventListener("click", (e) => e.preventDefault());

  /* ---------------- Vider ---------------- */

  document.querySelectorAll("[data-effacer]").forEach((b) => b.addEventListener("click", () => {
    const form = b.closest("form");
    form.reset();
    if (form === formArt) { slugManuel = false; majArticle(); } else { majEvenement(); }
    form.querySelector("input").focus();
  }));

  majEvenement();
  majArticle();
})();
