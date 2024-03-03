FROM node:16.15.0-slim
WORKDIR /usr/src
RUN apt-get update
RUN apt-get install -y curl
RUN npm config rm proxy && npm config rm https-proxy
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install && \
    npm run build

ARG APP_COMMIT_ID

ENV APP_COMMIT_ID="${APP_COMMIT_ID}"

ENTRYPOINT if [ -f /var/run/secrets/kpc/environment ]; then . /var/run/secrets/kpc/environment; fi &&\
    npm run db-migrate:up && npm run start
