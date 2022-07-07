FROM docker-remote.artifacts.developer.gov.bc.ca/node:14.19.0
ENV NODE_OPTIONS="–max_old_space_size=4096"
ENV NODE_ENV production
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm --version
RUN node -v
RUN npm i --production
# --no-optional --production

# Build Application
COPY . /opt/app-root/src

EXPOSE 8080 443
RUN npm run build