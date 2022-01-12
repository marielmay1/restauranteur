.PHONY: install dev \
	up down \
	build build-client build-strapi \
	heroku-login \
	heroku-push heroku-push-client heroku-push-strapi \
	heroku-release heroku-release-client heroku-release-strapi \

REGISTRY:=548932534787.dkr.ecr.us-west-1.amazonaws.com
TAG:=latest
MONGO:=restauranteur_mongo
CLIENT:=restauranteur_client
STRAPI:=restauranteur_strapi

dev:
	@cd packages/client && STRAPI_API_HOST=https://restauranteur-strapi.herokuapp.com npm run dev
up:
	@docker-compose up --build

install:
	@cd packages/client && npm install

build:
	@docker-compose build

build-client:
	@docker-compose build client

build-strapi:
	@docker-compose build strapi

down:
	@docker-compose down

heroku-login:
	@heroku container:login

heroku-push: heroku-login
	@cd packages/client && heroku container:push web --app restauranteur-client
	@cd packages/strapi && heroku container:push web --app restauranteur-strapi

heroku-push-client: build-client heroku-login
	@cd packages/client && heroku container:push web --app restauranteur-client

heroku-push-strapi: build-strapi heroku-login
	@cd packages/strapi && heroku container:push web --app restauranteur-strapi

heroku-release:
	@heroku container:release web --app restauranteur-client
	@heroku container:release web --app restauranteur-strapi

heroku-release-client: heroku-push-client
	@heroku container:release web --app restauranteur-client

heroku-release-strapi: heroku-push-strapi
	@heroku container:release web --app restauranteur-strapi