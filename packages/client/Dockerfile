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

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "dev"]