compile: clean
	mkdir output
	ruby compile.rb
	gzip -c output/index.html > output/index.html.gz

clean:
	rm -rf output

all:
	sass --watch styles.scss:styles.css
