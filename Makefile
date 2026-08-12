SHELL := /bin/sh

.PHONY: deploy down validate test

validate:
	docker compose config --quiet
	npm run typecheck
	npm run build

test: validate

deploy: validate
	docker compose up -d --build --wait

down:
	docker compose down
