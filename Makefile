.PHONY: serve dev

serve:
	@docker-compose up

dev:
	@cd packages/client && npm run dev