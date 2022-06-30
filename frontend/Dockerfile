FROM docker-remote.artifacts.developer.gov.bc.ca/node:14.19.1
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN apk --no-cache add git 
RUN npm --version
RUN node -v
RUN npm install
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

EXPOSE 8080 443
RUN npm run build