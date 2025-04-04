-- Échappe les caractères LaTeX dangereux
function escape_latex(str)
	return str:gsub("\\", "\\textbackslash{}"):gsub("#", "\\#"):gsub("%%", "\\%%"):gsub("{", "\\{"):gsub("}", "\\}")
end

-- Utilitaires : rendu markdown brut
function inline_to_markdown(inlines)
	local buffer = {}
	for _, inline in ipairs(inlines) do
		table.insert(buffer, pandoc.write(pandoc.Pandoc({ pandoc.Para({ inline }) }), "markdown"))
	end
	return table.concat(buffer):gsub("\n", " ")
end

function block_to_markdown(blocks)
	local buffer = {}
	for _, block in ipairs(blocks) do
		table.insert(buffer, pandoc.write(pandoc.Pandoc({ block }), "markdown"))
	end
	return table.concat(buffer)
end

-- Utilitaires : rendu HTML
function inline_to_html(inlines)
	return pandoc.write(pandoc.Pandoc({ pandoc.Para(inlines) }), "html")
end

function block_to_html(blocks)
	return pandoc.write(pandoc.Pandoc(blocks), "html")
end

-- Traitement des Spans avec classes
function Span(el)
	if #el.classes == 0 then
		return el
	end
	local class_attr = ' class="' .. table.concat(el.classes, " ") .. '"'

	-- Utiliser uniquement la première classe pour générer le nom de la macro
	local class_name = el.classes[1]

	if FORMAT == "latex" then
		local latex_open_block = pandoc.RawInline("latex", "\\" .. class_name .. "{")
		local latex_close_block = pandoc.RawInline("latex", "}")
		table.insert(el.content, 1, latex_open_block)
		table.insert(el.content, latex_close_block)
	elseif FORMAT == "markdown" then
		local content = inline_to_markdown(el.content)
		return pandoc.RawInline("markdown", "<div" .. class_attr .. ">" .. content .. "</div>")
	end

	return el
end

-- Traitement des Divs avec classes
function Div(el)
	if #el.classes > 0 then
		-- Utiliser uniquement la première classe pour générer le nom de la macro
		local class_name = el.classes[1]
		local class_attr = ' class="' .. class_name .. '"'

		if FORMAT == "latex" then
			local latex_open_block = pandoc.RawBlock("latex", "\\" .. class_name .. "{")
			local latex_close_block = pandoc.RawBlock("latex", "}")
			table.insert(el.content, 1, latex_open_block)
			table.insert(el.content, latex_close_block)
		elseif FORMAT == "markdown" then
			local content = block_to_markdown(el.content)
			return pandoc.RawBlock("markdown", "<div" .. class_attr .. ">" .. content .. "</div>")
		end
	end

	return el
end
