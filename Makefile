SHELL := /bin/sh

.PHONY: validate test

validate:
	npm run typecheck
	npm run build

test: validate
