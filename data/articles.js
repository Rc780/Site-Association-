---
layout: null
# Fichier généré par GitHub Pages à partir de _data/articles/ (un fichier par article).
# Pour écrire ou modifier un article : utilisez l'administration du site (/admin/).
---
window.ARTICLES = [
{%- for fichier in site.data.articles %}
  Object.assign({ slug: {{ fichier[0] | jsonify }} }, {{ fichier[1] | jsonify }}){% unless forloop.last %},{% endunless %}
{%- endfor %}
];
