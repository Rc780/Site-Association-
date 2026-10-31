/* ==========================================================================
   Page Contact : préremplissage de l'objet et envoi du formulaire.
   - Si SITE.formulaire contient une adresse (Formspree…), le message y est envoyé.
   - Sinon, la messagerie du visiteur s'ouvre avec le message prérempli.
   ========================================================================== */

(function () {
  "use strict";

  const S = window.Site;
  const SITE = S.config;
  const $ = (id) => document.getElementById(id);

  const form = $("form-contact");
  const objet = $("f-objet");
  const etat = $("etat");
  const champLangues = $("champ-langues");

  // Bouton « Adhérer en ligne » seulement si un lien est configuré
  document.querySelectorAll("[data-adhesion-en-ligne]").forEach((b) => {
    if (!SITE.adhesionEnLigne) b.remove();
    else { b.target = "_blank"; b.rel = "noopener"; }
  });

  function choisirObjet(valeur) {
    if ([...objet.options].some((o) => o.value === valeur)) objet.value = valeur;
    champLangues.hidden = !/traduction|Interprétariat/i.test(objet.value);
  }

  function allerAuFormulaire() {
    $("formulaire").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $("f-nom").focus({ preventScroll: true }), 400);
  }

  objet.addEventListener("change", () => choisirObjet(objet.value));

  document.querySelectorAll("[data-objet]").forEach((b) =>
    b.addEventListener("click", () => { choisirObjet(b.dataset.objet); allerAuFormulaire(); }));

  // Préremplissage depuis l'adresse : contact.html#traduction, contact.html?objet=…&evenement=…
  const ANCRES = {
    traduction: "Demande de traduction",
    devis: "Demande de traduction", // anciens liens
    interpretariat: "Interprétariat",
    atelier: "Inscription",
    adhesion: "Adhésion",
    benevolat: "Bénévolat",
    partenariat: "Partenariat"
  };
  const ancre = location.hash.slice(1);
  if (ANCRES[ancre]) {
    choisirObjet(ANCRES[ancre]);
    if (["traduction", "devis", "interpretariat", "atelier"].includes(ancre)) allerAuFormulaire();
  }
  const params = new URLSearchParams(location.search);
  if (params.get("objet")) choisirObjet(params.get("objet"));
  if (params.get("evenement")) {
    $("f-message").value = `Bonjour,\n\nJe souhaite m'inscrire à : ${params.get("evenement")}.\n\nMerci !`;
    allerAuFormulaire();
  }

  /* ---------------- Envoi ---------------- */

  function afficher(type, html) {
    etat.innerHTML = `<p class="message-etat ${type}">${html}</p>`;
  }

  function valider() {
    const erreurs = [];
    const verifier = (champ, ok, message) => {
      champ.setAttribute("aria-invalid", String(!ok));
      if (!ok) erreurs.push({ champ, message });
    };
    verifier($("f-nom"), $("f-nom").value.trim().length > 1, "indiquez votre nom");
    verifier($("f-email"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("f-email").value.trim()), "indiquez une adresse e-mail valide");
    verifier($("f-message"), $("f-message").value.trim().length > 4, "écrivez votre message");
    verifier($("f-accord"), $("f-accord").checked, "cochez la case d'accord");
    return erreurs;
  }

  function corpsMessage(donnees) {
    return [
      `Nom : ${donnees.nom}`,
      `E-mail : ${donnees.email}`,
      donnees.telephone ? `Téléphone : ${donnees.telephone}` : "",
      donnees.langues ? `Langues et documents : ${donnees.langues}` : "",
      "",
      donnees.message
    ].filter((l, i) => l !== "" || i === 4).join("\n");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const erreurs = valider();
    if (erreurs.length) {
      afficher("erreur", `Pour envoyer votre message, ${erreurs.map((x) => x.message).join(", ")}.`);
      erreurs[0].champ.focus();
      return;
    }

    const donnees = Object.fromEntries(new FormData(form).entries());
    if (champLangues.hidden) delete donnees.langues;
    const sujet = `[Site] ${donnees.objet} – ${donnees.nom}`;
    const bouton = form.querySelector('button[type="submit"]');

    if (SITE.formulaire) {
      bouton.disabled = true;
      bouton.textContent = "Envoi en cours…";
      try {
        const reponse = await fetch(SITE.formulaire, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.assign({ _subject: sujet }, donnees))
        });
        if (!reponse.ok) throw new Error(String(reponse.status));
        form.reset();
        choisirObjet(objet.value);
        afficher("ok", "Merci ! Votre message a bien été envoyé. Nous vous répondons dans les meilleurs délais.");
      } catch (err) {
        afficher("erreur", `L'envoi n'a pas abouti. Réessayez dans un instant ou écrivez-nous directement à <a href="mailto:${S.esc(SITE.contact.email)}">${S.esc(SITE.contact.email)}</a>.`);
      } finally {
        bouton.disabled = false;
        bouton.textContent = "Envoyer le message";
      }
      return;
    }

    // Sans service d'envoi : ouverture de la messagerie du visiteur
    const lien = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corpsMessage(donnees))}`;
    afficher("ok", `Votre messagerie va s'ouvrir avec le message prérempli : il ne vous reste qu'à l'envoyer. Si rien ne s'ouvre, écrivez-nous à <a href="mailto:${S.esc(SITE.contact.email)}">${S.esc(SITE.contact.email)}</a>.`);
    window.location.href = lien;
  });
})();
