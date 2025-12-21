call_recipe := just_executable() + " --justfile=" + justfile()

build: clean epub pdf mdbook books
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

books: clean
    {{call_recipe}} book 1 1 21
    {{call_recipe}} book 2 22 37
    {{call_recipe}} book 3 38 63
    {{call_recipe}} book 4 65 85
    {{call_recipe}} book 5 86 99
    {{call_recipe}} book 6 100 122
    
    
book position start end: 
    mkdir -p target/pdf
    echo "compile book {{ position }}"
    touch md_files.list
    for i in `seq {{start}} {{end}}` ; do \
        chapter=`printf "md/chapter%03d.md" "$i"`; \
        if [ -e $chapter ] ; then \
            echo -n "$chapter " >> md_files.list; \
        fi \
    done
    pandoc --top-level-division=chapter -o target/book_{{position}}.typ book_{{position}}.yaml `cat md_files.list` --lua-filter=filters/filters.lua --pdf-engine=typst --template=templates/book.typ --verbose
    typst compile --ignore-system-fonts --font-path fonts/ target/book_{{position}}.typ target/pdf/book_{{position}}.pdf
    typst compile --ignore-system-fonts --font-path fonts/ cover/cover_{{position}}.typ target/pdf/cover_{{position}}.pdf
    pdfjam --nup 2x1 --landscape --signature 32 target/pdf/book_{{position}}.pdf -o target/pdf/book_{{position}}_signatures.pdf
    pdfjam --nup 2x1 --landscape --signature 4 target/pdf/cover_{{position}}.pdf -o target/pdf/cover_{{position}}_signatures.pdf
    rm md_files.list
    
pdf: clean
    mkdir -p target
    echo "Compile the pdf rendering"

epub: clean
    mkdir -p target
    echo "Compile the epubr endering"
    pandoc --top-level-division='chapter' -o target/hpmor.epub book.yaml md/avant-propos.md md/chapter*.md md/colophon.md --lua-filter=filters/filters.lua --css ./css/epub.css --epub-embed-font fonts/Parseltongue.woff2 --verbose

install:
    mkdir -p $out
    if [ -d target/book ] ; then mv target/book $out ; fi
    if [ -f target/hpmor.pdf ] ; then mv target/hpmor.pdf $out ; fi
    if [ -f target/hpmor.epub ] ; then mv target/hpmor.epub $out ; fi
    if [ -d target/pdf ] ; then mv target/pdf $out ; fi
