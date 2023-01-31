FROM node:18.8.0-alpine

WORKDIR /app

ENTRYPOINT ["scripts/docker-entrypoint.sh"]
