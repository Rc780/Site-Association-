/* ==========================================================================
   Page Article : affiche l'article indiqué dans l'adresse (article.html?a=slug).
   ========================================================================== */

(function () {
  "use strict";

  const S = window.Site;
  const { esc, icone } = S;
  const zone = document.getElementById("article");

  function slugDemande() {
    return new URLSearchParams(location.search).get("a") || decodeURIComponent(location.hash.slice(1)) || "";
  }

  function introuvable() {
    document.title = `Article introuvable · ${S.config.nom}`;
    zone.innerHTML = `<section class="page-hero">
      <div class="wrap">
        <ol class="fil" aria-label="Fil d'Ariane"><li><a href="index.html">Accueil</a></li><li><a href="blog.html">Blog</a></li></ol>
        <h1>Cet article est introuvable</h1>
        <p class="lead">Il a peut-être été déplacé ou supprimé. Retrouvez toutes nos publications sur le blog.</p>
        <div class="btn-row"><a class="btn btn--primary" href="blog.html">Voir le blog</a></div>
      </div>
    </section>`;
  }

  function boutonsPartage(a) {
    const url = location.href.split("#")[0];
    const titre = a.titre;
    return `<div class="partage">
      <button class="btn btn--ghost btn--sm" type="button" data-copier>${icone("copier")} Copier le lien</button>
      <a class="btn btn--ghost btn--sm" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener">${icone("facebook")} Facebook</a>
      <a class="btn btn--ghost btn--sm" href="https://wa.me/?text=${encodeURIComponent(titre + " " + url)}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn btn--ghost btn--sm" href="mailto:?subject=${encodeURIComponent(titre)}&amp;body=${encodeURIComponent(url)}">${icone("mail")} E-mail</a>
    </div>`;
  }

  function rendre() {
    const tous = S.articles();
    const i = tous.findIndex((a) => a.slug === slugDemande());
    if (i < 0) { introuvable(); return; }

    const a = tous[i];
    const plusRecent = tous[i - 1];
    const plusAncien = tous[i + 1];
    const autres = tous.filter((x) => x !== a).slice(0, 3);

    document.title = `${a.titre} · ${S.config.nom}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", a.resume || "");

    zone.innerHTML = `
      <section class="page-hero">
        <div class="wrap">
          <ol class="fil" aria-label="Fil d'Ariane"><li><a href="index.html">Accueil</a></li><li><a href="blog.html">Blog</a></li><li>${esc(a.categorie)}</li></ol>
          <div class="article-tete">
            <span class="carte-meta">
              <span class="rubrique">${esc(a.categorie)}</span>
              <span>${esc(S.dateArticle(a.date))}</span>
              <span>${S.tempsLecture(a)} min de lecture</span>
            </span>
            <h1>${esc(a.titre)}</h1>
            <p class="lead lead--large">${esc(a.resume)}</p>
            <div class="auteur">
              <span class="pastille" aria-hidden="true">${esc(String(a.auteur || S.config.nom).replace(/^L'/, "").charAt(0).toUpperCase())}</span>
              <span><strong>${esc(a.auteur || S.config.nom)}</strong><br><span class="muted">Publié le ${esc(S.dateArticle(a.date))}</span></span>
            </div>
          </div>
          <div class="article-couv">${S.couverture(a)}</div>
        </div>
      </section>

      <section class="band band--serre">
        <div class="wrap">
          <div class="article-corps">
            <div class="prose">${S.markdown(a.contenu)}</div>
            <aside>
              <div>
                <p class="titre-petit">Partager</p>
                ${boutonsPartage(a)}
              </div>
              ${autres.length ? `<div>
                <p class="titre-petit">À lire aussi</p>
                <ul class="liens-articles">${autres.map((x) =>
                  `<li><a href="${esc(S.lienArticle(x.slug))}">${esc(x.titre)}</a><small>${esc(S.dateArticle(x.date))}</small></li>`).join("")}</ul>
              </div>` : ""}
              <div class="encart">
                <h3>Envie de participer ?</h3>
                <p class="muted">Ateliers, soirées, rencontres : retrouvez tous nos rendez-vous dans l'agenda.</p>
                <a class="btn btn--primary btn--sm" href="agenda.html">Voir l'agenda</a>
              </div>
            </aside>
          </div>

          <nav class="suite-articles" aria-label="Articles précédent et suivant">
            ${plusAncien ? `<a class="precedent" href="${esc(S.lienArticle(plusAncien.slug))}"><small>← Article précédent</small><strong>${esc(plusAncien.titre)}</strong></a>` : ""}
            ${plusRecent ? `<a class="suivant" href="${esc(S.lienArticle(plusRecent.slug))}"><small>Article suivant →</small><strong>${esc(plusRecent.titre)}</strong></a>` : ""}
          </nav>
        </div>
      </section>`;

    const copier = zone.querySelector("[data-copier]");
    copier.addEventListener("click", () => S.copier(location.href.split("#")[0], copier));
  }

  rendre();
  window.addEventListener("hashchange", () => { rendre(); window.scrollTo(0, 0); });
})();
