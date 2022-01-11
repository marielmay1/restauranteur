FROM node:14.0.0 as build

WORKDIR /workspace

COPY package.json /workspace
COPY package-lock.json /workspace

RUN yarn install

FROM node:14.0.0 as app
WORKDIR /app

ENV NODE_ENV production

COPY --from=build /workspace /app
COPY . /app

RUN ["npm", "run", "build"]
ENV PORT 3000
ENV STRAPI_API_HOST http://localhost:1337
EXPOSE $PORT

CMD node_modules/.bin/next dev -p ${PORT}