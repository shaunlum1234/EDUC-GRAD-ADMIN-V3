FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine3.13

WORKDIR /opt/app-root/src

COPY package*.json ./
RUN npm ci

COPY . /opt/app-root/src
EXPOSE 443 8080
CMD ["npm", "start"]
