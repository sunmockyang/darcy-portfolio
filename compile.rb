require 'cssminify'
require 'html_press'
require 'uglifier'

output_dir = "output"

def print_to_file(path, content)
	File.open(path,'w') do |s|
	  s.print content
	end
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
print_to_file("#{output_dir}/#{css_file_name}", css_content)

# JavaScript
js_content = Uglifier.new.compile(File.read(js_path))
print_to_file("#{output_dir}/#{js_file_name}", js_content)

# HTML
html_content = File.read(html_path, :encoding => "UTF-8")
html_content = HtmlPress.press(html_content)
html_content = "<!-- Code by Sunmock Yang, July 2017 -->
<!--           sunmock.com           -->
#{html_content}"
print_to_file("#{output_dir}/#{html_file_name}", html_content)

# img
FileUtils.copy_entry(img_path, "#{output_dir}/#{img_dir_name}")
