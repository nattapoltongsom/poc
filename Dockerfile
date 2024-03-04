FROM node:14.16.0-slim
WORKDIR /usr/src
COPY . .
RUN npm install && \
    npm run build

ARG APP_COMMIT_ID

ENV APP_COMMIT_ID="${APP_COMMIT_ID}"

ENTRYPOINT if [ -f /var/run/secrets/kpc/environment ]; then . /var/run/secrets/kpc/environment; fi &&\
    npm run start
