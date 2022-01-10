FROM node:14.0.0-alpine as build

WORKDIR /workspace

COPY packages/client/package.json /workspace
COPY packages/client/package-lock.json /workspace

RUN yarn install

FROM node:14.0.0-alpine as app
WORKDIR /app

ENV NODE_ENV production
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY --from=build /workspace /app
COPY packages/client /app

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "dev"]