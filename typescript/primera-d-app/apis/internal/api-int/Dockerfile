ARG NODE_VER=14

FROM node:${NODE_VER}-alpine AS build

# Install app dependencies
RUN apk add \
    python \
    make \
    g++

RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
chmod +x /bin/grpc_health_probe

# Create work directory
WORKDIR /usr/src/app/production
COPY package*.json .npmrc ./

RUN npm install --no-audit --production --strict-ssl=false && \
cp -R /usr/src/app/production/node_modules /usr/src/app/node_modules

# Set build directory
WORKDIR /usr/src/app
COPY . .
RUN npm install --no-audit --strict-ssl=false && \
npm run build

# Output image
FROM node:${NODE_VER}-alpine AS runtime

# Create app directory
WORKDIR /usr/src/app
COPY --chown=node:node . .
EXPOSE 4002

COPY --from=build /bin/grpc_health_probe /bin/grpc_health_probe
COPY --from=build --chown=node:node /usr/src/app/production/node_modules /usr/src/app/node_modules
COPY --from=build --chown=node:node /usr/src/app/dist /usr/src/app/dist

USER node

CMD ["node", "dist/index.js"]