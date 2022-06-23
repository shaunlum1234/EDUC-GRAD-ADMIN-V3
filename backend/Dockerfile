FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine

# Install the app dependencies in a full Node docker image
FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine

RUN mkdir -p /logs
RUN chmod 755 /logs

WORKDIR /opt/app-root/src
RUN ln -s /logs .

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the dependencies into a Slim Node docker image
FROM docker-remote.artifacts.developer.gov.bc.ca/node:lts-alpine

# Install app dependencies
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules
COPY . /opt/app-root/src

ENV NODE_ENV production
ENV PORT 3001

CMD ["npm", "start"]