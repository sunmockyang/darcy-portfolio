require 'cssminify'
require 'html_press'
require 'uglifier'

output_dir = "output"

def print_to_file(path, content)
	File.open(path,'w') do |s|
	  s.print content
	end
end

def find_and_replace_line(original, keyword, replace_with)
	original.each_line do |line|
		if line.include?(keyword)
			original[line] = replace_with
			return original
		end
	end	
end

def find_and_insert_css(html_content, css_path, css_content)
	find_and_replace_line(html_content, css_path, "<style type='text/css'>#{css_content}</style>");
end

def find_and_insert_js(html_content, js_path, js_content)
	find_and_replace_line(html_content, js_path, "<script type='text/javascript'>#{js_content}</script>");
end

html_file_name = "index.html"
css_file_name = "styles.css"
js_file_name = "script.js"
img_dir_name = "img"

html_path = File.expand_path("../#{html_file_name}",__FILE__)
css_path = File.expand_path("../#{css_file_name}", __FILE__)
js_path = File.expand_path("../#{js_file_name}", __FILE__)
img_path = File.expand_path("../#{img_dir_name}", __FILE__)

# CSS
css_content = CSSminify.compress(File.read(css_path))

# JavaScript
js_content = Uglifier.new.compile(File.read(js_path))

# HTML
html_content = File.read(html_path, :encoding => "UTF-8")
html_content = find_and_insert_css(html_content, css_file_name, css_content)
html_content = find_and_insert_js(html_content, js_file_name, js_content)

html_content = HtmlPress.press(html_content)
html_content = "<!-- Code by Sunmock Yang, July 2017 -->
<!--           sunmock.com           -->
#{html_content}"
print_to_file("#{output_dir}/#{html_file_name}", html_content)

# img
FileUtils.copy_entry(img_path, "#{output_dir}/#{img_dir_name}")
