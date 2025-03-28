function Span (el)
  if el.classes[1] == "serpent" then
    table.insert(el.content, 1, pandoc.RawInline('latex', '\\serpent{'))
    table.insert(el.content, pandoc.RawInline('latex', '}'))
    table.insert(el.content, 1, pandoc.RawInline('html', '<span class="serpent">'))
    table.insert(el.content, pandoc.RawInline('html', '</span>'))
    end
  return el.content
end

function Div (el)
  if el.classes[1] == "intro" then
    table.insert(el.content, 1, pandoc.RawInline('latex', '\\intro{'))
    table.insert(el.content, pandoc.RawInline('latex', '}'))
    table.insert(el.content, 1, pandoc.RawInline('html', '<div class="intro">'))
    table.insert(el.content, pandoc.RawInline('html', '</div>'))
    end
end

function Div (el)
  if el.classes[1] == "intro" then
    table.insert(el.content, 1, pandoc.RawInline('latex', '\\disclaimer{'))
    table.insert(el.content, pandoc.RawInline('latex', '}'))
    table.insert(el.content, 1, pandoc.RawInline('html', '<div class="disclaimer">'))
    table.insert(el.content, pandoc.RawInline('html', '</div>'))
    end
end

function Div (el)
  if el.classes[1] == "nda" then
    table.insert(el.content, 1, pandoc.RawInline('latex', '\\nda{'))
    table.insert(el.content, pandoc.RawInline('latex', '}'))
    table.insert(el.content, 1, pandoc.RawInline('html', '<div class="nda">'))
    table.insert(el.content, pandoc.RawInline('html', '</div>'))
    end
end
