# Harry Potter et les méthodes de la rationalité

Dernière version de l’epub: [hpmor.epub](https://github.com/efemero/hpmor/releases/latest/download/hpmor.epub)

Dernière version du pdf: [hpmor.pdf](https://github.com/efemero/hpmor/releases/latest/download/hpmor.pdf)

Ce projet a pour but de générer une version epub et PDF de « Harry Potter et les méthodes de la rationalité ». 
Il se base sur l’epub généré par yeKcim en version `22.04` disponible à l’adresse suivante: <https://github.com/yeKcim/hpmor/releases/tag/v22.04>.

Le fichier epub a été dézippé, et les fichiers xhtml obtenus ont été transformés en markdown via pandoc avec la commande suivante:
```
pandoc --from html --to markdown_mmd  -o $md_file $xhtml_file
```
où `$xhtml_file` représente un fichier `.xhtml` et `$md_file` est le fichier équivalent en markdown avec l’extension `.md`.

Les fichiers `Sectionxxxx.md` ont ensuite été renommés en `chapterxxx.md` et c’est la base de travail de ce projet.

    
  

