FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine3.16

RUN mkdir /logs && chmod -R a+rwx /logs

WORKDIR /opt/app-root/src
RUN ln -s /logs .

COPY package*.json ./
RUN npm ci

COPY . /opt/app-root/src
EXPOSE 443 8080
CMD ["npm", "start"]
