generate:
	sass styles.scss:styles.css

watch:
	sass --watch styles.scss:styles.css

installCompiler:
	./installCompiler.sh

compile: clean
	mkdir output
	ruby compile.rb
	gzip -c output/index.html > output/index.html.gz

clean:
	rm -rf output
