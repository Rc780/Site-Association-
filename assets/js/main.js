/* ==========================================================================
   Script commun à toutes les pages :
   - en-tête, menu et pied de page (à partir de config.js)
   - outils partagés (dates, agenda, articles, Markdown)
   - petits blocs automatiques : [data-evenements], [data-articles],
     [data-prochain], [data-salut], [data-cfg]
   ========================================================================== */

(function () {
  "use strict";

  const SITE = window.SITE || {};
  const Site = (window.Site = window.Site || {});

  /* ------------------------------------------------------------------------
     Icônes (traits, 24 × 24)
     ------------------------------------------------------------------------ */

  const TRACES = {
    calendrier: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    lieu: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    prix: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    culture: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    langues: '<path d="M4 4h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M19 8h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v3l-4-3h-3a2 2 0 0 1-2-2"/>',
    traduction: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    coeur: '<path d="M12 20s-8-4.6-8-10.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.4 12 20 12 20z"/>',
    liens: '<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>',
    personnes: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 5.5 4.8"/>',
    livre: '<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z"/><path d="M4 20a2 2 0 0 0 2 2h13v-4"/>',
    gauche: '<path d="M15 18l-6-6 6-6"/>',
    droite: '<path d="M9 18l6-6-6-6"/>',
    fermer: '<path d="M6 6l12 12M18 6 6 18"/>',
    soleil: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    lune: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    recherche: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    telecharger: '<path d="M12 4v11m-4-4 4 4 4-4M5 20h14"/>',
    copier: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/>',
    externe: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    menu: '<path class="ligne" d="M4 7h16"/><path class="ligne" d="M4 12h16"/><path class="ligne" d="M4 17h16"/>',
    facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>'
  };

  function icone(nom) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TRACES[nom] || ""}</svg>`;
  }

  /* ------------------------------------------------------------------------
     Outils
     ------------------------------------------------------------------------ */

  /* Échappe le texte pour l'insérer dans la page, avec les espaces insécables
     de la typographie française (avant : ; ! ? » et après «). */
  const esc = (s) => String(s ?? "")
    .replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
    .replace(/ ([:;!?»])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0");
  const pad = (n) => String(n).padStart(2, "0");
  const majuscule = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  function versDate(str) {
    const [a, m, j] = String(str).slice(0, 10).split("-").map(Number);
    return new Date(a, (m || 1) - 1, j || 1);
  }
  const versISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  function ajouterJours(d, n) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }
  function aujourdhui() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  const fmt = (o) => new Intl.DateTimeFormat("fr-FR", o);
  const fMois = fmt({ month: "long" });
  const fMoisCourt = fmt({ month: "short" });
  const fSemaine = fmt({ weekday: "long" });
  const fSemaineCourt = fmt({ weekday: "short" });
  const fMoisAnnee = fmt({ month: "long", year: "numeric" });

  const numeroJour = (d) => (d.getDate() === 1 ? "1er" : String(d.getDate()));

  /* « samedi 7 novembre 2026 » ; options : semaine, annee */
  function dateLongue(d, o = {}) {
    const morceaux = [];
    if (o.semaine !== false) morceaux.push(fSemaine.format(d));
    morceaux.push(numeroJour(d), fMois.format(d));
    if (o.annee !== false) morceaux.push(d.getFullYear());
    return morceaux.join(" ");
  }

  function heure(h) {
    if (!h) return "";
    const [hh, mm] = h.split(":");
    return `${Number(hh)} h${mm && mm !== "00" ? " " + mm : ""}`;
  }

  /* ------------------------------------------------------------------------
     Agenda
     ------------------------------------------------------------------------ */

  let cacheOccurrences = null;

  /* Harmonise les formats enregistrés par l'administration
     (« 18:30:00 » → « 18:30 », champs vides, dates avec heure…). */
  const jourISO = (v) => String(v || "").trim().slice(0, 10);
  const heureHM = (v) => String(v || "").trim().slice(0, 5);
  function normaliserEvenement(e) {
    if (!e) return e;
    const r = Object.assign({}, e, {
      date: jourISO(e.date),
      dateFin: jourISO(e.dateFin),
      debut: heureHM(e.debut),
      fin: heureHM(e.fin)
    });
    const rep = e.repetition;
    r.repetition = rep && rep.jusquau
      ? {
          semaines: Number(rep.semaines) || 1,
          jusquau: jourISO(rep.jusquau),
          sauf: (Array.isArray(rep.sauf) ? rep.sauf : String(rep.sauf || "").split(","))
            .map(jourISO).filter(Boolean)
        }
      : null;
    return r;
  }

  /* Développe les événements réguliers en dates individuelles, triées. */
  function occurrences() {
    if (cacheOccurrences) return cacheOccurrences;
    const liste = [];
    (window.EVENEMENTS || []).map(normaliserEvenement).forEach((e) => {
      if (!e || !e.date) return;
      const debut = versDate(e.date);
      const duree = e.dateFin ? Math.max(0, Math.round((versDate(e.dateFin) - debut) / 864e5)) : 0;
      const ajouter = (jour) =>
        liste.push(Object.assign({}, e, {
          cle: `${e.id || "evt"}-${versISO(jour)}`,
          jour,
          jourFin: ajouterJours(jour, duree),
          regulier: Boolean(e.repetition)
        }));
      if (e.repetition && e.repetition.jusquau) {
        const pas = 7 * (Number(e.repetition.semaines) || 1);
        const fin = versDate(e.repetition.jusquau);
        const sauf = new Set(e.repetition.sauf || []);
        for (let j = new Date(debut); j <= fin; j = ajouterJours(j, pas)) {
          if (!sauf.has(versISO(j))) ajouter(j);
        }
      } else {
        ajouter(debut);
      }
    });
    liste.sort((a, b) => a.jour - b.jour || String(a.debut || "").localeCompare(String(b.debut || "")));
    cacheOccurrences = liste;
    return liste;
  }

  function aVenir({ categories = null, limite = Infinity } = {}) {
    const auj = aujourdhui();
    return occurrences()
      .filter((o) => o.jourFin >= auj && (!categories || categories.includes(o.categorie)))
      .slice(0, limite);
  }

  const nomCategorie = (cle) => (SITE.categories || {})[cle] || cle || "";

  function plageHoraire(o) {
    if (!o.debut) return o.dateFin ? "Horaires détaillés au programme" : "Toute la journée";
    return o.fin ? `${heure(o.debut)} – ${heure(o.fin)}` : `À partir de ${heure(o.debut)}`;
  }

  function plageDates(o) {
    if (+o.jourFin !== +o.jour) {
      const memeMois = o.jour.getMonth() === o.jourFin.getMonth();
      const debut = memeMois ? numeroJour(o.jour) : dateLongue(o.jour, { semaine: false, annee: false });
      return `Du ${debut} au ${dateLongue(o.jourFin, { semaine: false })}`;
    }
    return majuscule(dateLongue(o.jour));
  }

  function blocDate(d) {
    return `<span class="date-bloc" aria-hidden="true">
      <span class="mois">${esc(fMoisCourt.format(d).replace(".", ""))}</span>
      <span class="jour">${d.getDate()}</span>
      <span class="sem">${esc(fSemaineCourt.format(d).replace(".", ""))}</span>
    </span>`;
  }

  function ligneEvenement(o) {
    const passe = o.jourFin < aujourdhui();
    return `<li><a class="evt-ligne cat-${esc(o.categorie)}${passe ? " passe" : ""}" href="agenda.html#${esc(o.cle)}">
      ${blocDate(o.jour)}
      <div class="evt-texte">
        <span class="tag">${esc(nomCategorie(o.categorie))}</span>
        <h3>${esc(o.titre)}</h3>
        <div class="evt-meta">
          <span class="sr-only">${esc(plageDates(o))}</span>
          <span>${icone("horloge")}${esc(+o.jourFin !== +o.jour ? plageDates(o) : plageHoraire(o))}</span>
          ${o.lieu ? `<span>${icone("lieu")}${esc(o.lieu)}</span>` : ""}
        </div>
      </div>
      <span class="fleche" aria-hidden="true">→</span>
    </a></li>`;
  }

  /* Format iCalendar (.ics) pour « Ajouter à mon agenda » */
  function heurePlusUne(h) {
    const [hh, mm] = h.split(":").map(Number);
    return `${pad(Math.min(23, hh + 1))}:${pad(mm || 0)}`;
  }
  const horodatage = (d, h) => versISO(d).replace(/-/g, "") + (h ? "T" + h.replace(":", "") + "00" : "");

  function bornes(o) {
    if (o.debut) {
      return { debut: horodatage(o.jour, o.debut), fin: horodatage(o.jourFin, o.fin || heurePlusUne(o.debut)), journee: false };
    }
    return { debut: horodatage(o.jour), fin: horodatage(ajouterJours(o.jourFin, 1)), journee: true };
  }

  function ics(o) {
    const b = bornes(o);
    const echapper = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/[,;]/g, (m) => "\\" + m);
    const plier = (ligne) => ligne.match(/.{1,60}/g).join("\r\n ");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//${echapper(SITE.nom)}//Agenda//FR`,
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${o.cle}@agenda-association`,
      `DTSTAMP:${stamp}`,
      b.journee ? `DTSTART;VALUE=DATE:${b.debut}` : `DTSTART:${b.debut}`,
      b.journee ? `DTEND;VALUE=DATE:${b.fin}` : `DTEND:${b.fin}`,
      `SUMMARY:${echapper(o.titre)}`,
      o.lieu ? `LOCATION:${echapper(o.lieu)}` : "",
      o.description ? `DESCRIPTION:${echapper(o.description)}` : "",
      "END:VEVENT",
      "END:VCALENDAR"
    ].filter(Boolean).map(plier).join("\r\n");
  }

  function lienGoogle(o) {
    const b = bornes(o);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: o.titre,
      dates: `${b.debut}/${b.fin}`,
      details: o.description || "",
      location: o.lieu || ""
    });
    if (!b.journee && SITE.fuseauHoraire) params.set("ctz", SITE.fuseauHoraire);
    return "https://calendar.google.com/calendar/render?" + params.toString();
  }

  function telecharger(nomFichier, contenu, type) {
    const url = URL.createObjectURL(new Blob([contenu], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = nomFichier;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function copier(texte, bouton) {
    const confirmer = () => {
      if (!bouton) return;
      const avant = bouton.dataset.libelle || bouton.innerHTML;
      bouton.dataset.libelle = avant;
      bouton.textContent = "Copié !";
      setTimeout(() => { bouton.innerHTML = avant; }, 1800);
    };
    const secours = () => {
      const zone = document.createElement("textarea");
      zone.value = texte;
      zone.setAttribute("readonly", "");
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.appendChild(zone);
      zone.select();
      try { document.execCommand("copy"); confirmer(); } catch (e) { /* sélection laissée à l'utilisateur */ }
      zone.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte).then(confirmer, secours);
    } else {
      secours();
    }
  }

  /* ------------------------------------------------------------------------
     Blog
     ------------------------------------------------------------------------ */

  const articles = () => (window.ARTICLES || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const dateArticle = (iso) => dateLongue(versDate(iso), { semaine: false });

  function tempsLecture(a) {
    const mots = String(a.contenu || "").trim().split(/\s+/).length;
    return Math.max(1, Math.round(mots / 200));
  }

  /* L'administration enregistre les photos avec un « / » initial ; le site étant
     publié dans un sous-dossier, on les rend relatives. */
  const cheminLocal = (u) => String(u || "").replace(/^\/(?!\/)/, "");

  function teinte(a) {
    if (a.teinte) return a.teinte;
    let h = 0;
    for (const c of String(a.slug || a.titre)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return (h % 6) + 1;
  }

  function couverture(a) {
    if (a.image) return `<div class="couverture"><img src="${esc(cheminLocal(a.image))}" alt="" loading="lazy"></div>`;
    const motif = a.motif || String(a.titre || "").charAt(0);
    return `<div class="couverture motif couv-${teinte(a)}" aria-hidden="true"><span class="motif-texte" dir="auto">${esc(motif)}</span></div>`;
  }

  const lienArticle = (slug) => "article.html?a=" + encodeURIComponent(slug);

  function carteArticle(a) {
    return `<a class="carte-article" href="${esc(lienArticle(a.slug))}">
      ${couverture(a)}
      <span class="carte-meta"><span class="rubrique">${esc(a.categorie)}</span><span>${esc(dateArticle(a.date))}</span></span>
      <h3>${esc(a.titre)}</h3>
      <p>${esc(a.resume)}</p>
    </a>`;
  }

  /* Markdown simplifié : intertitres, listes, citations, images, liens, gras, italique */
  const urlSure = (u) => (/^\s*(javascript|data|vbscript):/i.test(u) ? "#" : cheminLocal(u));

  function enLigne(t) {
    return t
      .replace(/\\([\\`*_{}\[\]()#+\-.!~|])/g, (m, c) => `&#${c.charCodeAt(0)};`)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, src) => `<img src="${urlSure(src)}" alt="${alt}" loading="lazy">`)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, txt, href) =>
        `<a href="${urlSure(href)}"${/^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : ""}>${txt}</a>`)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^\w])__([^_]+)__(?=[^\w]|$)/g, "$1<strong>$2</strong>")
      .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>")
      .replace(/(^|[^\w])_([^_\s][^_]*?)_(?=[^\w]|$)/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function markdown(source) {
    const lignes = esc(source).replace(/\r/g, "").split("\n");
    let html = "";
    let para = [];
    let liste = null;
    let citation = [];

    const fermerPara = () => { if (para.length) { html += `<p>${enLigne(para.join(" "))}</p>`; para = []; } };
    const fermerListe = () => {
      if (liste) {
        html += `<${liste.type}>${liste.items.map((i) => `<li>${enLigne(i)}</li>`).join("")}</${liste.type}>`;
        liste = null;
      }
    };
    const fermerCitation = () => { if (citation.length) { html += `<blockquote><p>${enLigne(citation.join(" "))}</p></blockquote>`; citation = []; } };
    const toutFermer = () => { fermerPara(); fermerListe(); fermerCitation(); };
    const item = (type, texte) => {
      fermerPara();
      fermerCitation();
      if (!liste || liste.type !== type) { fermerListe(); liste = { type, items: [] }; }
      liste.items.push(texte);
    };

    for (const brut of lignes) {
      const l = brut.trim();
      let m;
      if (!l) { toutFermer(); continue; }
      if ((m = l.match(/^(#{1,3})\s+(.*)$/))) {
        toutFermer();
        const n = m[1].length + 1;
        html += `<h${n}>${enLigne(m[2])}</h${n}>`;
      } else if ((m = l.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/))) {
        toutFermer();
        html += `<figure><img src="${urlSure(m[2])}" alt="${m[1]}" loading="lazy">${m[1] ? `<figcaption>${m[1]}</figcaption>` : ""}</figure>`;
      } else if ((m = l.match(/^&gt;\s?(.*)$/))) {
        fermerPara();
        fermerListe();
        citation.push(m[1]);
      } else if ((m = l.match(/^[-*]\s+(.*)$/))) {
        item("ul", m[1]);
      } else if ((m = l.match(/^\d+[.)]\s+(.*)$/))) {
        item("ol", m[1]);
      } else if (liste && /^\s{2,}/.test(brut)) {
        liste.items[liste.items.length - 1] += " " + l;
      } else {
        fermerListe();
        fermerCitation();
        const saut = /\\$/.test(l) || / {2,}$/.test(brut);
        para.push(saut ? l.replace(/\\$/, "") + "<br>" : l);
      }
    }
    toutFermer();
    return html;
  }

  /* ------------------------------------------------------------------------
     En-tête et pied de page
     ------------------------------------------------------------------------ */

  const NAVIGATION = [
    ["index.html", "Accueil", "accueil"],
    ["association.html", "L'association", "association"],
    ["activites.html", "Nos activités", "activites"],
    ["agenda.html", "Agenda", "agenda"],
    ["blog.html", "Blog", "blog"],
    ["contact.html", "Contact", "contact"]
  ];

  const page = document.body.dataset.page || "";
  const lienAdhesion = SITE.adhesionEnLigne || "contact.html#adhesion";
  const contact = SITE.contact || {};
  const telLien = (t) => "tel:" + String(t || "").replace(/[^\d+]/g, "");

  /* Logo de l'association (assets/img/) : texte foncé sur fond clair, texte clair sur fond
     sombre. Le pied de page, toujours sombre, n'utilise que la version claire. */
  function marque(surFondSombre) {
    const img = (fichier, classe) =>
      `<img class="logo ${classe}" src="assets/img/${fichier}" alt="" width="649" height="218">`;
    return `<a class="brand" href="index.html" aria-label="${esc(SITE.nom)}, accueil">
      ${surFondSombre ? img("logo-negatif.svg", "") : img("logo.svg", "logo-pour-clair") + img("logo-negatif.svg", "logo-pour-sombre")}
    </a>`;
  }

  function themeActuel() {
    const choisi = document.documentElement.dataset.theme;
    if (choisi) return choisi;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function rendreEntete() {
    const entete = document.querySelector("[data-site-header]");
    if (!entete) return;
    const liens = NAVIGATION.map(([href, libelle, id]) => {
      const actif = id === page || (page === "article" && id === "blog");
      return `<li><a href="${href}"${actif ? ' aria-current="page"' : ""}>${libelle}</a></li>`;
    }).join("");
    entete.innerHTML = `<div class="wrap header-inner">
      ${marque()}
      <nav class="main-nav" id="menu-principal" aria-label="Navigation principale"><ul>${liens}</ul></nav>
      <div class="header-actions">
        <button class="icon-btn theme-toggle" type="button"></button>
        <a class="btn btn--primary btn--sm" href="${esc(lienAdhesion)}">Adhérer</a>
        <button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Ouvrir le menu">${icone("menu")}</button>
      </div>
    </div>`;

    // Thème clair / sombre
    const boutonTheme = entete.querySelector(".theme-toggle");
    const majBouton = () => {
      const sombre = themeActuel() === "dark";
      boutonTheme.innerHTML = icone(sombre ? "soleil" : "lune");
      boutonTheme.setAttribute("aria-label", sombre ? "Passer au thème clair" : "Passer au thème sombre");
    };
    majBouton();
    boutonTheme.addEventListener("click", () => {
      const nouveau = themeActuel() === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nouveau;
      try { localStorage.setItem("theme", nouveau); } catch (e) { /* stockage indisponible */ }
      majBouton();
    });

    // Menu mobile
    const bouton = entete.querySelector(".nav-toggle");
    const menu = entete.querySelector(".main-nav");
    const fermer = () => {
      menu.classList.remove("ouvert");
      bouton.setAttribute("aria-expanded", "false");
      bouton.setAttribute("aria-label", "Ouvrir le menu");
    };
    bouton.addEventListener("click", () => {
      const ouvert = menu.classList.toggle("ouvert");
      bouton.setAttribute("aria-expanded", String(ouvert));
      bouton.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) fermer(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("ouvert")) { fermer(); bouton.focus(); } });
    window.addEventListener("resize", () => { if (window.innerWidth > 1040) fermer(); });
  }

  function rendrePied() {
    const pied = document.querySelector("[data-site-footer]");
    if (!pied) return;
    pied.classList.add("motif");
    const reseaux = Object.entries(SITE.reseaux || {})
      .filter(([, url]) => url)
      .map(([nom, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${esc(majuscule(nom))}">${icone(nom)}</a>`)
      .join("");
    pied.innerHTML = `<div class="wrap">
      <div class="footer-grid">
        <div>
          ${marque(true)}
          <p class="footer-slogan">${esc(SITE.slogan)}</p>
          <p class="footer-devise">${[SITE.sousTitre, SITE.devise].filter(Boolean).map(esc).join(" · ")}</p>
          ${reseaux ? `<div class="reseaux">${reseaux}</div>` : ""}
        </div>
        <div>
          <h2>Le site</h2>
          <ul>${NAVIGATION.map(([href, libelle]) => `<li><a href="${href}">${libelle}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h2>Nous trouver</h2>
          <ul>
            <li>${esc(contact.adresse)}<br>${esc(contact.codePostalVille)}</li>
            <li><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></li>
            <li><a href="${esc(telLien(contact.telephone))}">${esc(contact.telephone)}</a></li>
          </ul>
        </div>
        <div>
          <h2>Permanences</h2>
          <ul>
            <li>${esc(contact.permanences)}</li>
            <li><a href="${esc(lienAdhesion)}">Adhérer</a></li>
            <li><a href="contact.html#benevolat">Devenir bénévole</a></li>
            <li><a href="contact.html#partenariat">Devenir partenaire</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bas">
        <span>© ${new Date().getFullYear()} ${esc(SITE.nom)}</span>
        <nav aria-label="Liens secondaires"><a href="mentions-legales.html">Mentions légales</a><a href="admin/" rel="nofollow">Administration</a></nav>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------------
     Blocs automatiques
     ------------------------------------------------------------------------ */

  function lire(chemin) {
    return chemin.split(".").reduce((o, k) => (o == null ? undefined : o[k]), SITE);
  }

  function remplirConfig() {
    document.querySelectorAll("[data-icone]").forEach((el) => { el.innerHTML = icone(el.dataset.icone); });
    document.querySelectorAll("[data-cfg]").forEach((el) => { el.textContent = lire(el.dataset.cfg) ?? ""; });
    document.querySelectorAll("[data-cfg-lien]").forEach((el) => {
      const type = el.dataset.cfgLien;
      if (type === "email") { el.href = "mailto:" + contact.email; el.textContent = contact.email; }
      if (type === "telephone") { el.href = telLien(contact.telephone); el.textContent = contact.telephone; }
      if (type === "adhesion") { el.href = lienAdhesion; }
    });
  }

  function blocsEvenements() {
    document.querySelectorAll("[data-evenements]").forEach((zone) => {
      const categories = zone.dataset.categories ? zone.dataset.categories.split(",").map((s) => s.trim()) : null;
      const limite = Number(zone.dataset.limite) || 3;
      // Un rendez-vous régulier n'apparaît qu'une fois dans ces listes courtes
      const vus = new Set();
      const liste = aVenir({ categories }).filter((o) => {
        if (!o.regulier) return true;
        if (vus.has(o.id)) return false;
        vus.add(o.id);
        return true;
      }).slice(0, limite);
      zone.innerHTML = liste.length
        ? `<ul class="liste-evenements">${liste.map(ligneEvenement).join("")}</ul>`
        : `<p class="vide">Aucun rendez-vous programmé pour le moment. Revenez bientôt ou <a href="contact.html">écrivez-nous</a> pour être tenu informé.</p>`;
    });
  }

  function blocsArticles() {
    document.querySelectorAll("[data-articles]").forEach((zone) => {
      const limite = Number(zone.dataset.limite) || 3;
      const liste = articles().slice(0, limite);
      zone.innerHTML = liste.length
        ? `<div class="grille-articles">${liste.map(carteArticle).join("")}</div>`
        : `<p class="vide">Les premiers articles arrivent bientôt.</p>`;
    });
  }

  function blocProchain() {
    document.querySelectorAll("[data-prochain]").forEach((zone) => {
      const o = aVenir({ limite: 1 })[0];
      if (!o) { zone.remove(); return; }
      zone.innerHTML = `<a class="prochain cat-${esc(o.categorie)}" href="agenda.html#${esc(o.cle)}">
        ${blocDate(o.jour)}
        <span class="prochain-texte">
          <small>Prochain rendez-vous</small>
          <strong>${esc(o.titre)}</strong>
          <span>${esc(o.debut ? plageHoraire(o) : plageDates(o))}${o.lieu ? " · " + esc(o.lieu) : ""}</span>
        </span>
      </a>`;
    });
  }

  /* Mot de bienvenue de la page d'accueil : ajoutez ou retirez des langues ici. */
  const SALUTS = [
    { mot: "Bienvenue", langue: "Français", lang: "fr" },
    { mot: "أهلاً وسهلاً", prononciation: "ahlan wa sahlan", langue: "Arabe", lang: "ar", rtl: true },
    { mot: "مرحبا بيكم", prononciation: "mrehba bikoum", langue: "Marocain", lang: "ary", rtl: true },
    { mot: "مرحبا بيكم", prononciation: "marhba bikoum", langue: "Algérien", lang: "arq", rtl: true },
    { mot: "مرحبا بيكم", prononciation: "marhbé bikom", langue: "Tunisien", lang: "aeb", rtl: true }
  ];

  function blocSalut() {
    const zone = document.querySelector("[data-salut]");
    if (!zone) return;
    const mots = zone.querySelector(".salut");
    const boutons = zone.querySelector(".langues-liste");
    mots.innerHTML = SALUTS.map((s, i) =>
      `<span class="salut-mot${i === 0 ? " actif" : ""}">
        <span class="salut-texte" lang="${s.lang}"${s.rtl ? ' dir="rtl"' : ""}>${esc(s.mot)}</span>
        ${s.prononciation ? `<small lang="${s.lang}-Latn">${esc(s.prononciation)}</small>` : ""}
      </span>`).join("");
    boutons.innerHTML = SALUTS.map((s, i) =>
      `<li><button type="button" aria-pressed="${i === 0}" data-i="${i}">${esc(s.langue)}</button></li>`).join("");

    let courant = 0;
    let minuteur = null;
    const montrer = (i) => {
      courant = i;
      mots.querySelectorAll(".salut-mot").forEach((el, j) => el.classList.toggle("actif", j === i));
      boutons.querySelectorAll("button").forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
    };
    boutons.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      clearInterval(minuteur);
      montrer(Number(b.dataset.i));
    });
    const calme = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!calme) minuteur = setInterval(() => montrer((courant + 1) % SALUTS.length), 3200);
  }

  /* ------------------------------------------------------------------------
     Démarrage
     ------------------------------------------------------------------------ */

  Object.assign(Site, {
    config: SITE,
    icone, esc, majuscule, versDate, versISO, ajouterJours, aujourdhui,
    dateLongue, heure, fMoisAnnee, numeroJour,
    occurrences, aVenir, nomCategorie, plageHoraire, plageDates, blocDate, ligneEvenement,
    ics, lienGoogle, telecharger, copier,
    articles, lienArticle, dateArticle, tempsLecture, couverture, carteArticle, markdown
  });

  // Le nom de l'association se règle dans l'administration : on l'applique au titre de l'onglet
  if (SITE.nom) {
    document.title = document.title.includes(" · ")
      ? document.title.replace(/ · [^·]*$/, " · " + SITE.nom)
      : SITE.nom;
  }

  rendreEntete();
  rendrePied();
  remplirConfig();
  blocsEvenements();
  blocsArticles();
  blocProchain();
  blocSalut();
})();
