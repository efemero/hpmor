// booklet.typ — imposition en livret, équivalent de :
//   pdfjam --nup 2x1 --landscape --signature 32 input.pdf -o output.pdf
//
// Usage :
//   typst compile booklet.typ output.pdf \
//     --input src=target/pdf/hpmor_1_book.pdf \
//     --input pages=712
//
// `pages` = nombre exact de pages du PDF source. Pour l'obtenir :
//   pdfinfo input.pdf | awk '/^Pages:/ {print $2}'

#let src = sys.inputs.at("src", default: "input.pdf")
#let n-pages = int(sys.inputs.at("pages"))
#let signature-size = int(sys.inputs.at("signature", default: "32"))

// Arrondir le total au multiple supérieur de signature-size (pages blanches en fin)
#let total = calc.ceil(n-pages / signature-size) * signature-size
#let n-signatures = int(total / signature-size)

// Calcul de l'ordre d'imposition par cahier (signature)
// Pour un cahier de S pages commençant à `start` :
//   feuille i (0 ≤ i < S/4), recto puis verso :
//     recto : (start + S - 1 - 2i, start + 2i)
//     verso : (start + 2i + 1, start + S - 2 - 2i)
#let imposed = ()
#for sig in range(n-signatures) {
  let start = sig * signature-size + 1
  let s = signature-size
  for i in range(int(s / 4)) {
    imposed.push(start + s - 1 - 2 * i)  // recto gauche
    imposed.push(start + 2 * i)           // recto droite
    imposed.push(start + 2 * i + 1)       // verso gauche
    imposed.push(start + s - 2 - 2 * i)   // verso droite
  }
}

// Page A4 paysage, sans marge — chaque feuille reçoit 2 pages côte à côte
#set page(width: 297mm, height: 210mm, margin: 0pt)

#let pairs = imposed.chunks(2)
#for (idx, pair) in pairs.enumerate() {
  if idx > 0 { pagebreak() }
  grid(
    columns: (1fr, 1fr),
    rows: (1fr,),
    ..pair.map(p => {
      if p > n-pages {
        rect(width: 100%, height: 100%, stroke: none) // page blanche
      } else {
        align(center + horizon, image(src, page: p, fit: "contain"))
      }
    })
  )
}
