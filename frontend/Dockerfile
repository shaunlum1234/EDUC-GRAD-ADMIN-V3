FROM docker-remote.artifacts.developer.gov.bc.ca/node:14.19.0 as build-stage
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm --version

RUN node -v
RUN npm i --no-optional
# Build Application
COPY . /opt/app-root/src
RUN npm run build
