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
	@cd packages/mongo && heroku container:push worker --app restauranteur-strapi
	@cd packages/strapi && heroku container:push web --app restauranteur-strapi

release:
	@heroku container:release web --app restauranteur-strapi

thing:
	@cd packages/client && docker build . -t $(CLIENT):$(TAG)

doit:
	@docker run -p 5000:5000 -e PORT=5000 $(CLIENT):$(TAG)

create:
	@heroku create restauranteur-client
	@heroku create restauranteur-mongo
	@heroku create restauranteur-strapi

#curl --netrc -X PATCH https://api.heroku.com/apps/$APP_ID_OR_NAME/formation \
#  -d '{
#  "updates": [
#    {
#      "type": "web",
#      "docker_image": "$WEB_DOCKER_IMAGE_ID"
#    },
#    {
#      "type": "worker",
#      "docker_image": "$WORKER_DOCKER_IMAGE_ID"
#    }
#  ]
#}' \
#  -H "Content-Type: application/json" \
#  -H "Accept: application/vnd.heroku+json; version=3.docker-releases"