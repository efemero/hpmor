function Underline(el)
	if FORMAT == "markdown" then
			local md_content = pandoc.write(pandoc.Pandoc({ pandoc.Para(el.content) }), "markdown")
			md_content = md_content:gsub("^%s+", ""):gsub("%s+$", ""):gsub("\n", "")
			local html = '<span class="underline">' .. md_content .. "</span>"
			return pandoc.RawInline("markdown", html)
	end	 
end

function Span(el)
	if #el.classes > 0 then
		local class = el.classes[1]
		if FORMAT == "latex" then
			local latex_content = pandoc.write(pandoc.Pandoc({ pandoc.Para(el.content) }), "latex")
			latex_content = latex_content:gsub("\n+$", "") -- supprime les fins de ligne
			return pandoc.RawInline("latex", "\\" .. class .. "{" .. latex_content .. "}")
		elseif FORMAT == "html" then
			local md_content = pandoc.write(pandoc.Pandoc({ pandoc.Para(el.content) }), "markdown")
			md_content = md_content:gsub("^%s+", ""):gsub("%s+$", ""):gsub("\n", "")
			local html = '<span class="' .. class .. '">' .. md_content .. "</span>"
			return pandoc.RawInline("markdown", html)
		elseif FORMAT == "markdown" then
			local md_content = pandoc.write(pandoc.Pandoc({ pandoc.Para(el.content) }), "markdown")
			local html = '<span class="' .. class .. ' yolo">' .. md_content .. "</span>"
			return pandoc.RawInline("markdown", html)
		end
	end
	return el
end

function Div(el)
	if #el.classes > 0 then
		local class = el.classes[1]
		if FORMAT == "latex" then
			local content = {}
			for _, block in ipairs(el.content) do
				local block_tex = pandoc.write(pandoc.Pandoc({ block }), "latex")
				block_tex = block_tex:gsub("\n+$", "")
				table.insert(content, block_tex)
			end
			local body = table.concat(content, "\n\n")
			return pandoc.RawBlock("latex", "\\" .. class .. "{" .. body .. "}")
		elseif FORMAT == "html" or FORMAT == "markdown" then
			local html = '<div class="' .. class .. '">\n'
			for _, block in ipairs(el.content) do
				html = html .. pandoc.write(pandoc.Pandoc({ block }), "markdown")
			end
			html = html .. "</div>"
			return pandoc.RawBlock("markdown", html)
		end
	end
	return el
end
