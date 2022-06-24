FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine3.16

WORKDIR /opt/app-root

COPY package*.json ./
RUN npm ci

COPY . /opt/app-root
EXPOSE 443 8080
CMD ["npm", "start"]
