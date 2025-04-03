# Harry Potter et les méthodes de la rationalité

Dernière version de l’epub: [hpmor.epub](https://github.com/efemero/hpmor/releases/latest/download/hpmor.epub)

Dernière version du pdf: [hpmor.pdf](https://github.com/efemero/hpmor/releases/latest/download/hpmor.pdf)

## But

Ce projet a pour but de générer une version epub (pour liseuse) et PDF (pour impression) de « Harry Potter et les méthodes de la rationalité ».

C’est une traduction en français de [Harry Potter and the Methods of Rationality](https://hpmor.com/) (souvent abbrégé par son acronyme HPMOR) de [Eliezer Yudkowsky](https://www.yudkowsky.net/).
C’est une [fanfiction](https://fr.wikipedia.org/wiki/Fanfiction) dans l’univers de « Harry Potter » de [J. K. Rowling](https://www.jkrowling.com/).
Dans ce récit, la tante de Harry, Pétunia, a épousé un professeur de biochimie de l’université de Oxford, et ils ont adopté Harry à la mort de ses parents.
Ils ont élevé leur fils adoptif en tant que rationaliste, et l’histoire débute alors que Harry reçoit sa lettre pour Poudlard.

## Technique

La base est l’epub généré par yeKcim en version `22.04` disponible à l’adresse suivante: <https://github.com/yeKcim/hpmor/releases/tag/v22.04>.

Le fichier epub a été dézippé, et les fichiers xhtml obtenus ont été transformés en markdown via pandoc avec la commande suivante:
```
pandoc --from html --to markdown_mmd  -o $md_file $xhtml_file
```
où `$xhtml_file` représente un fichier `.xhtml` et `$md_file` est le fichier équivalent en markdown avec l’extension `.md`.

Les fichiers `Sectionxxxx.md` ont ensuite été renommés en `chapterxxx.md` et c’est la base de travail de ce projet.

## Avancement du projet

- [x] génération des fichiers epub et PDF
- [ ] Retrait des en-têtes de chapitre (disclaimer sur J. K. Rowling et citations)
- [ ] Traduction des noms des personnages cohérente avec la traduction française
- [ ] Correction des problèmes de ponctuation et des typos


    
  

