FROM docker-remote.artifacts.developer.gov.bc.ca/node:16.16.0
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm --version
RUN node -v
RUN npm i --no-optional --loglevel verbose

# Build Application
COPY . /opt/app-root/src
EXPOSE 8080 443
RUN npm run build
