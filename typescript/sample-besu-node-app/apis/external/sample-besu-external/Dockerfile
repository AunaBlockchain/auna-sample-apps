ARG NODE_VER=14

FROM node:14-alpine AS build

# Install app dependencies
RUN apk add \
    python \
    make \
    g++

# Create work directory
WORKDIR /usr/src/app
COPY . .
RUN npm install --no-audit && \
npm run build
RUN npm prune --production && npm dedupe

# Output image
FROM node:14-alpine AS runtime

# Create app directory
WORKDIR /usr/src/app
COPY --chown=node:node . .
EXPOSE 4000

COPY --from=build --chown=node:node /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build --chown=node:node /usr/src/app/dist /usr/src/app/dist

USER node

CMD ["node", "--enable-source-maps", "."]