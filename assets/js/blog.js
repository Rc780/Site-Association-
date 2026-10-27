/* ==========================================================================
   Page Blog : article à la une, filtres par rubrique et recherche.
   Les articles viennent de data/articles.js.
   ========================================================================== */

(function () {
  "use strict";

  const S = window.Site;
  const { esc } = S;
  const $ = (id) => document.getElementById(id);

  const tous = S.articles();
  const rubriques = [...new Set(tous.map((a) => a.categorie).filter(Boolean))];
  let rubrique = null;
  let requete = "";

  const normaliser = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function rendreRubriques() {
    $("rubriques").innerHTML =
      `<button type="button" class="filtre filtre--simple" data-r="" aria-pressed="${!rubrique}">Tous les articles</button>` +
      rubriques.map((r, i) =>
        `<button type="button" class="filtre filtre--simple" data-r="${i}" aria-pressed="${r === rubrique}">${esc(r)}</button>`).join("");
  }

  function une(a) {
    const lien = esc(S.lienArticle(a.slug));
    return `<article class="article-une">
      <a href="${lien}" tabindex="-1" aria-hidden="true">${S.couverture(a)}</a>
      <div class="stack">
        <span class="carte-meta">
          <span class="rubrique">${esc(a.categorie)}</span>
          <span>${esc(S.dateArticle(a.date))}</span>
          <span>${S.tempsLecture(a)} min de lecture</span>
        </span>
        <h2><a href="${lien}">${esc(a.titre)}</a></h2>
        <p>${esc(a.resume)}</p>
        <a class="lien-fleche" href="${lien}">Lire l'article</a>
      </div>
    </article>`;
  }

  function rendre() {
    const q = normaliser(requete.trim());
    const liste = tous.filter((a) =>
      (!rubrique || a.categorie === rubrique) &&
      (!q || normaliser([a.titre, a.resume, a.categorie, a.contenu].join(" ")).includes(q)));
    const filtre = Boolean(rubrique || q);

    const compte = $("compte");
    compte.hidden = !filtre;
    compte.textContent = filtre
      ? `${liste.length} article${liste.length > 1 ? "s" : ""}${rubrique ? ` dans « ${rubrique} »` : ""}${q ? ` pour « ${requete.trim()} »` : ""}`
      : "";

    if (!liste.length) {
      $("une").innerHTML = "";
      $("grille").innerHTML = `<p class="vide">Aucun article ne correspond à votre recherche.</p>`;
      return;
    }
    // Sans filtre, l'article le plus récent est mis à la une
    const [premier, ...reste] = filtre ? [null, ...liste] : liste;
    $("une").innerHTML = premier ? une(premier) : "";
    $("grille").innerHTML = reste.length ? `<div class="grille-articles">${reste.map(S.carteArticle).join("")}</div>` : "";
  }

  $("rubriques").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-r]");
    if (!b) return;
    rubrique = b.dataset.r === "" ? null : rubriques[Number(b.dataset.r)];
    rendreRubriques();
    rendre();
  });

  $("recherche").addEventListener("input", (e) => {
    requete = e.target.value;
    rendre();
  });

  rendreRubriques();
  rendre();
})();
