FROM node:6-slim

# The official Docker image sets this to `info` which is far too verbose
ENV NPM_CONFIG_LOGLEVEL warn

ENV NODE_ENV production

WORKDIR /app

# git is required for the pre-commit hook
RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*

# TODO npm-shrinkwrap.json
ADD package.json ./
RUN npm install --unsafe-perm && rm -rf ~/.node ~/.node-gyp
ADD . .

RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]
