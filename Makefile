chrome_resources := background options popup
chrome_html := $(chrome_resources:%=dist/%.html)
chrome_js := $(chrome_resources:%=dist/scripts/%.js)
popup := $(lastword $(chrome_js))
manifest := dist/manifest.json

utils_js := app/scripts/utils.js
components_js := $(wildcard app/scripts/components/**/*.js)

$(warning $(chrome_html))

.PHONY: all clean test watch

all: $(chrome_js) $(chrome_html) $(manifest)

$(chrome_js): $(utils_js) $(wildcard node_modules/*/package.json)

$(popup): dist%: app% $(components_js)
	browserify $< > $@

$(filter-out $(popup),$(chrome_js)): dist%: app%
	browserify $< > $@

$(chrome_html): dist%: app%
	cp $< $@

$(manifest): dist%: app%
	cp $< $@

watch:
	npm run watch "$(MAKE) -j 4" app

clean:
	rm -f $(chrome_js) $(chrome_html) $(manifest)
