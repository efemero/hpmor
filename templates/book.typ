#set text(
  font: "EB Garamond",
  size: 14pt,
)
#set par(
  justify: true,
  first-line-indent: 1em,
)

// Workaround for https://github.com/typst/typst/issues/2722
#let is-page-empty() = {
  let page-num = here().page()
  query(<empty-page-start>)
    .zip(query(<empty-page-end>))
    .any(((start, end)) => {
      (start.location().page() < page-num and page-num < end.location().page())
    })
}

#let title = "$title_short$"
#set page(
  paper: "a5",
  footer: context {
    set text(font: "Lumos_FR")
    set align(center)
    [#sub(baseline: 0.25em, size: 1em, [\*]) #counter(page).get().first() #sub(
        baseline: 0.25em,
        size: 1em,
        [\*],
      )]
  },
  margin: (inside: 2cm, outside: 1.5cm),
  header: context {
    // Is this an empty page inserted to keep page parity?
    if is-page-empty() {
      return
    }

    // Are we on a page that starts a chapter?
    let i = here().page()
    if query(heading).any(it => it.location().page() == i) {
      return
    }

    // Find the heading of the section we are currently in.
    let before = query(selector(heading).before(here()))
    if before != () {
      set text(0.75em)
      let header = smallcaps(before.last().body)
      let title = smallcaps(title)
      text(align(center, if calc.even(i) { title } else { header }))
    }
  },
)


#show heading: set text(font: "Lumos_FR", size: 1.5em, hyphenate: false)
#show heading: set align(center)
#show heading.where(level: 1): it => pagebreak(weak: true) + it
#set heading(numbering: "1.")
#let lettrine(term) = text(size: 1.5em, font: "Lumos_FR", box[#term])
#let serpent(term) = text(font: "Parseltongue", box[#term])
#let horizontalrule = align(center, text(font: "Lumos_FR", size: 1.5em, [#sub(
    baseline: 0.25em,
    size: 1em,
    [\*],
  ) \* #sub(baseline: 0.25em, size: 1em, [\*])]))

#outline(title: "Table des matières")

#pagebreak(to: "even")

#heading(numbering: none)[Avant-propos]
<avant-propos>
#block[
  Avertissement : J.K. Rowling possède Harry Potter, et personne ne
  possède les méthodes de la rationalité.

]

#horizontalrule

Cette histoire ne diverge pas de l'originale à partir d'un seul point.
Il existe un point de départ principal, quelque part dans le passé, mais
aussi d'autres altérations. La meilleure description qu'il m'ait été
donnée d'entendre est « univers parallèle ».

L'histoire contient de nombreux indices : certains évidents, d'autres
moins, et certains tellement obscurs que j'ai été extrêmement surpris de
voir certains lecteurs les repérer. Il y a aussi des réponses limpides
cachées sous votre nez. C'est une histoire rationaliste : ses mystères
peuvent et doivent être résolus.

Son rythme est celui d'une série télévisée qui s'étalerait sur plusieurs
saisons et dont chaque épisode aurait son histoire en plus d'un arc
global qui mène à une conclusion finale.

Tout ce qui concerne la science est vrai. Cela dit, gardez à l'esprit
qu'au-delà du domaine scientifique, l'auteur et les personnages ne sont
pas toujours d'accord. Chaque acte du personnage principal n'est pas une
leçon de sagesse, et les conseils offerts par les personnages les plus
sombres peuvent être trompeurs, dangereux ou à double tranchant.

#pagebreak(to: "odd")

$body$
