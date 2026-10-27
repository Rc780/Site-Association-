/* ==========================================================================
   Page Agenda : calendrier mensuel, liste, filtres et fiche d'événement.
   Les événements viennent de data/evenements.js.
   ========================================================================== */

(function () {
  "use strict";

  const S = window.Site;
  const { esc, icone, versDate, versISO, ajouterJours, aujourdhui } = S;
  const $ = (id) => document.getElementById(id);

  const CATEGORIES = Object.keys(S.config.categories || {});
  const auj = aujourdhui();

  const etat = {
    mois: new Date(auj.getFullYear(), auj.getMonth(), 1),
    selection: auj,
    actives: null, // null = toutes les catégories
    vue: "mois",
    passes: false
  };

  try { if (localStorage.getItem("agenda-vue") === "liste") etat.vue = "liste"; } catch (e) { /* stockage indisponible */ }

  const visible = (o) => !etat.actives || etat.actives.has(o.categorie);
  const visibles = () => S.occurrences().filter(visible);
  const duJour = (jour) => visibles().filter((o) => o.jour <= jour && o.jourFin >= jour);

  /* ---------------- Filtres ---------------- */

  function rendreFiltres() {
    const zone = $("filtres");
    zone.dataset.tout = String(!etat.actives);
    zone.innerHTML =
      `<button type="button" class="filtre filtre--simple" data-cat="*" aria-pressed="${!etat.actives}">Tout</button>` +
      CATEGORIES.map((c) =>
        `<button type="button" class="filtre cat-${esc(c)}" data-cat="${esc(c)}" aria-pressed="${Boolean(etat.actives && etat.actives.has(c))}">${esc(S.nomCategorie(c))}</button>`
      ).join("");
  }

  $("filtres").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-cat]");
    if (!b) return;
    const c = b.dataset.cat;
    if (c === "*") {
      etat.actives = null;
    } else {
      etat.actives = etat.actives || new Set();
      if (etat.actives.has(c)) etat.actives.delete(c);
      else etat.actives.add(c);
      if (!etat.actives.size || etat.actives.size === CATEGORIES.length) etat.actives = null;
    }
    rendreFiltres();
    rendreTout();
    const meme = $("filtres").querySelector(`[data-cat="${c}"]`);
    if (meme) meme.focus();
  });

  /* ---------------- Calendrier ---------------- */

  function rendreMois() {
    const m = etat.mois;
    $("cal-titre").textContent = S.fMoisAnnee.format(m);
    const premier = new Date(m.getFullYear(), m.getMonth(), 1);
    const decalage = (premier.getDay() + 6) % 7; // la semaine commence le lundi
    const debut = ajouterJours(premier, -decalage);
    const nbJours = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    const nbCases = Math.ceil((decalage + nbJours) / 7) * 7;

    let html = "";
    for (let i = 0; i < nbCases; i++) {
      const j = ajouterJours(debut, i);
      const evts = duJour(j);
      const classes = ["cal-case"];
      if (j.getMonth() !== m.getMonth()) classes.push("hors-mois");
      if (+j === +auj) classes.push("aujourdhui");
      if (+j === +etat.selection) classes.push("selection");
      const libelle = `${S.dateLongue(j)} : ${evts.length ? evts.length + " rendez-vous" : "aucun rendez-vous"}`;
      html += `<div class="${classes.join(" ")}" data-jour="${versISO(j)}">
        <button type="button" class="cal-num" aria-label="${esc(libelle)}"${+j === +auj ? ' aria-current="date"' : ""}>${j.getDate()}</button>
        ${evts.slice(0, 2).map((o) =>
          `<a class="cal-evt cat-${esc(o.categorie)}" href="#${esc(o.cle)}">${o.debut ? `<b>${esc(S.heure(o.debut))}</b>` : ""}<span>${esc(o.titre)}</span></a>`).join("")}
        ${evts.length > 2 ? `<span class="cal-plus">+ ${evts.length - 2} autre${evts.length > 3 ? "s" : ""}</span>` : ""}
        ${evts.length ? `<span class="cal-points" aria-hidden="true">${evts.slice(0, 4).map((o) => `<i class="cat-${esc(o.categorie)}"></i>`).join("")}</span>` : ""}
      </div>`;
    }
    $("cal-cases").innerHTML = html;
  }

  function changerMois(delta) {
    etat.mois = new Date(etat.mois.getFullYear(), etat.mois.getMonth() + delta, 1);
    rendreMois();
  }

  $("cal-prec").innerHTML = icone("gauche");
  $("cal-suiv").innerHTML = icone("droite");
  $("cal-prec").addEventListener("click", () => changerMois(-1));
  $("cal-suiv").addEventListener("click", () => changerMois(1));
  $("cal-auj").addEventListener("click", () => {
    etat.mois = new Date(auj.getFullYear(), auj.getMonth(), 1);
    etat.selection = auj;
    rendreMois();
    rendrePanneau();
  });

  $("cal-cases").addEventListener("click", (e) => {
    if (e.target.closest(".cal-evt")) return; // le lien ouvre la fiche
    const caseJour = e.target.closest(".cal-case");
    if (!caseJour) return;
    const j = versDate(caseJour.dataset.jour);
    etat.selection = j;
    if (j.getMonth() !== etat.mois.getMonth()) etat.mois = new Date(j.getFullYear(), j.getMonth(), 1);
    rendreMois();
    rendrePanneau(true);
    const bouton = $("cal-cases").querySelector(`[data-jour="${versISO(j)}"] .cal-num`);
    if (bouton && e.target.closest(".cal-num")) bouton.focus();
  });

  /* ---------------- Panneau du jour ---------------- */

  function miniEvenement(o) {
    return `<a class="mini-evt cat-${esc(o.categorie)}" href="#${esc(o.cle)}">
      <span class="tag">${esc(S.nomCategorie(o.categorie))}</span>
      <strong>${esc(o.titre)}</strong>
      <span class="evt-meta">
        <span>${icone("horloge")}${esc(S.plageHoraire(o))}</span>
        ${o.lieu ? `<span>${icone("lieu")}${esc(o.lieu)}</span>` : ""}
      </span>
    </a>`;
  }

  function rendrePanneau(depuisClic) {
    const panneau = $("panneau-jour");
    const j = etat.selection;
    const evts = duJour(j);
    let html = `<div class="stack stack--serre">
      <p class="eyebrow">${+j === +auj ? "Aujourd'hui" : "Jour sélectionné"}</p>
      <h3>${esc(S.dateLongue(j))}</h3>
    </div>`;
    if (evts.length) {
      html += evts.map(miniEvenement).join("");
    } else {
      html += `<p class="vide">Aucun rendez-vous ce jour-là.</p>`;
      const suivant = visibles().find((o) => o.jour > j);
      if (suivant) {
        html += `<p class="muted">Prochain rendez-vous : <a href="#${esc(suivant.cle)}">${esc(suivant.titre)}</a>, ${esc(S.dateLongue(suivant.jour, { annee: false }))}.</p>`;
      }
    }
    panneau.innerHTML = html;

    // Sur téléphone, le panneau est sous le calendrier : on le rend visible
    if (depuisClic && window.innerWidth <= 1000) {
      const haut = panneau.getBoundingClientRect().top;
      if (haut > window.innerHeight - 120) panneau.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------------- Liste ---------------- */

  function rendreListe() {
    const liste = visibles().filter((o) => etat.passes || o.jourFin >= auj);
    const zone = $("liste-contenu");
    if (!liste.length) {
      zone.innerHTML = `<p class="vide">Aucun rendez-vous à venir dans ces catégories.</p>`;
      return;
    }
    const groupes = new Map();
    liste.forEach((o) => {
      const cle = `${o.jour.getFullYear()}-${o.jour.getMonth()}`;
      if (!groupes.has(cle)) groupes.set(cle, []);
      groupes.get(cle).push(o);
    });
    zone.innerHTML = [...groupes.values()].map((g) =>
      `<section class="groupe-mois">
        <h2>${esc(S.fMoisAnnee.format(g[0].jour))} <small>${g.length} rendez-vous</small></h2>
        <ul class="liste-evenements">${g.map(S.ligneEvenement).join("")}</ul>
      </section>`).join("");
  }

  $("voir-passes").addEventListener("click", (e) => {
    etat.passes = !etat.passes;
    e.currentTarget.textContent = etat.passes ? "Masquer les événements passés" : "Afficher aussi les événements passés";
    rendreListe();
  });

  /* ---------------- Bascule calendrier / liste ---------------- */

  function appliquerVue() {
    document.querySelectorAll(".bascule button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.vue === etat.vue)));
    $("vue-mois").hidden = etat.vue !== "mois";
    $("vue-liste").hidden = etat.vue !== "liste";
  }

  document.querySelector(".bascule").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-vue]");
    if (!b) return;
    etat.vue = b.dataset.vue;
    try { localStorage.setItem("agenda-vue", etat.vue); } catch (err) { /* stockage indisponible */ }
    appliquerVue();
  });

  /* ---------------- Fiche d'un événement ---------------- */

  const fenetre = $("fenetre-evt");

  function texteRepetition(o) {
    const nomJour = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(o.jour);
    const n = Number(o.repetition.semaines) || 1;
    const rythme = n === 1 ? `Tous les ${nomJour}s` : n === 2 ? `Un ${nomJour} sur deux` : `Un ${nomJour} toutes les ${n} semaines`;
    return `${rythme}, jusqu'au ${S.dateLongue(versDate(o.repetition.jusquau), { semaine: false })}`;
  }

  function lienInscription(o) {
    if (!o.inscription) return "";
    if (/^contact\.html/.test(o.inscription)) {
      const params = new URLSearchParams({ objet: "Inscription", evenement: `${o.titre} (${S.dateLongue(o.jour)})` });
      return `<a class="btn btn--primary btn--sm" href="contact.html?${params.toString()}">S'inscrire</a>`;
    }
    return `<a class="btn btn--primary btn--sm" href="${esc(o.inscription)}" target="_blank" rel="noopener">S'inscrire ${icone("externe")}</a>`;
  }

  function ouvrir(o) {
    const c = esc(o.categorie);
    fenetre.innerHTML = `
      <div class="fenetre-bandeau cat-${c}"></div>
      <form method="dialog"><button class="icon-btn fenetre-fermer" aria-label="Fermer">${icone("fermer")}</button></form>
      <div class="fenetre-corps cat-${c}">
        <span class="tag">${esc(S.nomCategorie(o.categorie))}</span>
        <h2 id="fenetre-titre">${esc(o.titre)}</h2>
        <dl class="infos-evt">
          <div><dt>${icone("calendrier")}<span class="sr-only">Date</span></dt>
            <dd>${esc(S.plageDates(o))}${o.repetition ? `<small>${esc(texteRepetition(o))}</small>` : ""}</dd></div>
          <div><dt>${icone("horloge")}<span class="sr-only">Horaires</span></dt><dd>${esc(S.plageHoraire(o))}</dd></div>
          ${o.lieu ? `<div><dt>${icone("lieu")}<span class="sr-only">Lieu</span></dt><dd>${esc(o.lieu)}</dd></div>` : ""}
          ${o.prix ? `<div><dt>${icone("prix")}<span class="sr-only">Tarif</span></dt><dd>${esc(o.prix)}</dd></div>` : ""}
        </dl>
        ${o.description ? `<p>${esc(o.description)}</p>` : ""}
        <div class="btn-row">
          ${lienInscription(o)}
          <button class="btn btn--ghost btn--sm" type="button" data-action="ics">${icone("telecharger")} Ajouter à mon agenda</button>
          <a class="btn btn--ghost btn--sm" href="${esc(S.lienGoogle(o))}" target="_blank" rel="noopener">${icone("externe")} Google Agenda</a>
          <button class="btn btn--ghost btn--sm" type="button" data-action="copier">${icone("copier")} Copier le lien</button>
        </div>
      </div>`;

    fenetre.querySelector('[data-action="ics"]').addEventListener("click", () =>
      S.telecharger(`${o.cle}.ics`, S.ics(o), "text/calendar;charset=utf-8"));
    fenetre.querySelector('[data-action="copier"]').addEventListener("click", (e) =>
      S.copier(location.href.split("#")[0] + "#" + o.cle, e.currentTarget));

    if (typeof fenetre.showModal === "function") {
      if (!fenetre.open) fenetre.showModal();
    } else {
      fenetre.setAttribute("open", "");
    }
  }

  fenetre.addEventListener("close", () => {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  });
  fenetre.addEventListener("click", (e) => { if (e.target === fenetre) fenetre.close(); });

  function depuisAncre() {
    const cle = decodeURIComponent(location.hash.slice(1));
    if (!cle) return;
    const o = S.occurrences().find((x) => x.cle === cle);
    if (!o) return;
    etat.selection = o.jour;
    etat.mois = new Date(o.jour.getFullYear(), o.jour.getMonth(), 1);
    rendreMois();
    rendrePanneau();
    ouvrir(o);
  }

  /* ---------------- Démarrage ---------------- */

  function rendreTout() {
    rendreMois();
    rendrePanneau();
    rendreListe();
  }

  rendreFiltres();
  appliquerVue();
  rendreTout();
  depuisAncre();
  window.addEventListener("hashchange", depuisAncre);
})();
