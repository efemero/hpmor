# Harry Potter et les méthodes de la rationalité

Dernière version de l’epub: [hpmor.epub](https://github.com/efemero/hpmor/releases/latest/download/hpmor.epub)

Dernière version du pdf: [hpmor.pdf](https://github.com/efemero/hpmor/releases/latest/download/hpmor.pdf)

## But

Ce projet a pour but de générer une version epub (pour liseuse) et PDF (pour impression) de « Harry Potter et les méthodes de la rationalité ».

C’est une traduction en français de [Harry Potter and the Methods of Rationality](https://hpmor.com/) (souvent abbrégé par son acronyme HPMOR) de [Eliezer Yudkowsky](https://www.yudkowsky.net/).
C’est une [fanfiction](https://fr.wikipedia.org/wiki/Fanfiction) dans l’univers de « Harry Potter » de [J. K. Rowling](https://www.jkrowling.com/).
Dans ce récit, la tante de Harry, Pétunia, a épousé un professeur de biochimie de l’université de Oxford, et ils ont adopté Harry à la mort de ses parents.
Ils ont élevé leur fils adoptif en tant que rationaliste, et l’histoire débute alors que Harry reçoit sa lettre pour Poudlard.

J’ai lu cette traduction d’abord sur smartphone sur [fanfiction.net](https://www.fanfiction.net/s/6910226/1/Harry-Potter-et-les-M%C3%A9thodes-de-la-Rationalit%C3%A9), puis sur ma liseuse grâce aux efforts colossaux de [AdrienH](https://www.fanfiction.net/u/2842070/AdrienH) et [yeKcim](https://github.com/yeKcim).

J’ai trouvé que la présentation du texte avait quelques imperfections, et j’ai décidé d’essayer d’apporter les améliorations que j’aurais aimé avoir quand je le lisais.

Ce n’est aucunement un dénigrement du travail fourni par ces deux personnes, que du contraire, mais comme en sciences, je me repose [sur les épaules de géants](https://fr.wikipedia.org/wiki/Des_nains_sur_des_%C3%A9paules_de_g%C3%A9ants) pour apporter ma petite contribution et aller un peu plus loin.

## Technique

La base est l’epub généré par yeKcim en version `22.04` disponible à l’adresse suivante: <https://github.com/yeKcim/hpmor/releases/tag/v22.04>.

Le fichier epub a été dézippé, et les fichiers xhtml obtenus ont été transformés en markdown via pandoc avec la commande suivante:
```
pandoc --from html --to markdown_mmd  -o $md_file $xhtml_file
```
où `$xhtml_file` représente un fichier `.xhtml` et `$md_file` est le fichier équivalent en markdown avec l’extension `.md`.

Les fichiers `Sectionxxxx.md` ont ensuite été renommés en `chapterxxx.md` et c’est la base de travail de ce projet.

Les fichiers finaux sont générés par pandoc via une [github action](.github/workflows/artifacts.yml) à chaque tag du projet.

## Avancement du projet

- [x] génération des fichiers epub et PDF
- [ ] Retrait des en-têtes de chapitre (disclaimer sur J. K. Rowling et citations)
- [ ] Traduction des noms des personnages cohérente avec la traduction française
- [ ] Correction des problèmes de ponctuation et des typos
- [ ] Amélioration visuelle des sauts de paragraphes (les lignes horizontales entre certains paragraphes)
- [ ] Amélioration visuelle du template PDF


    
  

