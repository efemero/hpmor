function Span(el)
  local latex_code = nil
  local html_code = nil

  if el.classes:includes("serpent") then
    local latex_content = pandoc.utils.stringify(el.content)
    latex_code = "\\serpent{" .. latex_content .. "}"
    html_code = '<span class="serpent">' .. pandoc.utils.stringify(el.content) .. '</span>'
  end

  if latex_code and FORMAT == "latex" then
    return pandoc.RawInline("latex", latex_code)
  elseif html_code and FORMAT == "html" then
    return pandoc.RawInline("html", html_code)
  else
    return el
  end
end

function LineBreak(el)
  return "\\\\"
end

function Div(el)
  local latex_code = nil
  local html_code = nil

  if el.classes:includes("intro") then
    local latex_content = pandoc.utils.stringify(el.content)
    latex_code = "\\intro{" .. latex_content .. "}"
    html_code = '<div class="intro">' .. pandoc.utils.stringify(el.content) .. '</div>'
  elseif el.classes:includes("disclaimer") then
    local latex_content = pandoc.utils.stringify(el.content)
    latex_content = latex_content:gsub("#", "\\#")
    latex_code = "\\disclaimer{" .. latex_content .. "}"
    html_code = '<div class="disclaimer">' .. pandoc.utils.stringify(el.content) .. '</div>'
  end

  if latex_code and FORMAT == "latex" then
    return pandoc.RawBlock("latex", latex_code)
  elseif html_code and FORMAT == "html" then
    return pandoc.RawBlock("html", html_code)
  else
    return el
  end
end


