function Span(el)
	el = mk_span(el, "serpent")
	return el
end

function Div(el)
	local class_map = {
		frontmatter = "\\frontmatter",
		mainmatter = "\\mainmatter",
		backmatter = "\\backmatter",
	}

	for class, cmd in pairs(class_map) do
		if el.classes:includes(class) then
			if FORMAT == "latex" then
				local content = {}
				for _, block in ipairs(el.content) do
					table.insert(content, pandoc.write(pandoc.Pandoc({ block }), "plain"))
				end
				local latex_code = cmd .. "{" .. content .. "}"
				return pandoc.RawBlock("latex", latex_code)
			elseif FORMAT == "html" then
				local html_code = '<div class="' .. class .. '">' .. pandoc.utils.stringify(el.content) .. "</div>"
				return pandoc.RawBlock("html", html_code)
			end
		end
	end
	return el
end

function mk_span(el, class)
	if el.classes:includes(class) then
		local latex_open_block = pandoc.RawInline("latex", "\\" .. class .. "{")
		local latex_close_block = pandoc.RawInline("latex", "}")
		local html_open_block = pandoc.RawInline("html", '<span class="' .. class .. '">')
		local html_close_block = pandoc.RawInline("html", "</span>")

		if FORMAT == "latex" then
			table.insert(el.content, 1, latex_open_block)
			table.insert(el.content, latex_close_block)
		elseif FORMAT == "html" then
			table.insert(el.content, 1, html_open_block)
			table.insert(el.content, html_close_block)
		end
	end
	return el -- Ne pas casser la structure
end
