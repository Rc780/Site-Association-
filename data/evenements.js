---
layout: null
# Fichier généré par GitHub Pages à partir de _data/evenements/ (un fichier par événement).
# Pour ajouter ou modifier un événement : utilisez l'administration du site (/admin/).
---
window.EVENEMENTS = [
{%- for fichier in site.data.evenements %}
  Object.assign({ id: {{ fichier[0] | jsonify }} }, {{ fichier[1] | jsonify }}){% unless forloop.last %},{% endunless %}
{%- endfor %}
];
