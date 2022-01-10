.PHONY: serve dev

serve:
	@docker-compose up

dev:
	@cd packages/client && npm run dev

install:
	@cd packages/client && npm install

build:
	@docker-compose build