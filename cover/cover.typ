#let cover(
  serie_order: none,
  title_full: none,
  title_short: none,
  front_image: none,
  extract: none,
) = {
  set text(
    font: "Lumos_FR",
    size: 14pt,
  )

  text(size: 2em, align(
    center,
    [Harry Potter et les méthodes de la rationalité],
  ))


  text(font: "EB Garamond", align(center, smallcaps([*Livre #serie_order*])))

  v(1fr)

  block(height: 3fr, text(size: 3em, align(
    center,
    title_full,
  )))

  v(1fr)
  align(center, image(front_image, height: 2fr))
  v(1fr)

  text(font: "EB Garamond", size: 1.5em, align(center, smallcaps(
    [– Eliezer Yudkowzky –],
  )))

  pagebreak()
  pagebreak()
  pagebreak()
  page(
    footer: grid(
      columns: (1fr, 1fr),
      align: (left, right),
      [#text(size: 1.3em, font: "EB Garamond", [_Traduction: AdrienH_])],
      [#text(size: 1.3em, font: "EB Garamond", [_Édition: yeKcim & efemero_])],
    ),
    [
      #text(size: 1em, align(
        center,
        [Harry Potter et les méthodes de la rationalité],
      ))

      #text(font: "EB Garamond", align(center, [#serie_order]))

      #text(size: 2em, align(
        center,
        title_short,
      ))
      #v(1fr)

      #align(center, block(height: 1fr, [
        #text(font: "EB Garamond", align(center, smallcaps(extract)))
      ]))
      #align(center, image("img/deathly_hallows.svg", height: 3fr))

    ],
  )
}

