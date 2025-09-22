build: clean epub
    echo Building…

clean:
    rm -fr target
    rm -fr $out

mdbook: clean
    mkdir -p target/src/md
    
    echo "Process source md files with markdown for mdbook"
    for file in `ls md/*.md`; do \
        file=`basename $file`; \
        pandoc md/$file -o target/src/md/$file -t markdown --lua-filter=filters/filters.lua; \
        echo "\"$file\" processed"; \
    done
    cp templates/mdbook.md target/src/SUMMARY.md
    mdbook build
    cp fonts/Parseltongue.woff2 target/book/fonts/

pdf: clean
    mkdir -p target
    echo "Compile the pdf rendering"
    pandoc --top-level-division=chapter -o target/hpmor.pdf book.yaml "md/avant-propos.md" md/chapter*.md  "md/colophon.md" --lua-filter=filters/filters.lua --pdf-engine=xelatex --template=templates/book.tex --verbose

epub: clean
    mkdir -p target
    echo "Compile the epubr endering"
    pandoc --top-level-division='chapter' -o target/hpmor.epub book.yaml md/avant-propos.md md/chapter*.md md/colophon.md --lua-filter=filters/filters.lua --css ./css/epub.css --epub-embed-font fonts/Parseltongue.woff2 --verbose

install:
    mkdir -p $out
    if [ -d target/book ] ; then mv target/book $out ; fi
    if [ -f target/hpmor.pdf ] ; then mv target/hpmor.pdf $out ; fi
    if [ -f target/hpmor.epub ] ; then mv target/hpmor.epub $out ; fi
