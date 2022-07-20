FROM image-registry.apps.silver.devops.gov.bc.ca/bbe4c3-tools/node:14.19.0 as build-stage
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm --version

RUN node -v
RUN npm i --no-optional
# Build Application
COPY . /opt/app-root/src
RUN npm run build

FROM image-registry.apps.silver.devops.gov.bc.ca/bbe4c3-tools/s2i-caddy:v1-stable as caddy-stage
COPY --from=build-stage /opt/app-root/src/dist/app/view /var/www/html
COPY --from=build-stage /opt/app-root/src/Caddyfile /etc/Caddyfile
CMD /tmp/scripts/run
