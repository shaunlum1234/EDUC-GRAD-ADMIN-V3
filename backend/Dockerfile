FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine3.13

RUN mkdir -p /logs
RUN chmod 775 /logs

WORKDIR /opt/app-root
RUN ln -s /logs .
COPY package*.json ./
RUN npm ci

COPY . /opt/app-root
EXPOSE 443 8080
CMD ["node", "./src/server.js"]
