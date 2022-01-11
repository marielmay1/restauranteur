.PHONY: dev up install build down

REGISTRY:=548932534787.dkr.ecr.us-west-1.amazonaws.com
TAG:=latest
MONGO:=restauranteur_mongo
CLIENT:=restauranteur_client
STRAPI:=restauranteur_strapi

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

tag:
	@docker tag $(MONGO):latest $(REGISTRY)/$(MONGO):$(TAG)
	@docker tag $(STRAPI):latest $(REGISTRY)/$(STRAPI):$(TAG)
	@docker tag $(CLIENT):latest $(REGISTRY)/$(CLIENT):$(TAG)

push:
	@docker push $(REGISTRY)/$(MONGO):$(TAG)
	@docker push $(REGISTRY)/$(STRAPI):$(TAG)
	@docker push $(REGISTRY)/$(CLIENT):$(TAG)

test:
	@cd packages/client && heroku container:push web --app restauranteur-app

release:
	@heroku container:release web --app restauranteur-app