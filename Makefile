.PHONY: dev up install build down

dev:
	@docker-compose up --scale client=0 --detach
	@cd packages/client && npm run dev

up:
	@docker-compose up --build

install:
	@cd packages/client && npm install

build:
	@docker-compose build

down:
	@docker-compose down