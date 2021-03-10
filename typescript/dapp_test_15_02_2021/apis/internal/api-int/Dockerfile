ARG NODE_VER=14

FROM node:${NODE_VER}-alpine AS build
ENV PORT=8080
# Install app dependencies
RUN apk add \
    python \
    make \
    g++

RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
chmod +x /bin/grpc_health_probe

# Create work directory
WORKDIR /usr/src/app/
COPY . .

RUN npm install --no-audit --production --strict-ssl=false
RUN npm install -g pm2

EXPOSE 8080

CMD ["pm2-runtime", ".", "--watch"]
