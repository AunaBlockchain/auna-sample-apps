ARG NODE_VER=14

FROM node:${NODE_VER}-alpine AS build

# Install app dependencies
RUN apk add \
    python3 \
    make \
    g++

RUN npm install -g npm@latest

# Create work directory
WORKDIR /usr/src/app
COPY . .
RUN rm -rf node_modules && npm install --no-audit
RUN npm run build
RUN npm prune --production

# Output image
FROM node:${NODE_VER}-alpine AS runtime

# Create app directory
WORKDIR /usr/src/app
COPY . .
EXPOSE 4001

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/dist /usr/src/app/dist

#USER node

CMD ["node", "--enable-source-maps", "."]